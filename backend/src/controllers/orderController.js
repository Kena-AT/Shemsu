const { db } = require('../config/db');
const { 
  orders, 
  orderItems, 
  products, 
  carts, 
  cartItems,
  users
} = require('../models/schema');
const { eq, and, inArray, sql } = require('drizzle-orm');
const chapaService = require('../services/chapaService');
const logger = require('../config/logger');
const crypto = require('crypto');

class OrderController {
  constructor() {
    this.createOrder = this.createOrder.bind(this);
    this.handleWebhook = this.handleWebhook.bind(this);
    this.verifyOrder = this.verifyOrder.bind(this);
    this.finalizeOrder = this.finalizeOrder.bind(this);
    this.getBuyerOrders = this.getBuyerOrders.bind(this);
    this.getSellerOrders = this.getSellerOrders.bind(this);
    this.updateOrderItemStatus = this.updateOrderItemStatus.bind(this);
  }

  /**
   * Create a new order (Pending state)
   * This initiates the Chapa payment flow.
   */
  async createOrder(req, res) {
    try {
      const { shippingAddress, cartId } = req.body;
      const userId = req.user.id;

      // 1. Fetch Cart and Items
      const cart = await db.query.carts.findFirst({
        where: eq(carts.userId, userId),
        with: {
          items: {
            with: { product: true }
          }
        }
      });

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      // 2. Calculate Total and Prepare Items Snapshots
      let totalAmount = 0;
      const itemsToCreate = cart.items.map(item => {
        const itemTotal = parseFloat(item.priceSnapshot) * item.quantity;
        totalAmount += itemTotal;

        return {
          sellerId: item.product.sellerId,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.priceSnapshot,
          productNameSnapshot: item.product.name,
          productImageSnapshot: item.product.images?.[0]?.url || null,
          attributesSnapshot: item.attributes,
          status: 'pending'
        };
      });

      // 3. Create Unique Transaction Reference
      const txRef = `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${Date.now()}`;

      // 4. Create Order in Database (Transaction)
      const [newOrder] = await db.insert(orders).values({
        buyerId: userId,
        totalAmount: totalAmount.toString(),
        currency: 'ETB',
        status: 'pending',
        paymentStatus: 'pending',
        txRef: txRef,
        shippingAddress: shippingAddress,
      }).returning();

      // 5. Create Order Items
      await db.insert(orderItems).values(
        itemsToCreate.map(item => ({ ...item, orderId: newOrder.id }))
      );

      // 6. Fetch full user details to handle missing token data
      const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // 7. Initialize Chapa Payment
      const chapaData = await chapaService.initializePayment({
        amount: totalAmount,
        currency: 'ETB',
        email: user.email,
        first_name: user.fullName.split(' ')[0],
        last_name: user.fullName.split(' ')[1] || '',
        tx_ref: txRef,
        callback_url: `${process.env.BACKEND_URL}/api/orders/webhook`, // Your webhook URL
        return_url: `${process.env.FRONTEND_URL}/app/checkout/success?tx_ref=${txRef}`,
      });

      res.status(201).json({
        message: 'Order created',
        orderId: newOrder.id,
        checkoutUrl: chapaData.checkout_url
      });

    } catch (error) {
      logger.error('Create Order Error:', error);
      const message = error.message || (typeof error === 'string' ? error : JSON.stringify(error));
      res.status(500).json({ message: message || 'Internal server error' });
    }
  }

  /**
   * Finalize order after successful payment (Atomic stock update + cart clear)
   */
  async finalizeOrder(txRef, chapaTransactionId) {
    return await db.transaction(async (tx) => {
      // A. Fetch Order with Items
      const order = await tx.query.orders.findFirst({
        where: eq(orders.txRef, txRef),
        with: { items: true }
      });

      if (!order) return { status: 'not_found' };
      if (order.paymentStatus === 'paid') return { status: 'already_paid' };

      const productIds = order.items.map(i => i.productId);

      // B. LOCK PRODUCTS
      const lockedProducts = await tx.execute(sql`
        SELECT id, stock, version 
        FROM products 
        WHERE id IN ${productIds} 
        FOR UPDATE
      `);

      // C. VALIDATE STOCK
      let allStockAvailable = true;
      for (const item of order.items) {
        const product = lockedProducts.rows.find(p => p.id === item.productId);
        if (!product || product.stock < item.quantity) {
          allStockAvailable = false;
          break;
        }
      }

      if (allStockAvailable) {
        // D. SUCCESS: Decrement Stock
        for (const item of order.items) {
          await tx.update(products)
            .set({ 
              stock: sql`stock - ${item.quantity}`,
              version: sql`version + 1`
            })
            .where(eq(products.id, item.productId));
        }

        // Update Order Status
        await tx.update(orders)
          .set({ 
            status: 'processing', 
            paymentStatus: 'paid',
            chapaTransactionId: chapaTransactionId,
            paidAt: new Date()
          })
          .where(eq(orders.id, order.id));

        await tx.update(orderItems)
          .set({ status: 'processing' })
          .where(eq(orderItems.orderId, order.id));

        // E. CLEAR CART
        await tx.delete(cartItems)
          .where(inArray(cartItems.productId, productIds));
        
        logger.info(`Order ${order.id} processed successfully via finalization`);
        return { status: 'success' };

      } else {
        // F. FAILURE: Refund
        logger.warn(`Insufficient stock for order ${order.id}. Initiating refund.`);
        
        await tx.update(orders)
          .set({ 
            status: 'cancelled_due_to_stock', 
            paymentStatus: 'failed',
            chapaTransactionId: chapaTransactionId 
          })
          .where(eq(orders.id, order.id));

        try {
          await chapaService.refundPayment(txRef);
          await tx.update(orders).set({ paymentStatus: 'refunded' }).where(eq(orders.id, order.id));
        } catch (refundError) {
          logger.error(`CRITICAL: Automated refund failed for order ${order.id}`, refundError);
        }
        return { status: 'refunded_due_to_stock' };
      }
    });
  }

  /**
   * Handle Chapa Webhook
   */
  async handleWebhook(req, res) {
    const signature = req.headers['x-chapa-signature'] || req.headers['chapa-signature'];
    const payload = req.body;

    if (!chapaService.verifyWebhookSignature(payload, signature)) {
      logger.warn('Invalid Chapa Webhook Signature');
      return res.status(401).json({ message: 'Invalid signature' });
    }

    const { tx_ref, status, id: chapaTransactionId } = payload;

    if (status !== 'success') {
      await db.update(orders)
        .set({ status: 'failed', paymentStatus: 'failed' })
        .where(eq(orders.txRef, tx_ref));
      return res.status(200).json({ message: 'Payment failed' });
    }

    try {
      await this.finalizeOrder(tx_ref, chapaTransactionId);
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      logger.error('Webhook Processing Error:', error);
      res.status(500).json({ message: 'Internal error' });
    }
  }

  /**
   * Manual verification (Polling/Fallback for localhost or missed webhooks)
   */
  async verifyOrder(req, res) {
    try {
      const { txRef } = req.params;
      
      // 1. Check if Chapa actually received the money
      const chapaData = await chapaService.verifyPayment(txRef);
      
      if (chapaData.status === 'success') {
        const result = await this.finalizeOrder(txRef, chapaData.id);
        return res.json({ 
          status: 'success', 
          message: 'Order verified and processed',
          details: result 
        });
      }

      res.status(400).json({ 
        status: chapaData.status, 
        message: 'Payment not successful at Chapa' 
      });

    } catch (error) {
      logger.error('Verify Order Error:', error);
      res.status(500).json({ message: error.message || 'Verification failed' });
    }
  }

  /**
   * Get Buyer Order History
   */
  async getBuyerOrders(req, res) {
    try {
      const buyerOrders = await db.query.orders.findMany({
        where: eq(orders.buyerId, req.user.id),
        with: {
          items: true
        },
        orderBy: (orders, { desc }) => [desc(orders.createdAt)]
      });
      res.json(buyerOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get Seller Orders (Filtered to their items)
   */
  async getSellerOrders(req, res) {
    try {
      const sellerId = req.user.id;
      
      // Find order items belonging to this seller
      const sellerItems = await db.query.orderItems.findMany({
        where: eq(orderItems.sellerId, sellerId),
        with: {
          order: {
            with: { buyer: true }
          }
        },
        orderBy: (orderItems, { desc }) => [desc(orderItems.createdAt)]
      });

      // Group by order for the seller view
      const groupedOrders = sellerItems.reduce((acc, item) => {
        const orderId = item.orderId;
        if (!acc[orderId]) {
          acc[orderId] = {
            ...item.order,
            sellerSpecificItems: []
          };
        }
        acc[orderId].sellerSpecificItems.push(item);
        return acc;
      }, {});

      res.json(Object.values(groupedOrders));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Update Order Item Status (Seller Action)
   */
  async updateOrderItemStatus(req, res) {
    try {
      const { itemId } = req.params;
      const { status } = req.body;
      const sellerId = req.user.id;

      const [updatedItem] = await db.update(orderItems)
        .set({ status })
        .where(and(
          eq(orderItems.id, itemId),
          eq(orderItems.sellerId, sellerId)
        ))
        .returning();

      if (!updatedItem) {
        return res.status(404).json({ message: 'Order item not found or unauthorized' });
      }

      // Check if all items in the parent order are delivered to update global status
      // (Implementation deferred for now as global status logic is complex)

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();

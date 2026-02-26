const { db } = require('../config/db');
const { carts, cartItems, products, users } = require('../models/schema');
const { eq, and, sql } = require('drizzle-orm');
const logger = require('../config/logger');

// Helper to get or create a cart for a user
const getOrCreateCart = async (userId) => {
  let cart = await db.query.carts.findFirst({
    where: eq(carts.userId, userId),
  });

  if (!cart) {
    [cart] = await db.insert(carts).values({ userId }).returning();
  }
  return cart;
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      with: {
        items: {
          with: {
            product: {
              with: {
                seller: {
                  columns: {
                    id: true,
                    fullName: true,
                    isVerified: true,
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!cart) {
      return res.json({ items: [], vendorGroups: {} });
    }

    // Transform and Re-validate
    const transformedItems = cart.items.map(item => {
      const isPriceStale = parseFloat(item.priceSnapshot) !== parseFloat(item.product.price);
      const isInvalid = item.product.isDeleted || !item.product.seller.isVerified || item.quantity > item.product.stock;

      return {
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        image: item.product.images?.[0]?.url,
        priceSnapshot: parseFloat(item.priceSnapshot),
        currentPrice: parseFloat(item.product.price),
        quantity: item.quantity,
        stock: item.product.stock,
        attributes: item.attributes,
        vendor: item.product.seller.fullName,
        vendorId: item.product.seller.id,
        isPriceStale,
        isInvalid,
        statusMessage: isInvalid ? 'Item no longer available or out of stock' : (isPriceStale ? 'Price updated, please review' : null)
      };
    });

    // Group by vendor
    const vendorGroups = transformedItems.reduce((acc, item) => {
      if (!acc[item.vendor]) acc[item.vendor] = [];
      acc[item.vendor].push(item);
      return acc;
    }, {});

    res.json({
      id: cart.id,
      items: transformedItems,
      vendorGroups,
      totalItems: transformedItems.length,
    });
  } catch (err) {
    logger.error('Error fetching cart', err);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, attributes } = req.body;
    const userId = req.user.id;

    // 1. Validate Product & Seller
    const product = await db.query.products.findFirst({
      where: and(eq(products.id, productId), eq(products.isDeleted, false)),
      with: { seller: true }
    });

    if (!product) return res.status(404).json({ message: 'Product not found or unavailable' });
    if (!product.seller.isVerified) return res.status(403).json({ message: 'Seller is not verified' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

    const cart = await getOrCreateCart(userId);

    // 3. Upsert Logic (Manual merge for Drizzle + JSONB uniqueness if needed, but we use compositeUnique index)
    // We try to find if this item already exists with matching attributes
    const existingItem = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cartId, cart.id),
        eq(cartItems.productId, productId),
        sql`${cartItems.attributes}::jsonb = ${JSON.stringify(attributes || {})}::jsonb`
      )
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) return res.status(400).json({ message: 'Total quantity exceeds available stock' });

      const [updated] = await db.update(cartItems)
        .set({ 
          quantity: newQuantity,
          priceSnapshot: product.price, // Refresh snapshot on update? Or keep? User said "Set it when item is added". 
          updatedAt: new Date() 
        })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return res.json(updated);
    }

    // 4. Insert New Item
    const [newItem] = await db.insert(cartItems).values({
      cartId: cart.id,
      productId,
      quantity,
      attributes: attributes || {},
      priceSnapshot: product.price,
    }).returning();

    res.status(201).json(newItem);
  } catch (err) {
    logger.error('Error adding to cart', err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// Update Cart Item (Quantity)
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const cart = await db.query.carts.findFirst({ where: eq(carts.userId, userId) });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = await db.query.cartItems.findFirst({
      where: and(eq(cartItems.id, id), eq(cartItems.cartId, cart.id)),
      with: { product: true }
    });

    if (!item) return res.status(404).json({ message: 'Cart item not found' });
    if (item.product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

    const [updated] = await db.update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, id))
      .returning();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart item' });
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const cart = await db.query.carts.findFirst({ where: eq(carts.userId, userId) });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    await db.delete(cartItems)
      .where(and(eq(cartItems.id, id), eq(cartItems.cartId, cart.id)));

    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from cart' });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await db.query.carts.findFirst({ where: eq(carts.userId, userId) });
    
    if (cart) {
      await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));
    }

    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart' });
  }
};

const { db } = require('../config/db');
const { 
  sellerVerifications, 
  orderItems, 
  orders,
  users
} = require('../models/schema');
const { eq, and, sql } = require('drizzle-orm');
const logger = require('../config/logger');

class SellerController {
  /**
   * Get Seller Analytics (Revenue and Order trends)
   * Moved from OrderController for better organization.
   */
  async getSellerAnalytics(req, res) {
    try {
      const sellerId = req.user.id;
      
      const stats = await db.execute(sql`
        SELECT 
          COALESCE(SUM(oi.price_at_purchase::numeric * oi.quantity), 0) as total_revenue,
          COUNT(DISTINCT oi.order_id) as total_orders
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE oi.seller_id = ${sellerId} AND o.payment_status = 'paid'
      `);

      const dailyRevenue = await db.execute(sql`
        SELECT 
          DATE(o.paid_at) as date,
          SUM(oi.price_at_purchase::numeric * oi.quantity) as revenue
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE oi.seller_id = ${sellerId} AND o.payment_status = 'paid'
        GROUP BY DATE(o.paid_at)
        ORDER BY DATE(o.paid_at) ASC;
      `);

      res.json({
        totalRevenue: parseFloat(stats.rows[0].total_revenue),
        totalOrders: parseInt(stats.rows[0].total_orders),
        revenueTrend: dailyRevenue.rows.map(r => ({
          date: r.date,
          revenue: parseFloat(r.revenue)
        }))
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get Current Verification Status
   */
  async getVerificationStatus(req, res) {
    try {
      const sellerId = req.user.id;
      const [verification] = await db.select()
        .from(sellerVerifications)
        .where(eq(sellerVerifications.sellerId, sellerId))
        .limit(1);
      
      res.json(verification || { status: 'none' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Submit/Update Verification Data
   * Rules:
   * 1. Auto-reset to 'pending' on TIN/MerchantID change.
   * 2. Block update if status is 'approved' and orders are processing.
   */
  async submitVerification(req, res) {
    try {
      const sellerId = req.user.id;
      const { tin, chapaMerchantId, documents } = req.body;

      // 1. Check current status and active orders if approved
      const [existing] = await db.select()
        .from(sellerVerifications)
        .where(eq(sellerVerifications.sellerId, sellerId))
        .limit(1);

      if (existing && existing.status === 'approved') {
        // Payout Lock: Check for 'processing' orders
        const activeOrders = await db.select()
          .from(orderItems)
          .where(and(eq(orderItems.sellerId, sellerId), eq(orderItems.status, 'processing')))
          .limit(1);

        if (activeOrders.length > 0 && (tin !== existing.tin || chapaMerchantId !== existing.chapaMerchantId)) {
          return res.status(400).json({ 
            message: 'Cannot update payout credentials while you have active orders in processing. Please fulfill existing orders first.' 
          });
        }
      }

      // 2. Insert or Update with Auto-Reset
      const data = {
        sellerId,
        tin,
        chapaMerchantId,
        documents: documents || {},
        status: 'pending', // Always reset to pending on submission/update
        reviewNotes: null,
        updatedAt: new Date()
      };

      if (existing) {
        const [updated] = await db.update(sellerVerifications)
          .set(data)
          .where(eq(sellerVerifications.sellerId, sellerId))
          .returning();
        res.json(updated);
      } else {
        const [inserted] = await db.insert(sellerVerifications)
          .values(data)
          .returning();
        res.json(inserted);
      }
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(400).json({ message: 'TIN or Chapa Merchant ID is already in use by another seller.' });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new SellerController();

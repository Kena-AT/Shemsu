const { db } = require('../config/db');
const { 
  users, 
  products, 
  orders, 
  orderItems, 
  sellerVerifications, 
  productReports, 
  auditLogs, 
  systemSettings 
} = require('../models/schema');
const { eq, and, ne, sql, desc, ilike, inArray } = require('drizzle-orm');
const auditLogger = require('../services/auditLogger');
const logger = require('../config/logger');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class AdminController {
  /**
   * Hardened Admin Login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Fetch user (Only if role is admin)
      const [user] = await db.select()
        .from(users)
        .where(and(eq(users.email, email), eq(users.isDeleted, false)))
        .limit(1);

      // Generic error message for security
      const genericError = 'Invalid credentials or access denied.';

      if (!user || user.role !== 'admin') {
        return res.status(401).json({ message: genericError });
      }

      // 2. Bruteforce protection (Verify failed attempts)
      if (user.failedLoginAttempts >= 5 && user.lastLoginAttemptAt) {
        const cooldown = 15 * 60 * 1000; // 15 mins
        if (new Date() - new Date(user.lastLoginAttemptAt) < cooldown) {
          return res.status(429).json({ message: 'Too many failed attempts. Locked for 15 minutes.' });
        }
      }

      // 3. Verify Password
      const isPasswordValid = await argon2.verify(user.password, password);
      
      if (!isPasswordValid) {
        // Increment failed attempts
        await db.update(users)
          .set({ 
            failedLoginAttempts: (user.failedLoginAttempts || 0) + 1,
            lastLoginAttemptAt: new Date()
          })
          .where(eq(users.id, user.id));

        return res.status(401).json({ message: genericError });
      }

      // 4. Success - Reset attempts and generate tokens
      await db.update(users)
        .set({ 
          failedLoginAttempts: 0,
          lastLoginAttemptAt: new Date()
        })
        .where(eq(users.id, user.id));

      const accessToken = jwt.sign(
        { id: user.id, role: user.role, email: user.email, fullName: user.fullName },
        process.env.JWT_SECRET,
        { expiresIn: '8h' } // Longer session for admins
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '24h' }
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        message: 'Admin login successful',
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
      });

      logger.info(`Admin login successful: ${user.email}`);
    } catch (error) {
      logger.error(`Admin login error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Get High-Level Dashboard Stats
   */
  async getDashboardStats(req, res) {
    try {
      // 1. Total Revenue (Paid orders)
      const revenueResult = await db.execute(sql`
        SELECT COALESCE(SUM(total_amount), 0) as total_revenue
        FROM orders
        WHERE payment_status = 'paid'
      `);

      // 2. Active Users count (excluding deleted)
      const usersResult = await db.execute(sql`
        SELECT COUNT(*) as total_users
        FROM users
        WHERE is_deleted = false
      `);

      // 3. Total Products (excluding deleted)
      const productsResult = await db.execute(sql`
        SELECT COUNT(*) as total_products
        FROM products
        WHERE is_deleted = false
      `);

      // 4. Pending Verifications
      const verificationsResult = await db.execute(sql`
        SELECT COUNT(*) as pending_verifications
        FROM seller_verifications
        WHERE status = 'pending'
      `);

      // 5. Pending Moderation
      const moderationResult = await db.execute(sql`
        SELECT COUNT(*) as pending_moderation
        FROM products
        WHERE moderation_status = 'pending' AND is_deleted = false
      `);

      // 6. Recent Verifications (Awaiting)
      const recentVerifications = await db.select({
        id: sellerVerifications.id,
        name: users.fullName,
        type: sql`'Merchant Account'`
      })
      .from(sellerVerifications)
      .innerJoin(users, eq(sellerVerifications.sellerId, users.id))
      .where(eq(sellerVerifications.status, 'pending'))
      .orderBy(desc(sellerVerifications.createdAt))
      .limit(3);

      // 7. Recent System Activity (Audit Logs)
      const recentActivity = await db.select({
        event: auditLogs.action,
        entity: auditLogs.targetType,
        time: auditLogs.createdAt,
        status: sql`'Success'`
      })
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(5);

      res.json({
        totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
        totalUsers: parseInt(usersResult.rows[0].total_users),
        totalProducts: parseInt(productsResult.rows[0].total_products),
        pendingVerifications: parseInt(verificationsResult.rows[0].pending_verifications),
        pendingModeration: parseInt(moderationResult.rows[0].pending_moderation),
        recentVerifications,
        recentActivity: recentActivity.map(a => ({
          ...a,
          time: new Date(a.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }))
      });
    } catch (error) {
      logger.error(`getDashboardStats error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * List Users with filtering
   */
  async getUsers(req, res) {
    try {
      const { role, status, search } = req.query;
      
      const filters = [eq(users.isDeleted, false)];
      if (role) filters.push(eq(users.role, role));
      if (status) filters.push(eq(users.status, status));
      if (search) filters.push(ilike(users.fullName, `%${search}%`));

      const allUsers = await db.select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        role: users.role,
        status: users.status,
        createdAt: users.createdAt
      })
      .from(users)
      .where(and(...filters))
      .orderBy(desc(users.createdAt));

      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get Single User Details
   */
  async getUserDetails(req, res) {
    try {
      const { id } = req.params;
      const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
      
      if (!user) return res.status(404).json({ message: 'User not found' });

      // If seller, get verification status
      let verification = null;
      if (user.role === 'seller') {
        [verification] = await db.select().from(sellerVerifications).where(eq(sellerVerifications.sellerId, id)).limit(1);
      }

      res.json({ user, verification });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Update User Behavioral Status (Suspend/Ban)
   */
  async updateUserStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, reason } = req.body; // Mandatory reason for suspend/ban

      if (!['active', 'suspended', 'banned'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const [oldUser] = await db.select().from(users).where(eq(users.id, id)).limit(1);
      if (!oldUser) return res.status(404).json({ message: 'User not found' });

      const [updatedUser] = await db.update(users)
        .set({ status, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();

      // Audit Log
      await auditLogger.logAction({
        adminId: req.user.id,
        action: status === 'active' ? 'ACTIVATE_USER' : (status === 'suspended' ? 'SUSPEND_USER' : 'BAN_USER'),
        targetType: 'user',
        targetId: id,
        oldValue: { status: oldUser.status },
        newValue: { status: updatedUser.status },
        reason,
        req
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Soft Delete User
   */
  async softDeleteUser(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const [oldUser] = await db.select().from(users).where(eq(users.id, id)).limit(1);
      if (!oldUser) return res.status(404).json({ message: 'User not found' });

      await db.update(users)
        .set({ isDeleted: true, updatedAt: new Date() })
        .where(eq(users.id, id));

      await auditLogger.logAction({
        adminId: req.user.id,
        action: 'DELETE_USER',
        targetType: 'user',
        targetId: id,
        oldValue: { isDeleted: false },
        newValue: { isDeleted: true },
        reason,
        req
      });

      res.json({ message: 'User soft-deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get Seller Verification Queue
   */
  async getVerificationQueue(req, res) {
    try {
      const queue = await db.select({
        id: sellerVerifications.id,
        sellerId: sellerVerifications.sellerId,
        fullName: users.fullName,
        email: users.email,
        tin: sellerVerifications.tin,
        chapaMerchantId: sellerVerifications.chapaMerchantId,
        status: sellerVerifications.status,
        createdAt: sellerVerifications.createdAt
      })
      .from(sellerVerifications)
      .innerJoin(users, eq(sellerVerifications.sellerId, users.id))
      .where(eq(sellerVerifications.status, 'pending'))
      .orderBy(desc(sellerVerifications.createdAt));

      res.json(queue);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Verify/Reject Seller
   */
  async verifySeller(req, res) {
    try {
      const { id } = req.params; // verification record ID
      const { status, reviewNotes, reason } = req.body;

      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const [verification] = await db.select().from(sellerVerifications).where(eq(sellerVerifications.id, id)).limit(1);
      if (!verification) return res.status(404).json({ message: 'Record not found' });

      const [updated] = await db.update(sellerVerifications)
        .set({ status, reviewNotes, updatedAt: new Date() })
        .where(eq(sellerVerifications.id, id))
        .returning();

      // If approved, verify the user account as well
      if (status === 'approved') {
        await db.update(users).set({ isVerified: true }).where(eq(users.id, verification.sellerId));
      }

      await auditLogger.logAction({
        adminId: req.user.id,
        action: status === 'approved' ? 'APPROVE_SELLER' : 'REJECT_SELLER',
        targetType: 'seller_verification',
        targetId: id,
        oldValue: { status: verification.status },
        newValue: { status: updated.status },
        reason: reason || reviewNotes,
        req
      });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Product Moderation Queue
   */
  async getModerationQueue(req, res) {
    try {
      const queue = await db.select({
        id: products.id,
        name: products.name,
        price: products.price,
        sellerName: users.fullName,
        createdAt: products.createdAt
      })
      .from(products)
      .innerJoin(users, eq(products.sellerId, users.id))
      .where(and(eq(products.moderationStatus, 'pending'), eq(products.isDeleted, false)))
      .orderBy(desc(products.createdAt));

      res.json(queue);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get Product Details (Admin view with reports)
   */
  async getProductDetails(req, res) {
    try {
      const { id } = req.params;
      const [product] = await db.select().from(products).where(eq(products.id, id)).limit(1);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const reports = await db.select().from(productReports).where(eq(productReports.productId, id));

      res.json({ product, reports });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Moderate Product (Approve/Reject)
   */
  async moderateProduct(req, res) {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const [oldProduct] = await db.select().from(products).where(eq(products.id, id)).limit(1);
      if (!oldProduct) return res.status(404).json({ message: 'Product not found' });

      const [updatedProduct] = await db.update(products)
        .set({ moderationStatus: status, updatedAt: new Date() })
        .where(eq(products.id, id))
        .returning();

      await auditLogger.logAction({
        adminId: req.user.id,
        action: status === 'approved' ? 'APPROVE_PRODUCT' : 'REJECT_PRODUCT',
        targetType: 'product',
        targetId: id,
        oldValue: { moderationStatus: oldProduct.moderationStatus },
        newValue: { moderationStatus: updatedProduct.moderationStatus },
        reason,
        req
      });

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Soft Delete Product
   */
  async softDeleteProduct(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      await db.update(products).set({ isDeleted: true }).where(eq(products.id, id));

      await auditLogger.logAction({
        adminId: req.user.id,
        action: 'DELETE_PRODUCT',
        targetType: 'product',
        targetId: id,
        oldValue: { isDeleted: false },
        newValue: { isDeleted: true },
        reason,
        req
      });

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Global Orders with full data visibility
   */
  async getGlobalOrders(req, res) {
    try {
      const allOrders = await db.select({
        id: orders.id,
        buyerName: users.fullName,
        totalAmount: orders.totalAmount,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        createdAt: orders.createdAt
      })
      .from(orders)
      .innerJoin(users, eq(orders.buyerId, users.id))
      .orderBy(desc(orders.createdAt));

      res.json(allOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Detailed Order for Admin (Scoped to include ALL metadata)
   */
  async getOrderDetails(req, res) {
    try {
      const { id } = req.params;
      const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      const buyer = await db.select({
        fullName: users.fullName,
        email: users.email
      }).from(users).where(eq(users.id, order.buyerId)).limit(1);

      const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));

      res.json({ order, buyer: buyer[0], items });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Override Order Status (Full Override with constraints)
   */
  async overrideOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      // State Machine Guardrails
      const allowedTransitions = {
        'pending': ['processing', 'cancelled'],
        'processing': ['shipped', 'cancelled'],
        'shipped': ['delivered', 'returned'],
        'delivered': ['returned'],
        'cancelled': [],
        'returned': [],
        'failed': ['pending']
      };

      if (!allowedTransitions[order.status]?.includes(status)) {
        return res.status(400).json({ 
          message: `Illegal transition from ${order.status} to ${status}` 
        });
      }

      const [updatedOrder] = await db.update(orders)
        .set({ status, updatedAt: new Date() })
        .where(eq(orders.id, id))
        .returning();

      await auditLogger.logAction({
        adminId: req.user.id,
        action: 'OVERRIDE_ORDER_STATUS',
        targetType: 'order',
        targetId: id,
        oldValue: { status: order.status },
        newValue: { status: updatedOrder.status },
        reason,
        req
      });

      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * System Settings Whitelist
   */
  async getSystemSettings(req, res) {
    try {
      const settings = await db.select().from(systemSettings);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Update System Settings with validation
   */
  async updateSystemSettings(req, res) {
    try {
      const updates = req.body; // Expecting { settings: { key: value }, reason }
      const { settings, reason } = updates;

      if (!settings || typeof settings !== 'object') {
        return res.status(400).json({ message: 'Invalid settings format' });
      }

      const whitelist = ['maintenanceMode', 'commissionRate', 'supportEmail', 'maxUploadSizeKB', 'platformName', 'timezone', 'minPayout', 'notifications', 'maxLoginAttempts', 'maintenanceMessage'];
      
      const results = [];
      for (const [key, value] of Object.entries(settings)) {
        if (!whitelist.includes(key)) continue;

        // Specific validation for commissionRate
        if (key === 'commissionRate' && (value < 0 || value > 100)) {
           continue; 
        }

        const [oldSetting] = await db.select().from(systemSettings).where(eq(systemSettings.key, key)).limit(1);

        await db.insert(systemSettings)
          .values({ 
            key, 
            value: typeof value === 'object' ? JSON.stringify(value) : String(value), 
            type: typeof value, 
            updatedAt: new Date() 
          })
          .onConflictDoUpdate({
            target: systemSettings.key,
            set: { 
              value: typeof value === 'object' ? JSON.stringify(value) : String(value), 
              updatedAt: new Date() 
            }
          });

        await auditLogger.logAction({
          adminId: req.user.id,
          action: 'UPDATE_SYSTEM_SETTING',
          targetType: 'system_setting',
          targetId: key,
          oldValue: oldSetting ? oldSetting.value : null,
          newValue: value,
          reason,
          req
        });
        
        results.push(key);
      }

      res.json({ message: 'Settings updated successfully', updated: results });
    } catch (error) {
      logger.error(`updateSystemSettings error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Audit Logs View
   */
  async getAuditLogs(req, res) {
    try {
      const logs = await db.select({
        id: auditLogs.id,
        adminName: users.fullName,
        action: auditLogs.action,
        targetType: auditLogs.targetType,
        targetId: auditLogs.targetId,
        reason: auditLogs.reason,
        ipAddress: auditLogs.ipAddress,
        createdAt: auditLogs.createdAt
      })
      .from(auditLogs)
      .innerJoin(users, eq(auditLogs.adminId, users.id))
      .orderBy(desc(auditLogs.createdAt))
      .limit(100);

      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AdminController();

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Dedicated, stricter rate limiter for Admin Login
const adminLoginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 login attempts per hour
  message: { message: 'Too many login attempts. Please try again after an hour.' }
});

router.post('/login', adminLoginLimiter, adminController.login);

// All other routes here are private and admin-only
router.use(authenticate);
router.use(authorize('admin'));

/**
 * Dashboard Stats
 */
router.get('/stats', adminController.getDashboardStats);

/**
 * User Management
 */
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserDetails);
router.patch('/users/:id/status', adminController.updateUserStatus);
router.delete('/users/:id', adminController.softDeleteUser);

/**
 * Seller Verification
 */
router.get('/sellers/verification-queue', adminController.getVerificationQueue);
router.patch('/sellers/verify/:id', adminController.verifySeller);

/**
 * Product Moderation
 */
router.get('/products/moderation-queue', adminController.getModerationQueue);
router.get('/products/:id', adminController.getProductDetails);
router.patch('/products/:id/moderate', adminController.moderateProduct);
router.delete('/products/:id', adminController.softDeleteProduct);

/**
 * Global Orders
 */
router.get('/orders', adminController.getGlobalOrders);
router.get('/orders/:id', adminController.getOrderDetails);
router.patch('/orders/:id/status-override', adminController.overrideOrderStatus);

/**
 * System Settings
 */
router.get('/settings', adminController.getSystemSettings);
router.patch('/settings', adminController.updateSystemSettings);

/**
 * Audit Logs
 */
router.get('/audit-logs', adminController.getAuditLogs);

module.exports = router;

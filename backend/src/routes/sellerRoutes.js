const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const { authenticate, authorize } = require('../middleware/auth');

// All routes are private and restricted to sellers/admins
router.use(authenticate);
router.use(authorize('seller', 'admin'));

/**
 * @route GET /api/seller/analytics
 * @desc Get financial analytics for the logged-in seller
 */
router.get('/analytics', sellerController.getSellerAnalytics);

/**
 * @route GET /api/seller/verification-status
 * @desc Get current verification status
 */
router.get('/verification-status', sellerController.getVerificationStatus);

/**
 * @route POST /api/seller/verify
 * @desc Submit or update verification data (TIN, Chapa Merchant ID)
 */
router.post('/verify', sellerController.submitVerification);

/**
 * @route PATCH /api/seller/profile
 * @desc Update seller profile information
 */
router.patch('/profile', sellerController.updateProfile);

module.exports = router;

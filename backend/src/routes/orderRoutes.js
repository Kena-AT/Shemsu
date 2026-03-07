const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validationMiddleware');
const { checkoutSchema, updateOrderItemStatusSchema } = require('../utils/validationSchemas');

/**
 * @route POST /api/orders/webhook
 * @desc Handle Chapa payment webhooks
 * @access Public (Signature verified)
 */
router.post('/webhook', orderController.handleWebhook);

/**
 * All routes below require authentication
 */
router.use(authenticate);

/**
 * @route POST /api/orders/checkout
 * @desc Create a new order and get Chapa checkout URL
 * @access Private (Buyer)
 */
router.post('/checkout', validate(checkoutSchema), orderController.createOrder);

/**
 * @route GET /api/orders/verify/:txRef
 * @desc Manually verify Chapa payment (Fallback for webhooks)
 * @access Private (Buyer)
 */
router.get('/verify/:txRef', orderController.verifyOrder);

/**
 * @route GET /api/orders/buyer
 * @desc Get order history for the logged in buyer
 * @access Private (Buyer)
 */
router.get('/buyer', orderController.getBuyerOrders);

/**
 * @route GET /api/orders/:id
 * @desc Get details for a single order
 * @access Private (Buyer/Seller)
 */
router.get('/:id', authorize('buyer', 'seller', 'admin'), orderController.getOrderDetails);

/**
 * @route GET /api/orders/seller
 * @desc Get orders for the logged in seller
 * @access Private (Seller)
 */
router.get('/seller', authorize('seller', 'admin'), orderController.getSellerOrders);

/**
 * @route PATCH /api/orders/item/:itemId/status
 * @desc Update the status of a specific order item
 * @access Private (Seller)
 */
router.patch('/item/:itemId/status', 
  authorize('buyer', 'seller', 'admin'), 
  validate(updateOrderItemStatusSchema),
  orderController.updateOrderItemStatus
);

module.exports = router;

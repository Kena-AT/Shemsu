const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validationMiddleware');
const { cartItemSchema, updateCartItemSchema } = require('../utils/validationSchemas');

// All cart routes require a logged-in buyer
router.use(authenticate);
router.use(authorize('buyer'));

router.get('/', cartController.getCart);
router.post('/add', validate(cartItemSchema), cartController.addToCart);
router.put('/item/:id', validate(updateCartItemSchema), cartController.updateCartItem);
router.delete('/item/:id', cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;

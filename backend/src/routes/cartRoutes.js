const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate, authorize } = require('../middleware/auth');

// All cart routes require a logged-in buyer
router.use(authenticate);
router.use(authorize('buyer'));

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/item/:id', cartController.updateCartItem);
router.delete('/item/:id', cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', productController.getProducts);
router.get('/categories', categoryController.getCategories);
router.get('/seller', authenticate, authorize('seller'), productController.getSellerProducts);
router.get('/:id', productController.getProductById);

// Protected routes (Sellers only)
router.post('/', 
  authenticate, 
  authorize('seller'), 
  uploadMultiple, 
  productController.createProduct
);

router.patch('/:id', 
  authenticate, 
  authorize('seller'), 
  uploadMultiple, 
  productController.updateProduct
);

router.delete('/:id', 
  authenticate, 
  authorize('seller'), 
  productController.deleteProduct
);

// Seller stats
router.get('/seller/stats', 
  authenticate, 
  authorize('seller'), 
  productController.getSellerStats
);

module.exports = router;

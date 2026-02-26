const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/uploadMiddleware');
const validate = require('../middleware/validationMiddleware');
const { productSchema } = require('../utils/validationSchemas');

// Public routes
router.get('/', productController.getProducts);
router.get('/categories', categoryController.getCategories);
router.get('/seller', authenticate, authorize('seller'), productController.getSellerProducts);
router.get('/:id', productController.getProductById);

// Review routes (Nested)
const reviewRoutes = require('./reviewRoutes');
router.use('/:id/reviews', reviewRoutes);

// Protected routes (Sellers only)
router.post('/', 
  authenticate, 
  authorize('seller'), 
  uploadMultiple, 
  validate(productSchema),
  productController.createProduct
);

router.patch('/:id', 
  authenticate, 
  authorize('seller'), 
  uploadMultiple, 
  validate(productSchema),
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

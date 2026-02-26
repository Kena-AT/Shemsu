const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, reviewController.addReview);
router.get('/', reviewController.getProductReviews);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rate limiting for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: 'Too many attempts from this IP, please try again after 15 minutes',
});

// Validation rules
const registerValidation = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('role').isIn(['buyer', 'seller']).withMessage('Invalid role'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
const { authenticate } = require('../middleware/auth');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', authLimiter, loginValidation, validate, authController.login);
router.post('/verify-email', authLimiter, authController.verifyEmail);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password', authLimiter, authController.resetPassword);
router.post('/refresh', authController.refresh);
router.get('/me', authenticate, authController.getMe);

module.exports = router;

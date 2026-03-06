const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middleware/validationMiddleware');
const { 
  registerSchema, 
  loginSchema, 
  verifyEmailSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema,
  contactFormSchema
} = require('../utils/validationSchemas');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for sensitive endpoints (Hardened)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many attempts from this IP, please try again after 15 minutes',
  }
});

// Routes
const { authenticate } = require('../middleware/auth');

router.get('/check', (req, res) => res.json({ message: 'Auth router is working' }));

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/verify-email', authLimiter, validate(verifyEmailSchema), authController.verifyEmail);
router.post('/resend-verification', authLimiter, validate(forgotPasswordSchema), authController.resendVerification);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);
router.post('/contact', validate(contactFormSchema), authController.submitContactForm);
router.post('/refresh', authController.refresh);
router.get('/me', authenticate, authController.getMe);

router.post('/test-email-api', authController.testEmailApi);

module.exports = router;

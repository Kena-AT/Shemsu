require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./config/logger');
const { initSentry, setupSentryErrorHandler } = require('./config/sentry');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const requestLogger = require('./middleware/requestLogger');
const cookieParser = require('cookie-parser'); // Added
const authRoutes = require('./routes/authRoutes'); // Added
const adminRoutes = require('./routes/adminRoutes'); // Added
const sellerRoutes = require('./routes/sellerRoutes'); // Added
const productRoutes = require('./routes/productRoutes'); // Added
const cartRoutes = require('./routes/cartRoutes'); // Added
const orderRoutes = require('./routes/orderRoutes'); // Added
const hpp = require('hpp');
const app = express();
const PORT = process.env.PORT || 5000;

// Sentry Init (must be first)
initSentry(app);

// Core Middleware
// 1. Helmet Security Headers (Hardened)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'", "https://api.chapa.co", "https://*.sentry.io"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  dnsPrefetchControl: { allow: false },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

// 2. Refined CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3100',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json({ limit: '10kb' })); // Body limit to prevent large payload attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use(cookieParser()); // Added cookieParser middleware
app.use(requestLogger);
app.use(rateLimiter);
// Routes
app.use('/api/auth', authRoutes); // Added authRoutes
app.use('/api/admin', adminRoutes); // Added adminRoutes
app.use('/api/seller', sellerRoutes); // Added sellerRoutes
app.use('/api/products', productRoutes); // Added productRoutes
app.use('/api/cart', cartRoutes); // Added cartRoutes
app.use('/api/orders', orderRoutes); // Added orderRoutes
// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sentry Error Handler (must be after all controllers, before other error handlers)
setupSentryErrorHandler(app);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

module.exports = app;

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
const app = express();
const PORT = process.env.PORT || 5000;
// Sentry Init (must be first)
initSentry(app);
// Core Middleware
app.use(helmet());
app.use(cors({ // Modified cors configuration
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
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

// Final Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

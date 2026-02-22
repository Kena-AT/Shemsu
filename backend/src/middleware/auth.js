const jwt = require('jsonwebtoken');
const { db } = require('../config/db');
const { users, systemSettings } = require('../models/schema');
const { eq, and } = require('drizzle-orm');
const logger = require('../config/logger');

/**
 * Authenticate middleware
 * Enforces:
 * 1. Valid JWT
 * 2. User exists and is not deleted
 * 3. User status is 'active' (not suspended or banned)
 * 4. System is not in maintenance mode (except for admins)
 */
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // 1. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Fetch fresh user data (Enforce real-time status)
    const [user] = await db.select()
      .from(users)
      .where(and(
        eq(users.id, decoded.id),
        eq(users.isDeleted, false)
      ))
      .limit(1);

    if (!user) {
      return res.status(401).json({ message: 'User not found or account deleted' });
    }

    // 3. Check behavioral status
    if (user.status === 'suspended') {
      return res.status(403).json({ 
        message: 'Your account has been suspended. Please contact support.',
        status: 'suspended'
      });
    }
    if (user.status === 'banned') {
      return res.status(403).json({ 
        message: 'Your account has been permanently banned.',
        status: 'banned'
      });
    }

    // 4. Maintenance Mode Check
    // We fetch maintenance mode from system_settings. Skip check for admins.
    if (user.role !== 'admin') {
      const [maintenanceMode] = await db.select()
        .from(systemSettings)
        .where(eq(systemSettings.key, 'maintenanceMode'))
        .limit(1);

      if (maintenanceMode && maintenanceMode.value === true) {
        return res.status(503).json({ 
          message: 'System is currently under maintenance. Please try again later.',
          maintenanceMode: true
        });
      }
    }

    // Attach fresh user info (role, status, etc.)
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired' });
    }
    logger.error(`Auth error: ${error.message}`);
    return res.status(403).json({ message: 'Invalid or unauthorized session' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };

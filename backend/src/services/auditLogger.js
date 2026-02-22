const { db } = require('../config/db');
const { auditLogs } = require('../models/schema');
const logger = require('../config/logger');

/**
 * Centralized Audit Logging Service
 */
class AuditLogger {
  /**
   * Log an administrative action
   * @param {Object} params
   * @param {string} params.adminId - ID of the admin performing the action
   * @param {string} params.action - Action name (e.g., 'SUSPEND_USER')
   * @param {string} params.targetType - Type of target (e.g., 'user', 'product', 'order')
   * @param {string} params.targetId - ID of the target entity
   * @param {Object} [params.oldValue] - Previous state of the target
   * @param {Object} [params.newValue] - New state of the target
   * @param {string} [params.reason] - Mandatory reason for destructive actions
   * @param {Object} [params.req] - Express request object for IP/UA extraction
   */
  async logAction({ adminId, action, targetType, targetId, oldValue, newValue, reason, req }) {
    try {
      // 1. Calculate Diff (store only changed fields)
      const changedFields = this._calculateDiff(oldValue, newValue);

      // 2. Validate Reason for destructive actions
      const destructiveActions = ['SUSPEND_USER', 'BAN_USER', 'REJECT_SELLER', 'DELETE_PRODUCT', 'OVERRIDE_ORDER_STATUS', 'DELETE_USER'];
      if (destructiveActions.includes(action) && !reason) {
        throw new Error(`Reason is mandatory for action: ${action}`);
      }

      // 3. Extract Context
      const ipAddress = req ? (req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress) : null;
      const userAgent = req ? req.headers['user-agent'] : null;

      // 4. Persistence
      await db.insert(auditLogs).values({
        adminId,
        action,
        targetType,
        targetId,
        changedFields,
        reason,
        ipAddress: ipAddress ? String(ipAddress).substring(0, 45) : null,
        userAgent,
      });

      logger.info(`Audit Log: Admin ${adminId} performed ${action} on ${targetType} ${targetId}`);
    } catch (error) {
      // Log failure but don't crash the main process unless it's a critical logic error
      logger.error(`Failed to create audit log: ${error.message}`);
    }
  }

  /**
   * Basic diffing logic to store only changed keys
   * Caps the JSON size implicitly by only storing changes.
   */
  _calculateDiff(oldVal, newVal) {
    if (!oldVal || !newVal) return newVal || null;
    
    const diff = {};
    const keys = new Set([...Object.keys(oldVal), ...Object.keys(newVal)]);
    
    for (const key of keys) {
      if (JSON.stringify(oldVal[key]) !== JSON.stringify(newVal[key])) {
        diff[key] = {
          from: oldVal[key],
          to: newVal[key]
        };
      }
    }
    
    // Return null if no changes detected
    return Object.keys(diff).length > 0 ? diff : null;
  }
}

module.exports = new AuditLogger();

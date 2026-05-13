// utils/logger.js — Simple request/error logger
// In production you'd swap this for winston or pino, but this is clear for beginners

const { NODE_ENV } = require('../config/env')

const logger = {
  /**
   * Log general info (only in development to keep production logs clean)
   */
  info: (message) => {
    if (NODE_ENV !== 'production') {
      console.log(`[INFO]  ${new Date().toISOString()}  ${message}`)
    }
  },

  /**
   * Always log errors regardless of environment
   */
  error: (message, err) => {
    console.error(`[ERROR] ${new Date().toISOString()}  ${message}`)
    if (err && NODE_ENV !== 'production') {
      console.error(err.stack || err)
    }
  },

  /**
   * Log warnings
   */
  warn: (message) => {
    console.warn(`[WARN]  ${new Date().toISOString()}  ${message}`)
  },
}

module.exports = logger

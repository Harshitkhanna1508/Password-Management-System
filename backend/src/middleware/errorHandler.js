// middleware/errorHandler.js — Global error handler (must be last middleware in app.js)
//
// Express identifies error-handling middleware by the 4-parameter signature: (err, req, res, next)
// Any controller that calls next(err) ends up here.

const logger = require('../utils/logger')
const { NODE_ENV } = require('../config/env')

const errorHandler = (err, req, res, next) => {
  // Default to 500 unless the error has a specific status code
  let statusCode = err.statusCode || 500
  let message    = err.message    || 'Internal Server Error'

  // ── Handle specific Mongoose errors with friendlier messages ──────────────

  // Duplicate key (e.g. email already registered)
  if (err.code === 11000) {
    statusCode = 409
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
  }

  // Mongoose validation errors (e.g. required field missing)
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
  }

  // Malformed MongoDB ObjectId
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid value for field: ${err.path}`
  }

  logger.error(`${req.method} ${req.originalUrl} → ${statusCode} ${message}`, err)

  res.status(statusCode).json({
    success: false,
    message,
    // Only include the raw stack trace in development (never expose in production)
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler

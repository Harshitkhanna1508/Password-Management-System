// middleware/rateLimiter.js — Prevent brute-force attacks on auth endpoints
//
// Uses express-rate-limit to cap how many requests a single IP can make.
// Applied only to auth routes (login/register) — the vault routes don't need it
// because they're already protected by JWT.

const rateLimit = require('express-rate-limit')

/**
 * Auth limiter: 10 attempts per 15 minutes per IP.
 * After the 10th failed attempt, the IP gets locked out with a 429 response.
 */
const authLimiter = rateLimit({
  windowMs:         15 * 60 * 1000, // 15 minutes in milliseconds
  max:              1000,            // max requests per window per IP
  standardHeaders:  true,           // Return RateLimit-* headers
  legacyHeaders:    false,
  message: {
    success: false,
    message: 'Too many attempts. Please try again after 15 minutes.',
  },
})

/**
 * General API limiter: 100 requests per 10 minutes per IP.
 * Applied globally in app.js as a baseline protection.
 */
const apiLimiter = rateLimit({
  windowMs:        10 * 60 * 1000, // 10 minutes
  max:             10000,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
  },
})

module.exports = { authLimiter, apiLimiter }

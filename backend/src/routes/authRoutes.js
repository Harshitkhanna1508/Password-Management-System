// routes/authRoutes.js — Maps HTTP methods + paths to auth controller functions
//
// Base path (set in app.js): /api/auth
// Full endpoints:
//   POST   /api/auth/register   → create new account
//   POST   /api/auth/login      → log in, receive JWT
//   GET    /api/auth/me         → get current user (requires token)

const express        = require('express')
const router         = express.Router()
const authController = require('../controllers/authController')
const { protect }    = require('../middleware/authMiddleware')
const { validateRegister, validateLogin } = require('../middleware/validateInput')
const { authLimiter } = require('../middleware/rateLimiter')

// Apply the strict rate limiter to all auth routes (brute-force protection)
router.use(authLimiter)

router.post('/register', validateRegister, authController.register)
router.post('/login',    validateLogin,    authController.login)
router.get( '/me',       protect,          authController.getMe)  // protected

module.exports = router

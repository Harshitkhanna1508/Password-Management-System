// controllers/authController.js — Register and Login logic
//
// Each function:
//   1. Reads validated data from req.body  (validation already ran in middleware)
//   2. Interacts with the DB / helpers
//   3. Sends back a JSON response

const User           = require('../models/User')
const { generateToken } = require('../utils/jwtHelper')
const logger         = require('../utils/logger')

// ── Helper: build the response sent back to the client ───────────────────────
// We NEVER send the password field back, even hashed.
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id)

  res.status(statusCode).json({
    success: true,
    token,                          // Frontend stores this in localStorage
    user: {
      id:        user._id,
      email:     user.email,
      createdAt: user.createdAt,
    },
  })
}

// ── POST /api/auth/register ───────────────────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if user already exists (give a clear error instead of a cryptic 500)
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }

    // Create user — the pre-save hook in User.js hashes the password automatically
    const user = await User.create({ email, password })

    logger.info(`New user registered: ${email}`)
    sendTokenResponse(user, 201, res)
  } catch (err) {
    next(err) // Passes error to the global errorHandler middleware
  }
}

// ── POST /api/auth/login ──────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Must explicitly select password because the schema has `select: false`
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      // Use the same message for "user not found" and "wrong password"
      // to avoid revealing whether an email is registered (security best practice)
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    // Compare the submitted password against the stored bcrypt hash
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    logger.info(`User logged in: ${email}`)
    sendTokenResponse(user, 200, res)
  } catch (err) {
    next(err)
  }
}

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
// Returns the currently logged-in user's profile (requires protect middleware)
const getMe = async (req, res) => {
  // req.user is attached by the protect middleware — no DB call needed again
  res.status(200).json({
    success: true,
    user: {
      id:        req.user._id,
      email:     req.user.email,
      createdAt: req.user.createdAt,
    },
  })
}

module.exports = { register, login, getMe }

// middleware/authMiddleware.js — Protect routes with JWT verification
//
// Usage: add `protect` as middleware on any route that requires login
//   router.get('/vault', protect, vaultController.getAll)

const { verifyToken } = require('../utils/jwtHelper')
const User = require('../models/User')

/**
 * protect — checks for a valid Bearer JWT in the Authorization header.
 * Attaches the full user object to req.user on success.
 */
const protect = async (req, res, next) => {
  // 1. Pull token from "Authorization: Bearer <token>" header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized — no token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // 2. Verify the token signature and expiry
    const decoded = verifyToken(token) // throws if invalid or expired

    // 3. Fetch the user from DB to ensure they still exist
    //    (e.g. account might have been deleted after token was issued)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' })
    }

    // 4. Attach user to request so controllers can access it
    req.user = user
    next()
  } catch (err) {
    // jwt.verify throws JsonWebTokenError or TokenExpiredError
    const message = err.name === 'TokenExpiredError'
      ? 'Session expired — please log in again'
      : 'Invalid token'
    return res.status(401).json({ success: false, message })
  }
}

module.exports = { protect }

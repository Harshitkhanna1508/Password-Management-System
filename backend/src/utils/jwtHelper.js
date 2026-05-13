// utils/jwtHelper.js — Sign and verify JSON Web Tokens
const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env')

/**
 * Generate a signed JWT for a given user ID.
 * @param {string} userId - MongoDB ObjectId of the user
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },   // payload — keep it minimal, no passwords!
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

/**
 * Verify a JWT and return the decoded payload.
 * Throws an error if the token is invalid or expired.
 * @param {string} token
 * @returns {object} Decoded payload { id, iat, exp }
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = { generateToken, verifyToken }

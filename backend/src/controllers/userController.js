// controllers/userController.js — User profile management
const User   = require('../models/User')
const logger = require('../utils/logger')

// ── GET /api/user/profile ─────────────────────────────────────────────────────
const getProfile = async (req, res) => {
  // req.user already loaded by protect middleware — no extra DB call needed
  res.status(200).json({
    success: true,
    data: {
      id:        req.user._id,
      email:     req.user.email,
      createdAt: req.user.createdAt,
    },
  })
}

// ── PUT /api/user/change-password ─────────────────────────────────────────────
// Allows user to update their master password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both current and new password are required' })
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' })
    }

    // Fetch with password (select: false in schema hides it by default)
    const user = await User.findById(req.user._id).select('+password')
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' })
    }

    // Setting and saving triggers the pre-save bcrypt hook automatically
    user.password = newPassword
    await user.save()

    logger.info(`Password changed for user: ${user.email}`)
    res.status(200).json({ success: true, message: 'Password updated successfully' })
  } catch (err) {
    next(err)
  }
}

// ── DELETE /api/user/account ──────────────────────────────────────────────────
// Permanently delete the user account and all their vault entries
const deleteAccount = async (req, res, next) => {
  try {
    const VaultEntry = require('../models/VaultEntry')

    // Remove all vault entries first, then the user
    await VaultEntry.deleteMany({ user: req.user._id })
    await User.findByIdAndDelete(req.user._id)

    logger.warn(`Account deleted: ${req.user.email}`)
    res.status(200).json({ success: true, message: 'Account and all data deleted permanently' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getProfile, changePassword, deleteAccount }

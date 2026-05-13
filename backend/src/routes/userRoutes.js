// routes/userRoutes.js — User profile management routes
//
// Base path (set in app.js): /api/user
// All routes here are JWT-protected
// Full endpoints:
//   GET    /api/user/profile          → get current user info
//   PUT    /api/user/change-password  → update master password
//   DELETE /api/user/account          → delete account + all vault data

const express          = require('express')
const router           = express.Router()
const userController   = require('../controllers/userController')
const { protect }      = require('../middleware/authMiddleware')

router.use(protect) // Protect all user routes

router.get(   '/profile',         userController.getProfile)
router.put(   '/change-password', userController.changePassword)
router.delete('/account',         userController.deleteAccount)

module.exports = router

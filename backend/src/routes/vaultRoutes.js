// routes/vaultRoutes.js — CRUD routes for password vault entries
//
// Base path (set in app.js): /api/vault
// ALL routes here require a valid JWT (protect middleware applied once at top)
// Full endpoints:
//   GET    /api/vault          → list all entries
//   GET    /api/vault/:id      → get one entry
//   POST   /api/vault          → create new entry
//   PUT    /api/vault/:id      → update entry
//   DELETE /api/vault/:id      → soft-delete entry

const express          = require('express')
const router           = express.Router()
const vaultController  = require('../controllers/vaultController')
const { protect }      = require('../middleware/authMiddleware')
const { validateVaultEntry } = require('../middleware/validateInput')

// Apply JWT protection to every vault route — no public vault endpoints
router.use(protect)

router.get( '/',    vaultController.getAll)
router.get( '/:id', vaultController.getOne)
router.post('/',    validateVaultEntry, vaultController.create)
router.put( '/:id', vaultController.update)
router.delete('/:id', vaultController.remove)

module.exports = router

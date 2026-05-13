// controllers/vaultController.js — CRUD for saved password entries
//
// All routes here require the `protect` middleware, so req.user is always available.
// Passwords are AES-256 encrypted before saving and decrypted before sending back.

const VaultEntry        = require('../models/VaultEntry')
const { encrypt, decrypt } = require('../utils/encryption')
const logger            = require('../utils/logger')

// ── GET /api/vault ────────────────────────────────────────────────────────────
// Fetch all vault entries belonging to the logged-in user
const getAll = async (req, res, next) => {
  try {
    const entries = await VaultEntry.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // newest first

    // Decrypt passwords before sending — client receives plain text
    const decrypted = entries.map((entry) => ({
      id:       entry._id,
      title:    entry.title,
      url:      entry.url,
      username: entry.username,
      password: decrypt(entry.encryptedPassword),   // ← decrypted here
      notes:    entry.encryptedNotes ? decrypt(entry.encryptedNotes) : '',
      category: entry.category,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }))

    res.status(200).json({ success: true, count: decrypted.length, data: decrypted })
  } catch (err) {
    next(err)
  }
}

// ── GET /api/vault/:id ────────────────────────────────────────────────────────
// Fetch a single entry by ID (must belong to the logged-in user)
const getOne = async (req, res, next) => {
  try {
    const entry = await VaultEntry.findOne({ _id: req.params.id, user: req.user._id })
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Entry not found' })
    }

    res.status(200).json({
      success: true,
      data: {
        id:       entry._id,
        title:    entry.title,
        url:      entry.url,
        username: entry.username,
        password: decrypt(entry.encryptedPassword),
        notes:    entry.encryptedNotes ? decrypt(entry.encryptedNotes) : '',
        category: entry.category,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

// ── POST /api/vault ───────────────────────────────────────────────────────────
// Create a new vault entry
const create = async (req, res, next) => {
  try {
    const { title, url, username, password, notes, category } = req.body

    const entry = await VaultEntry.create({
      user:              req.user._id,
      title,
      url:               url || '',
      username:          username || '',
      encryptedPassword: encrypt(password),              // ← encrypted before storing
      encryptedNotes:    notes ? encrypt(notes) : '',
      category:          category || 'General',
    })

    logger.info(`Vault entry created: "${title}" by user ${req.user._id}`)

    res.status(201).json({
      success: true,
      message: 'Entry saved successfully',
      data:    { id: entry._id, title: entry.title, category: entry.category },
    })
  } catch (err) {
    next(err)
  }
}

// ── PUT /api/vault/:id ────────────────────────────────────────────────────────
// Update an existing entry (only the owner can update)
const update = async (req, res, next) => {
  try {
    const entry = await VaultEntry.findOne({ _id: req.params.id, user: req.user._id })
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Entry not found' })
    }

    const { title, url, username, password, notes, category } = req.body

    // Only update fields that were actually sent in the request
    if (title)    entry.title    = title
    if (url)      entry.url      = url
    if (username) entry.username = username
    if (category) entry.category = category
    if (password) entry.encryptedPassword = encrypt(password) // re-encrypt new password
    if (notes !== undefined) entry.encryptedNotes = notes ? encrypt(notes) : ''

    await entry.save()

    res.status(200).json({ success: true, message: 'Entry updated successfully' })
  } catch (err) {
    next(err)
  }
}

// ── DELETE /api/vault/:id ─────────────────────────────────────────────────────
// Soft-delete an entry (sets isDeleted = true, does not remove from DB)
const remove = async (req, res, next) => {
  try {
    const entry = await VaultEntry.findOne({ _id: req.params.id, user: req.user._id })
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Entry not found' })
    }

    // Soft delete — the pre-find hook in VaultEntry.js auto-hides deleted entries
    entry.isDeleted = true
    await entry.save()

    logger.info(`Vault entry deleted: ${req.params.id} by user ${req.user._id}`)
    res.status(200).json({ success: true, message: 'Entry deleted successfully' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getOne, create, update, remove }

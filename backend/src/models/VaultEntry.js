// models/VaultEntry.js — Schema for each saved password entry
const mongoose = require('mongoose')

const vaultEntrySchema = new mongoose.Schema(
  {
    // Link every entry to its owner user
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      index:    true, // Speeds up "fetch all entries for user X"
    },
    // Site or app name e.g. "GitHub", "Netflix"
    title: {
      type:     String,
      required: [true, 'Title is required'],
      trim:     true,
      maxlength: 100,
    },
    // Website URL (optional)
    url: {
      type:  String,
      trim:  true,
      default: '',
    },
    // Username / email for that site
    username: {
      type:  String,
      trim:  true,
      default: '',
    },
    // ⚠️  Stored AES-256 encrypted — NEVER in plain text
    // The encryption/decryption happens in the controller via utils/encryption.js
    encryptedPassword: {
      type:     String,
      required: [true, 'Encrypted password is required'],
    },
    // Optional notes field, also stored encrypted
    encryptedNotes: {
      type:    String,
      default: '',
    },
    // Category tag e.g. "Social", "Finance", "Work"
    category: {
      type:    String,
      default: 'General',
      trim:    true,
    },
    // Soft-delete flag — entries are hidden but not erased immediately
    isDeleted: {
      type:    Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Auto-exclude deleted entries from all queries
vaultEntrySchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false })
  next()
})

module.exports = mongoose.model('VaultEntry', vaultEntrySchema)

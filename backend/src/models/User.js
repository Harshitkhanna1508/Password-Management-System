// models/User.js — Schema for registered users
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    email: {
      type:     String,
      required: [true, 'Email is required'],
      unique:   true,
      lowercase: true,
      trim:     true,
      match:    [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    // The master password is hashed — we NEVER store it in plain text
    password: {
      type:     String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select:   false, // Excluded from query results by default (security)
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
)

// ── Pre-save hook: hash the password before storing ──────────────────────────
// This runs whenever a user document is saved and the password field was changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next() // Skip if password unchanged

  const salt  = await bcrypt.genSalt(12) // 12 rounds = good security/speed balance
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// ── Instance method: compare a plain password against the stored hash ─────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)

// middleware/validateInput.js — Request body validation using express-validator
//
// These are reusable validation rule arrays.
// Use them as middleware arrays in the route definition:
//   router.post('/register', validateRegister, authController.register)

const { body, validationResult } = require('express-validator')

/**
 * Run validation rules and return 400 if any fail.
 * Always use this as the LAST item in your validation middleware array.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array().map((e) => ({ field: e.path, message: e.msg })),
    })
  }
  next()
}

// ── Validation rule sets ──────────────────────────────────────────────────────

/** Rules for POST /api/auth/register */
const validateRegister = [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
  handleValidationErrors,
]

/** Rules for POST /api/auth/login */
const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
]

/** Rules for POST/PUT /api/vault */
const validateVaultEntry = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
]

module.exports = { validateRegister, validateLogin, validateVaultEntry }

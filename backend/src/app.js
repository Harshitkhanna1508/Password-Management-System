// app.js — Express application setup
//
// This file only CONFIGURES the app (middleware + routes).
// It does NOT start listening — that happens in server.js.
// Keeping them separate makes the app easier to test.

const express      = require('express')
const cors         = require('cors')
const { apiLimiter } = require('./middleware/rateLimiter')
const errorHandler = require('./middleware/errorHandler')

// Import routers
const authRoutes  = require('./routes/authRoutes')
const vaultRoutes = require('./routes/vaultRoutes')
const userRoutes  = require('./routes/userRoutes')

const app = express()

// ── 1. Security & parsing middleware ──────────────────────────────────────────

// Allow requests from the React frontend (localhost:3000 in dev)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'production') {
      if (origin === process.env.CLIENT_URL) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    }
    
    // In dev, allow any localhost
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,           // Allow cookies if needed later
}))

// Parse incoming JSON request bodies
app.use(express.json({ limit: '10kb' })) // 10kb cap prevents large payload attacks

// Apply the general rate limiter to all /api/* routes
app.use('/api', apiLimiter)

// ── 2. API Routes ─────────────────────────────────────────────────────────────

app.use('/api/auth',  authRoutes)    // /api/auth/register, /api/auth/login
app.use('/api/vault', vaultRoutes)   // /api/vault/ (full CRUD)
app.use('/api/user',  userRoutes)    // /api/user/profile, /api/user/change-password

// ── 3. Health check endpoint ──────────────────────────────────────────────────
// Useful for checking if the server is up (no auth required)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'VaultX API is running',
    timestamp: new Date().toISOString(),
  })
})

// ── 4. 404 handler for unknown routes ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// ── 5. Global error handler (MUST be last) ────────────────────────────────────
app.use(errorHandler)

module.exports = app

// server.js — Entry point: load config, connect DB, start listening
//
// Run with: node src/server.js
// Dev mode:  npm run dev  (uses nodemon for auto-restart)

require('./config/env')          // Load + validate .env first — exits early if vars missing
const { connectDB } = require('./config/db')
const app           = require('./app')
const { PORT }      = require('./config/env')
const logger        = require('./utils/logger')

const startServer = async () => {
  // Connect to MongoDB before accepting any traffic
  await connectDB()

  const server = app.listen(PORT, () => {
    logger.info(`🚀  VaultX API running on http://localhost:${PORT}`)
    logger.info(`📋  Health check: http://localhost:${PORT}/api/health`)
    logger.info(`🌍  Environment: ${process.env.NODE_ENV}`)
  })

  // ── Graceful shutdown ──────────────────────────────────────────────────────
  // When the process is stopped (Ctrl+C or SIGTERM), close the server cleanly
  // so existing requests finish before the process exits.
  const shutdown = (signal) => {
    logger.warn(`${signal} received — shutting down gracefully...`)
    server.close(() => {
      logger.info('Server closed.')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))

  // Catch unhandled promise rejections (e.g. forgotten await)
  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled rejection — shutting down...', err)
    server.close(() => process.exit(1))
  })
}

startServer()

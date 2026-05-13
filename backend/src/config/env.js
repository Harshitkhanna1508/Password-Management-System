// config/env.js — Load and validate required environment variables early
const dotenv = require('dotenv')

dotenv.config()

const required = ['MONGO_URI', 'JWT_SECRET', 'ENCRYPTION_KEY']

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌  Missing required env variable: ${key}`)
    console.error(`    Copy .env.example to .env and fill in all values.`)
    process.exit(1)
  }
})

module.exports = {
  PORT:           process.env.PORT || 5000,
  MONGO_URI:      process.env.MONGO_URI,
  JWT_SECRET:     process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  NODE_ENV:       process.env.NODE_ENV || 'development',
}

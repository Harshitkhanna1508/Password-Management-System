// config/db.js — Connect to MongoDB using Mongoose
const mongoose = require('mongoose')
const { MONGO_URI } = require('./env')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`✅  MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`❌  MongoDB connection error: ${err.message}`)
    process.exit(1)
  }
}

// Helpful log when connection drops (e.g. network blip)
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️   MongoDB disconnected')
})

module.exports = { connectDB }

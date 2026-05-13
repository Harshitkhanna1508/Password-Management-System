// utils/encryption.js — AES-256-CBC encrypt / decrypt for vault passwords
//
// Why AES-256-CBC?
//   - Industry standard symmetric encryption
//   - Each encryption call uses a unique random IV (initialization vector)
//     so encrypting the same password twice gives different ciphertext
//
// The ENCRYPTION_KEY from .env must be exactly 32 bytes (characters) long.

const crypto = require('crypto')
const { ENCRYPTION_KEY } = require('../config/env')

const ALGORITHM = 'aes-256-cbc'
const KEY       = Buffer.from(ENCRYPTION_KEY, 'utf8') // must be 32 bytes
const IV_LENGTH = 16 // AES block size

/**
 * Encrypt a plain-text string.
 * Returns "iv:encryptedData" — the IV is stored alongside so we can decrypt later.
 * @param {string} plainText
 * @returns {string} "iv_hex:encrypted_hex"
 */
const encrypt = (plainText) => {
  const iv      = crypto.randomBytes(IV_LENGTH)         // fresh random IV each time
  const cipher  = crypto.createCipheriv(ALGORITHM, KEY, iv)
  const encrypted = Buffer.concat([
    cipher.update(plainText, 'utf8'),
    cipher.final(),
  ])
  // Store iv:data together so decrypt knows the IV used
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

/**
 * Decrypt a previously encrypted string.
 * @param {string} encryptedText "iv_hex:encrypted_hex"
 * @returns {string} Original plain-text
 */
const decrypt = (encryptedText) => {
  const [ivHex, dataHex] = encryptedText.split(':')
  const iv        = Buffer.from(ivHex, 'hex')
  const data      = Buffer.from(dataHex, 'hex')
  const decipher  = crypto.createDecipheriv(ALGORITHM, KEY, iv)
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()])
  return decrypted.toString('utf8')
}

module.exports = { encrypt, decrypt }

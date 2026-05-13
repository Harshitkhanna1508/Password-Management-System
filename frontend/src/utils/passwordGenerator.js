// utils/passwordGenerator.js — Utility to generate memorable real-world passwords

/**
 * Generates a memorable password based on user info and website name.
 * Format: [MemorableWord]@[WebsiteName][Number]!
 * 
 * @param {string} websiteName - The title or URL of the website.
 * @param {string} memorableWord - A word chosen by the user.
 * @param {string} memorableNumber - A number chosen by the user.
 * @returns {string} The generated password.
 */
export const generatePassword = (websiteName, memorableWord, memorableNumber, specialChar, secondaryWord, variationIndex = 0) => {
  // 1. Clean and format the website name (e.g., "Google Account" -> "Google", "github.com" -> "Github")
  let cleanWebsite = (websiteName || 'Vault').trim().split(' ')[0]
  cleanWebsite = cleanWebsite.replace(/^(https?:\/\/)?(www\.)?/, '') // Remove http/www
  cleanWebsite = cleanWebsite.split('.')[0] // Remove .com, .org, etc.
  
  // Capitalize first letter of the website name
  if (cleanWebsite.length > 0) {
    cleanWebsite = cleanWebsite.charAt(0).toUpperCase() + cleanWebsite.slice(1).toLowerCase()
  } else {
    cleanWebsite = 'Vault'
  }

  // 2. Format the memorable word (default to 'My' if not provided)
  let cleanWord = (memorableWord || 'My').trim()
  if (cleanWord.length > 0) {
    cleanWord = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1)
  } else {
    cleanWord = 'My'
  }

  // 3. Format the number (default to '123' if not provided)
  const cleanNumber = (memorableNumber || '123').trim()

  // 4. Format the special character (default to '!' if not provided)
  const cleanChar = (specialChar || '!').trim().charAt(0) || '!'

  // 5. Format the secondary word (default to empty if not provided)
  let cleanSecWord = (secondaryWord || '').trim()
  if (cleanSecWord.length > 0) {
    cleanSecWord = cleanSecWord.charAt(0).toUpperCase() + cleanSecWord.slice(1)
  }

  // Helper string if secondary word is present
  const secPart = cleanSecWord ? `${cleanSecWord}` : ''

  // 6. Assemble the password based on variationIndex
  const variation = variationIndex % 10

  switch (variation) {
    case 0:
      return `${cleanWord}${cleanChar}${cleanWebsite}${cleanNumber}${secPart}`
    case 1:
      return `${cleanWebsite}${secPart}${cleanChar}${cleanWord}${cleanNumber}`
    case 2:
      return `${cleanWord}${cleanNumber}${cleanChar}${cleanWebsite}${secPart}`
    case 3:
      return `${cleanNumber}${cleanWord}${cleanChar}${cleanWebsite}${secPart}`
    case 4:
      return `${cleanChar}${cleanWebsite}${cleanNumber}${secPart}${cleanWord}`
    case 5:
      return `${cleanNumber}${cleanChar}${cleanWebsite}${cleanChar}${cleanWord}${secPart}`
    case 6:
      return `${cleanWord}${cleanWebsite}${cleanNumber}${secPart}${cleanChar}`
    case 7:
      return `${cleanChar}${cleanWebsite}${cleanChar}${cleanWord}${cleanNumber}${secPart}`
    case 8:
      return `${cleanNumber}${cleanChar}${cleanWebsite}${cleanChar}${cleanWord}${secPart}`
    case 9:
      return `${cleanWebsite.toUpperCase()}${cleanChar}${cleanWord.toLowerCase()}${cleanNumber}${secPart}`
    default:
      return `${cleanWord}${cleanChar}${cleanWebsite}${cleanNumber}${secPart}`
  }
}

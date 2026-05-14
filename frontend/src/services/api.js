// api.js — Axios instance with base URL and auth token injection
import axios from 'axios'

let BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '/api'

// If it's a full URL (starts with http) and doesn't end in /api, append it
if (BASE_URL.startsWith('http') && !BASE_URL.endsWith('/api')) {
  BASE_URL = BASE_URL.replace(/\/$/, '') + '/api'
}

console.log('[VaultX] API base URL:', BASE_URL)

const api = axios.create({
  baseURL: BASE_URL,
})

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Normalize errors so network/CORS failures always have a readable message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or CORS block — no response received
      error.message = 'Cannot reach the server. Please check your connection or try again later.'
    }
    return Promise.reject(error)
  }
)

export default api

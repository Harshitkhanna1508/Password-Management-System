// api.js — Axios instance with base URL and auth token injection
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
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

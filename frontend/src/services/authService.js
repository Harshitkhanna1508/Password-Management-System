// services/authService.js — All auth-related API calls
//
// This is the only file that knows the /api/auth endpoints.
// Components call these functions — they never call axios directly.

import api from './api'

/**
 * Register a new account
 * @param {string} email
 * @param {string} password
 * @returns {{ token, user }}
 */
export const register = async (email, password) => {
  const { data } = await api.post('/auth/register', { email, password })
  return data // { success, token, user }
}

/**
 * Log in with email + master password
 * @param {string} email
 * @param {string} password
 * @returns {{ token, user }}
 */
export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data // { success, token, user }
}

/**
 * Fetch the currently logged-in user's profile
 * (requires a valid token stored in localStorage — api.js injects it automatically)
 * @returns {{ user }}
 */
export const getMe = async () => {
  const { data } = await api.get('/auth/me')
  return data
}

/**
 * Store the JWT token in localStorage so api.js can attach it to future requests
 * @param {string} token
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token)
}

/**
 * Remove the JWT token (called on logout)
 */
export const clearToken = () => {
  localStorage.removeItem('token')
}

/**
 * Check if a token exists in localStorage
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

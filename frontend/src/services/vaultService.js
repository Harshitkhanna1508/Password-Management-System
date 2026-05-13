// services/vaultService.js — All vault CRUD API calls
//
// Every function returns the `data` object from the backend response.
// The JWT token is attached automatically by the axios interceptor in api.js.

import api from './api'

/**
 * Fetch all vault entries for the logged-in user
 * @returns {{ count, data: VaultEntry[] }}
 */
export const getAll = async () => {
  const { data } = await api.get('/vault')
  return data.data || []
}

/**
 * Fetch a single vault entry by ID
 * @param {string} id - MongoDB ObjectId
 */
export const getOne = async (id) => {
  const { data } = await api.get(`/vault/${id}`)
  return data.data
}

/**
 * Create a new vault entry
 * @param {{ title, url, username, password, notes, category }} entry
 */
export const create = async (entry) => {
  const { data } = await api.post('/vault', entry)
  return data
}

/**
 * Update an existing vault entry (only send changed fields)
 * @param {string} id
 * @param {Partial<{title, url, username, password, notes, category}>} updates
 */
export const update = async (id, updates) => {
  const { data } = await api.put(`/vault/${id}`, updates)
  return data
}

/**
 * Soft-delete a vault entry
 * @param {string} id
 */
export const remove = async (id) => {
  const { data } = await api.delete(`/vault/${id}`)
  return data
}

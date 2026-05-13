// context/AuthContext.jsx — Global authentication state
//
// Wrap your app in <AuthProvider> and use the useAuth() hook in any component
// to get { user, isLoading, login, logout, register }

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import * as authService from '../services/authService'

// ── Create the context ────────────────────────────────────────────────────────
const AuthContext = createContext(null)

// ── Provider component ────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [isLoading, setIsLoading] = useState(true) // true on mount while we check localStorage

  // ── On first load: if a token exists, fetch the user profile ────────────────
  // This keeps the user logged in across page refreshes
  useEffect(() => {
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const { user } = await authService.getMe()
          setUser(user)
        } catch {
          // Token may be expired — clean it up
          authService.clearToken()
          setUser(null)
        }
      }
      setIsLoading(false)
    }
    initAuth()
  }, [])

  // ── login: call API, store token, set user in state ─────────────────────────
  const login = useCallback(async (email, password) => {
    const { token, user } = await authService.login(email, password)
    authService.saveToken(token)
    setUser(user)
    return user
  }, [])

  // ── register: call API, store token, set user in state ──────────────────────
  const register = useCallback(async (email, password) => {
    const { token, user } = await authService.register(email, password)
    authService.saveToken(token)
    setUser(user)
    return user
  }, [])

  // ── logout: clear token + user state ────────────────────────────────────────
  const logout = useCallback(() => {
    authService.clearToken()
    setUser(null)
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Custom hook — use this in any component ───────────────────────────────────
// Usage: const { user, login, logout } = useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

// hooks/useAuth.js — Convenience re-export of the AuthContext hook
//
// This lets you import from either location:
//   import { useAuth } from '../context/AuthContext'   ← directly from context
//   import { useAuth } from '../hooks/useAuth'         ← via hook folder (cleaner in components)

export { useAuth } from '../context/AuthContext'

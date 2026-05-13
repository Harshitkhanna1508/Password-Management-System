// App.jsx — Root component with routing and auth provider
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import LandingPage   from './pages/LandingPage'
import SettingsPage  from './pages/SettingsPage'
import GeneratorPage from './pages/GeneratorPage'
import SecurityAuditPage from './pages/SecurityAuditPage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import SecurityPage from './pages/SecurityPage'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './components/UI/Layout'

// ── ProtectedRoute: redirects to /login if not logged in ──────────────────────────
// Wrap any page that requires auth: <ProtectedRoute><DashboardPage /></ProtectedRoute>
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  // While checking localStorage / fetching user, show nothing (avoids flash)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center transition-colors duration-300">
        <svg className="animate-spin w-8 h-8 text-[#6366f1]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }

  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" replace />
}

// ── GuestRoute: redirects to /dashboard if already logged in ─────────────────
// Prevents logged-in users from seeing the login/register pages
function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center transition-colors duration-300">
        <svg className="animate-spin w-8 h-8 text-[#6366f1]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

// ── Routes ────────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/security" element={<SecurityPage />} />

      {/* Auth routes — redirect to dashboard if already logged in */}
      <Route path="/login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

      {/* Protected routes — redirect to login if not authenticated */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/generator" element={<ProtectedRoute><GeneratorPage /></ProtectedRoute>} />
      <Route path="/audit"     element={<ProtectedRoute><SecurityAuditPage /></ProtectedRoute>} />
      <Route path="/settings"  element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

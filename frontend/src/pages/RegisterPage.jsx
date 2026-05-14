import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const navigate  = useNavigate()
  const { register } = useAuth()

  const [fullName, setFullName]         = useState('')
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [confirm, setConfirm]           = useState('')
  const [agreed, setAgreed]             = useState(false)
  const [isLoading, setIsLoading]       = useState(false)
  const [error, setError]               = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)

  const getStrength = (pwd) => {
    let score = 0
    if (!pwd) return 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }

  const strength = getStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    if (!agreed) {
      setError('You must agree to the Terms and Conditions')
      return
    }

    setIsLoading(true)
    try {
      // Backend might only take email/password, ignoring fullName for now to ensure compatibility
      await register(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans relative overflow-hidden flex flex-col transition-colors duration-300">
      {/* Top Header */}
      <header className="px-8 py-6 flex items-center justify-between relative z-20">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight uppercase">VAULTX</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-12 text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Features</a>
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Security</a>
        </nav>

        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Login</Link>
          <Link to="/register" className="bg-[#6366f1] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all">Get Started</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10 py-20">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-[580px] bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-12 shadow-xl dark:shadow-2xl relative">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-[var(--color-text)]">Secure Your Identity</h2>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">Create your encrypted vault in seconds.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[#6366f1] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] h-14 pl-5 pr-12 rounded-2xl font-medium placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[#6366f1] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] h-14 pl-5 pr-12 rounded-2xl font-medium placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase ml-1">Master Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[#6366f1] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] h-14 pl-12 pr-12 rounded-2xl font-medium placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              <div className="flex gap-1.5 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i} 
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      i <= strength 
                        ? i === 1 ? 'bg-orange-400' : i === 2 ? 'bg-green-400' : i === 3 ? 'bg-[#6366f1]' : 'bg-indigo-600'
                        : 'bg-white/10'
                    }`}
                  ></div>
                ))}
              </div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${strength >= 3 ? 'text-green-400' : 'text-[var(--color-text-muted)]'}`}>
                {strength === 0 ? '' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Strong Security' : 'Military Grade'}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase ml-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[#6366f1] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] h-14 pl-12 pr-12 rounded-2xl font-medium placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {showConfirm ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-4 cursor-pointer group mt-8">
              <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center shrink-0 ${agreed ? 'bg-[#6366f1] border-[#6366f1]' : 'border-[var(--color-border)] bg-transparent group-hover:border-[#6366f1]'}`}>
                <input type="checkbox" className="hidden" checked={agreed} onChange={() => setAgreed(!agreed)} />
                {agreed && <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
              </div>
              <span className="text-sm text-[var(--color-text-muted)] font-medium leading-relaxed">
                I agree to the <span className="text-[#6366f1] hover:underline">Terms and Conditions</span> and the <span className="text-[#6366f1] hover:underline">Privacy Policy</span>.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-gradient-to-r from-[#818cf8] to-[#4f46e5] rounded-full font-bold text-white shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Create Account
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[var(--color-text-muted)] text-sm font-bold">
              Already have an account? <Link to="/login" className="text-[var(--color-text)] hover:underline ml-1">Login</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Fingerprint Decor */}
      <div className="absolute bottom-10 right-10 opacity-20 pointer-events-none hidden lg:block">
        <svg className="w-24 h-24 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.268 0 2.39.234 3.468.657m-3.42 5.692L12 9m-4.745 4c.132-1.614.886-3.034 2.014-4.142m1.964-1.874A7.963 7.963 0 0112 7c4.418 0 8 3.582 8 8 0 .5-.045 1-.135 1.487m-1.53 3.399a7.95 7.95 0 01-3.005 1.104m-3.005 1.104L10 20m4-10V8m0 0l-1.5 1.5M14 8l1.5 1.5" />
        </svg>
        <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-center mt-2 text-[var(--color-text-muted)]">Secure Vault</span>
      </div>

      {/* Footer */}
      <footer className="px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 bg-[var(--color-bg)] transition-colors duration-300">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 bg-[#6366f1] rounded-md flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight uppercase text-[var(--color-text)]">VAULTX</span>
        </Link>
        
        <div className="flex items-center gap-8 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Help Center</a>
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Security Audit</a>
          <a href="#" className="hover:text-[var(--color-text)] transition-colors">Status</a>
        </div>

        <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-widest">
          © 2026 VAULTX Digital Security. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

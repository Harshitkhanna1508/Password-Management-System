import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe]     = useState(false)
  const [isLoading, setIsLoading]       = useState(false)
  const [error, setError]               = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.')
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
        
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
          <span>Encrypted Session</span>
          <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-[480px] bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-xl dark:shadow-2xl relative">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-[#6366f1] rounded-[20px] flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/20">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-3 tracking-tight text-[var(--color-text)]">Sign in to VaultX</h2>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-[280px]">Access your encrypted vault with military-grade security.</p>
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
              <label className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase ml-1">Vault Identifier</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[#6366f1] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/5 transition-all text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase ml-1">Access Key</label>
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
                  className="w-full pl-12 pr-14 py-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/5 transition-all text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-[#6366f1] border-[#6366f1]' : 'border-[var(--color-border)] bg-transparent group-hover:border-[#6366f1]/50'}`}>
                  {rememberMe && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>}
                </div>
                <input type="checkbox" className="hidden" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <span className="text-[var(--color-text-muted)] font-medium text-sm">Remember vault</span>
              </label>
              <button type="button" className="text-sm font-bold text-[#6366f1] hover:underline">Forgot access key?</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6366f1] text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? 'Verifying...' : 'Unlock Vault'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <div className="relative py-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--color-border)]"></div></div>
            <span className="relative px-4 bg-[var(--color-surface)] text-[10px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['Google', 'GitHub'].map(platform => (
              <button key={platform} className="py-4 border border-[var(--color-border)] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--color-surface-soft)] transition-colors text-[var(--color-text)]">
                {platform}
              </button>
            ))}
          </div>

          <p className="text-[var(--color-text-muted)] text-sm text-center mt-10">
            New to VaultX? <Link to="/register" className="text-[#6366f1] font-black hover:underline">Establish Security Protocol</Link>
          </p>
        </div>
      </main>

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

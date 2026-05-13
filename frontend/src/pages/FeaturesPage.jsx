import { Link } from 'react-router-dom'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans selection:bg-[#6366f1] selection:text-white relative overflow-hidden transition-colors duration-300 pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight uppercase text-[var(--color-text)]">VAULTX</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/register" className="text-sm font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors uppercase tracking-widest text-[10px]">Register</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto pt-48 px-8 space-y-32">
        {/* Header */}
        <section className="space-y-8">
          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)]">
            Impenetrable Defense. <br />
            <span className="text-[#6366f1]">Built for Scale.</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl font-medium">
            Engineered for enterprise environments requiring absolute control and clarity under pressure.
          </p>
        </section>

        {/* Features List */}
        <section className="space-y-12">
          {[
            {
              title: 'Military-Grade Encryption',
              desc: 'AES-256 bit encryption applied at the block level, ensuring data remains unreadable even if physical infrastructure is compromised.',
              icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            },
            {
              title: 'Secure Sharing',
              desc: 'Granular access controls with ephemeral link generation. Revoke access instantly across the global network.',
              icon: 'M8 17a2 2 0 110-4 2 2 0 010 4zM12 17a2 2 0 110-4 2 2 0 010 4zM16 17a2 2 0 110-4 2 2 0 010 4zM3 13V7a2 2 0 012-2h14a2 2 0 012 2v6M3 13a2 2 0 002 2h14a2 2 0 002-2M3 13l2-2m14 2l-2-2'
            },
            {
              title: 'Seamless Auto-fill',
              desc: 'Cross-platform credential injection verified by biometric intent. Frictionless access without compromising posture.',
              icon: 'M13 10V3L4 14h7v7l9-11h-7z'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-12 hover:bg-[var(--color-surface)] transition-all group">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-16 h-16 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center text-[#6366f1] shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[var(--color-text)]">{feature.title}</h3>
                  <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Security Protocol Terminal */}
        <section className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)]">Security Protocol</h4>
          <div className="bg-[#0c0c0e] border border-[var(--color-border)] rounded-3xl p-10 font-mono text-sm overflow-hidden relative shadow-2xl">
            <div className="flex gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
            </div>
            <div className="space-y-4">
              <p className="text-purple-400">root@vaultx: ~# <span className="text-white">init_defense_matrix</span></p>
              <p className="text-gray-500">[ OK ] Loading cryptography modules...</p>
              <p className="text-gray-500">[ OK ] Establishing zero-knowledge tunnel...</p>
              <p className="text-indigo-400 mt-6">SYS_STATUS: SECURE_AND_ACTIVE</p>
              <div className="w-2 h-5 bg-indigo-500 animate-pulse inline-block align-middle ml-1"></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 border-t border-[var(--color-border)] text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tight text-[var(--color-text)]">VAULTX</h2>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              <Link to="/features" className="text-[var(--color-text)]">Solutions</Link>
              <Link to="/security" className="hover:text-[var(--color-text)] transition-colors">Security</Link>
              <Link to="/pricing" className="hover:text-[var(--color-text)] transition-colors">Pricing</Link>
              <Link to="#" className="hover:text-[var(--color-text)] transition-colors">About</Link>
            </div>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.3em]">© 2026 VAULTX. Digital Fortitude Securing the Future.</p>
        </footer>
      </main>
    </div>
  )
}

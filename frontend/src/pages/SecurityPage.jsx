import { Link } from 'react-router-dom'

export default function SecurityPage() {
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
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6366f1]">Security Whitepaper</h4>
          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)]">
            Zero-Knowledge <br />
            <span className="text-[#6366f1]">Architecture</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl font-medium">
            An in-depth analysis of cryptographic isolation, data sovereignty, and the theoretical limits of provable security in hostile environments.
          </p>
        </section>

        {/* Cryptographic Proof */}
        <section className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-12 space-y-10">
          <div className="flex items-center gap-4 text-[#6366f1]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m0 0L10 4m2 1v2.5M4 7l2-1M4 7l2 1M4 7v2.5M10 21l2-1m2 1l-2-1m2 1v2.5M6 18l2-1m2 1l-2-1m2 1v2.5" />
            </svg>
            <h3 className="text-2xl font-bold">Cryptographic Proof</h3>
          </div>
          
          <div className="bg-[#0c0c0e] rounded-3xl p-10 font-mono text-sm overflow-x-auto">
            <pre className="text-purple-300 leading-relaxed">
{`Let P = (P, V) be an interactive proof system for L.
P is computational zero-knowledge if:
∀V* ∃S ∀x ∈ L:
View_V*(P, V*, x) ≈ C(S(x))

# Meaning: The verifier learns nothing
# beyond the validity of the statement.`}
            </pre>
          </div>
        </section>

        {/* Security Cards */}
        <section className="space-y-12">
          {[
            {
              title: 'End-to-End Encryption',
              desc: 'Keys are generated and stored exclusively on client hardware. The server possesses only ciphertext.',
              icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
            },
            {
              title: 'Data Sovereignty',
              desc: 'Absolute control over data residency and compliance auditing via cryptographic attestation.',
              icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
            }
          ].map((item, i) => (
            <div key={i} className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-12 hover:bg-[var(--color-surface)] transition-all group">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-16 h-16 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center text-[#6366f1] shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[var(--color-text)]">{item.title}</h3>
                  <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Download Section */}
        <section className="text-center space-y-8 pt-10">
          <button className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white px-12 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all flex items-center justify-center gap-4 mx-auto">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Whitepaper
          </button>
          <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.4em]">PDF, 4.2 MB. Includes implementation appendices.</p>
        </section>

        {/* Footer */}
        <footer className="pt-24 border-t border-[var(--color-border)] text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tight text-[var(--color-text)]">VAULTX</h2>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              <Link to="/features" className="hover:text-[var(--color-text)] transition-colors">Solutions</Link>
              <Link to="/security" className="text-[var(--color-text)]">Security</Link>
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

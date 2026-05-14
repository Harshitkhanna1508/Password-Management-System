import { Link } from 'react-router-dom'

export default function LandingPage() {
  const heroImageUrl = "/hero.png"

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans selection:bg-[#6366f1] selection:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Global Background Glows */}
      <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[500px] bg-purple-900/5 blur-[150px] rounded-full pointer-events-none"></div>

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
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em]">
            <Link to="/features" className="hover:text-[var(--color-text)] transition-colors">Features</Link>
            <Link to="/pricing" className="hover:text-[var(--color-text)] transition-colors">Pricing</Link>
            <Link to="/security" className="hover:text-[var(--color-text)] transition-colors">Security</Link>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/login" className="text-sm font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Login</Link>
            <Link to="/register" className="bg-[#6366f1] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-8 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-10">
            <div className="inline-flex items-center gap-3 bg-[var(--color-surface-soft)] border border-[var(--color-border)] px-4 py-2 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">v2.4 Security Protocol Active</span>
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-[var(--color-text)]">
              Secure Your <br />
              <span className="text-[#6366f1] drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">Passwords</span>
            </h1>
            
            <p className="text-xl text-[var(--color-text-muted)] leading-relaxed max-w-lg">
              The next generation of digital fortitude. Protect your digital identity with impenetrable encryption and seamless automation.
            </p>
            
            <div className="flex flex-wrap gap-6 mt-4">
              <Link to="/register" className="bg-[#6366f1] text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:scale-105 hover:bg-[#4f46e5] transition-all">
                Get Started Now
              </Link>
              <button className="bg-[var(--color-surface-soft)] border border-[var(--color-border)] text-[var(--color-text)] px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[var(--color-surface)] transition-all flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                View Security Protocol
              </button>
            </div>

            <div className="flex items-center gap-8 mt-8 grayscale opacity-30">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Trusted By</span>
              <div className="flex gap-8">
                {['Amazon', 'Google', 'Netflix', 'SpaceX'].map(brand => (
                  <span key={brand} className="text-sm font-black italic text-[var(--color-text)]">{brand}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-[#6366f1]/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-[#6366f1]/30 transition-all duration-700"></div>
            <div className="relative rounded-[48px] overflow-hidden border border-[var(--color-border)] shadow-2xl p-2 bg-[var(--color-surface-soft)]">
              <img 
                src={heroImageUrl} 
                alt="Security Illustration" 
                className="w-full h-full object-cover rounded-[40px] shadow-inner"
                onError={(e) => {
                   e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                }}
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-8 bg-[var(--color-bg)] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-bold mb-6 tracking-tight text-[var(--color-text)]">Uncompromising Protection</h2>
            <p className="text-[var(--color-text-muted)] font-bold text-[10px] uppercase tracking-[0.4em] max-w-lg mx-auto leading-relaxed">Built on zero-trust principles for the modern web. Every character is shielded by high-level encryption.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Auto-fill', 
                desc: 'Intelligent detection across all your devices and browsers, entering credentials faster than a heartbeat.',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z'
              },
              { 
                title: 'Secure Sharing', 
                desc: 'Securely delegate access to teams or family members without ever exposing the raw password data.',
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              },
              { 
                title: 'Military-grade Encryption', 
                desc: 'AES-256 bit encryption ensures that your data remains yours alone. Even we can\'t see what\'s inside.',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[var(--color-surface)] p-12 rounded-[40px] border border-[var(--color-border)] hover:border-[#6366f1]/50 hover:bg-[var(--color-surface-soft)] transition-all group relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#6366f1]/5 rounded-full blur-2xl group-hover:bg-[#6366f1]/10 transition-all"></div>
                <div className="w-16 h-16 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center text-[#6366f1] mb-10 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]">{feature.title}</h3>
                <p className="text-[var(--color-text-muted)] text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text)]">Trusted by the Elite</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Alex Rivera', 
                title: 'CTO @ NEXUS TECH', 
                quote: '"VAULTX redefined our internal security posture. The glassmorphic UI isn\'t just beautiful—it\'s incredibly intuitive for our entire team."'
              },
              { 
                name: 'Sarah Chen', 
                title: 'SECURITY RESEARCHER', 
                quote: '"As a researcher, I\'ve seen it all. VAULTX is the only manager I trust with my personal keys. The encryption logic is flawless."'
              },
              { 
                name: 'Jameson Blake', 
                title: 'LEAD DEV @ CLOUDSCALE', 
                quote: '"The autofill speed is unmatched. It feels less like software and more like an extension of my own digital workflow."'
              }
            ].map((t, i) => (
              <div key={i} className="bg-[var(--color-surface)] p-10 rounded-[32px] border border-[var(--color-border)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/20"></div>
                  <div>
                    <p className="font-bold text-sm text-[var(--color-text)]">{t.name}</p>
                    <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{t.title}</p>
                  </div>
                </div>
                <p className="text-[var(--color-text-muted)] italic text-sm leading-relaxed mb-8 relative z-10">{t.quote}</p>
                <div className="flex gap-1 text-[#6366f1] relative z-10">
                  {[1,2,3,4,5].map(s => <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-bg)] border border-[var(--color-border)] rounded-[48px] p-24 text-center relative overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-indigo-500/10 transition-colors duration-300">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#6366f1]/20 blur-[150px] rounded-full"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full"></div>
            
            <h2 className="text-6xl font-bold mb-8 tracking-tight text-[var(--color-text)]">Ready for Absolute Security?</h2>
            <p className="text-xl text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto leading-relaxed">
              Join 500,000+ users who have fortified their digital lives with the world's most advanced password manager.
            </p>
            
            <Link to="/register" className="inline-flex items-center justify-center bg-gradient-to-r from-[#7c3aed] to-[#4361ee] text-white px-14 py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(99,102,241,0.4)] hover:scale-105 hover:translate-y-[-2px] transition-all mb-6">
              Create Your Free Vault
            </Link>
            <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.4em]">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-12 px-8 border-t border-[var(--color-border)] bg-[var(--color-bg)] relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-24">
            <div className="flex flex-col gap-8">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-xl font-black uppercase tracking-tight text-[var(--color-text)]">VAULTX</span>
              </Link>
              <p className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">Securing the digital world, one character at a time.</p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Resources', links: ['Security Whitepaper', 'Privacy Policy', 'Terms of Service'] },
              { title: 'Support', links: ['Help Center', 'Status', 'Contact Us'] }
            ].map((col, i) => (
              <div key={i} className="flex flex-col gap-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text)]">{col.title}</h4>
                <ul className="flex flex-col gap-5 text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                  {col.links.map(link => (
                    <li key={link}>
                      <Link 
                        to={link === 'Features' ? '/features' : link === 'Pricing' ? '/pricing' : link === 'Security' ? '/security' : '#'} 
                        className="hover:text-[var(--color-text)] transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-[var(--color-border)] gap-8">
            <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase tracking-[0.3em]">© 2026 VAULTX Security. All rights reserved.</p>
            <div className="flex gap-10 text-[var(--color-text-muted)] font-black text-[10px] uppercase tracking-widest">
              <a href="#" className="hover:text-[var(--color-text)] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[var(--color-text)] transition-colors">Discord</a>
              <a href="#" className="hover:text-[var(--color-text)] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

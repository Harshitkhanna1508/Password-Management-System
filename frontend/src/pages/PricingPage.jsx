import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const plans = [
    {
      name: 'Personal',
      price: 'Free',
      desc: 'Essential security for individuals.',
      features: ['Single Device Protection', 'Basic Threat Monitoring'],
      notIncluded: ['Priority Support'],
      cta: 'Get Started'
    },
    {
      name: 'Premium',
      price: '₹99',
      unit: '/mo',
      desc: 'Advanced control for professionals.',
      features: ['Unlimited Devices', 'Real-time Anomaly Detection', '24/7 Priority Support', 'Encrypted Vault Access'],
      cta: 'Upgrade Now',
      popular: true
    },
    {
      name: 'Family',
      price: '₹199',
      unit: '/mo',
      desc: 'Shared security ecosystem.',
      features: ['Up to 6 Accounts', 'Centralized Dashboard', 'Shared Threat Intel'],
      cta: 'Choose Family'
    }
  ]

  const faqs = [
    { q: 'Can I change plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time from your settings panel.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and cryptocurrency for annual plans.' },
    { q: 'Is there a free trial for Premium?', a: 'Yes, every new account comes with a 14-day free trial of our Premium features.' }
  ]

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
            <Link to="/register" className="bg-[#6366f1] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all">Register</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto pt-48 px-8 space-y-32">
        {/* Header */}
        <section className="text-center space-y-6">
          <h1 className="text-6xl font-bold tracking-tight text-[var(--color-text)]">Secure Your Future</h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto font-medium">
            Enterprise-grade protection scaled for every level of your operation.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-[var(--color-surface)]/40 backdrop-blur-xl border rounded-[40px] p-10 flex flex-col gap-10 transition-all group ${plan.popular ? 'border-[#6366f1] shadow-2xl shadow-indigo-500/10' : 'border-[var(--color-border)] hover:bg-[var(--color-surface)]'}`}>
              {plan.popular && (
                <div className="absolute -top-4 right-8 bg-[#6366f1] text-white text-[8px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">Best Value</div>
              )}
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[var(--color-text)]">{plan.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{plan.desc}</p>
                <div className="pt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[var(--color-text)]">{plan.price}</span>
                  {plan.unit && <span className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{plan.unit}</span>}
                </div>
              </div>

              <div className="flex-1 space-y-5">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-4 text-sm font-medium text-[var(--color-text)]">
                    <svg className="w-5 h-5 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </div>
                ))}
                {plan.notIncluded?.map((f, j) => (
                  <div key={j} className="flex items-center gap-4 text-sm font-medium text-[var(--color-text-muted)] opacity-50">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${plan.popular ? 'bg-[#6366f1] text-white shadow-xl shadow-indigo-500/20 hover:scale-[1.02]' : 'bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-soft)]'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl font-bold text-center tracking-tight text-[var(--color-text)]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[var(--color-border)] rounded-3xl overflow-hidden bg-[var(--color-surface)]/20">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[var(--color-surface-soft)] transition-colors"
                >
                  <span className="font-bold text-[var(--color-text)]">{faq.q}</span>
                  <svg className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${openFaq === i ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 border-t border-[var(--color-border)] text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tight text-[var(--color-text)]">VAULTX</h2>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              <Link to="/features" className="hover:text-[var(--color-text)] transition-colors">Solutions</Link>
              <Link to="/security" className="hover:text-[var(--color-text)] transition-colors">Security</Link>
              <Link to="/pricing" className="text-[var(--color-text)]">Pricing</Link>
              <Link to="#" className="hover:text-[var(--color-text)] transition-colors">About</Link>
            </div>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.3em]">© 2026 VAULTX. Digital Fortitude Securing the Future.</p>
        </footer>
      </main>
    </div>
  )
}

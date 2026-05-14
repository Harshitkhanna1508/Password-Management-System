import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Sidebar({ onAddItem }) {
  const { logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { name: 'Vault', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )},
    { name: 'Security Audit', path: '/audit', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { name: 'Generator', path: '/generator', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    )},
    { name: 'Settings', path: '/settings', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )}
  ]

  return (
    <aside className="w-[280px] hidden md:flex flex-col h-screen bg-[var(--color-bg)] fixed left-0 top-0 border-r border-[var(--color-border)] z-40 selection:bg-[#6366f1] selection:text-white transition-colors duration-300">
      {/* Brand Header */}
      <Link to="/" className="p-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-[var(--color-text)] uppercase">VAULTX</h1>
          <p className="text-[8px] text-[var(--color-text-muted)] font-bold tracking-[0.2em] uppercase">Digital Fortitude</p>
        </div>
      </Link>

      {/* Nav Section */}
      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 group ${
              location.pathname === item.path
                ? 'bg-[#6366f1] text-white shadow-xl shadow-indigo-500/20 translate-x-2'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-soft)]'
            }`}
          >
            <span className={`${location.pathname === item.path ? 'text-white' : 'text-[var(--color-text-muted)] group-hover:text-[#6366f1]'} transition-colors`}>
              {item.icon}
            </span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom Action Section */}
      <div className="p-8 space-y-6">
        <button
          onClick={onAddItem}
          className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border)] hover:bg-[#6366f1]/5 text-[var(--color-text)] py-4 px-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add New Item
        </button>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-red-500 transition-colors w-full group"
        >
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          System Logout
        </button>
      </div>
    </aside>
  )
}

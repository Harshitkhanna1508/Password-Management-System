import Sidebar from './Sidebar'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import PasswordModal from '../Vault/PasswordModal'
import * as vaultService from '../../services/vaultService'

export default function Layout({ children }) {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const userInitial = user?.email?.[0]?.toUpperCase() || 'U'

  const handleSaveEntry = async (entryData) => {
    try {
      await vaultService.create(entryData)
      setIsModalOpen(false)
      window.dispatchEvent(new CustomEvent('vault-updated'))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save entry')
    }
  }

  return (
    <div className="min-h-screen flex font-['Inter'] bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[#6366f1] selection:text-white transition-colors duration-300">
      {/* Dynamic Background Effects */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[600px] bg-[#6366f1]/5 dark:bg-indigo-900/10 blur-[150px] rounded-full opacity-50 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[500px] bg-purple-500/5 dark:bg-purple-900/5 blur-[150px] rounded-full opacity-50 pointer-events-none" />

      {/* Sidebar Component */}
      <Sidebar 
        onAddItem={() => setIsModalOpen(true)} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[280px] relative z-10 flex flex-col min-h-screen overflow-x-hidden w-full">
        
        {/* Top Navigation Bar */}
        <header className="h-20 md:h-24 flex items-center justify-between px-6 md:px-10 relative">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-[var(--color-text-muted)] hover:text-[#6366f1] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>

            {/* Search Bar - Hidden on small mobile, visible on sm+ */}
            <div className="relative group max-w-md w-full hidden sm:block">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[#6366f1] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search vault..." 
                className="w-full pl-12 pr-6 py-2.5 md:py-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/10 text-sm placeholder:text-[var(--color-text-muted)] transition-all shadow-sm dark:shadow-xl text-[var(--color-text)]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* Sync Status - Hidden on mobile */}
            <button className="hidden md:block text-[var(--color-text-muted)] hover:text-[#6366f1] transition-colors group">
              <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* Notifications */}
            <button className="relative p-1 text-[var(--color-text-muted)] hover:text-[#6366f1] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-[var(--color-bg)]"></span>
            </button>
            
            {/* Profile Avatar */}
            <div className="flex items-center gap-3 md:gap-4 group cursor-pointer sm:pl-4 sm:border-l border-[var(--color-border)]">
              <div className="text-right hidden lg:block">
                <p className="text-[10px] font-black text-[var(--color-text)] uppercase tracking-widest">{user?.email?.split('@')[0] || 'Member'}</p>
                <p className="text-[8px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.2em]">Personal</p>
              </div>
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#6366f1] to-purple-500 border border-white/10 shadow-lg flex items-center justify-center text-white font-black text-sm md:text-lg transform group-hover:scale-105 transition-all">
                {userInitial}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </main>

        {/* Bottom Decorative Bar */}
        <footer className="px-6 md:px-10 py-6 border-t border-[var(--color-border)] flex items-center justify-between opacity-50">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)]">VAULTX SECURE SESSION</p>
          <div className="flex gap-2 md:gap-4">
             <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-green-500"></div>
             <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-green-500"></div>
             <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-green-500"></div>
          </div>
        </footer>
      </div>

      <PasswordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveEntry} 
      />
    </div>
  )
}

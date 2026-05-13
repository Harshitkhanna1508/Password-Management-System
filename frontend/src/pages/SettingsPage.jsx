import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('Profile')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const defaultName = user?.email?.split('@')[0]?.toUpperCase() || 'MEMBER'
  const [avatarSeed, setAvatarSeed] = useState(defaultName)
  const [fullName, setFullName] = useState(defaultName)

  // Update defaults when user data arrives
  useEffect(() => {
    if (user?.email) {
      const name = user.email.split('@')[0].toUpperCase()
      setFullName(name)
      setAvatarSeed(name)
    }
  }, [user])

  const avatars = ['Harshit', 'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn']

  const tabs = [
    { name: 'Profile', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    )},
    { name: 'Security', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    )},
    { name: 'Preferences', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
    )},
    { name: 'Sessions', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    )},
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.name 
                  ? 'bg-[#6366f1] text-white shadow-lg shadow-indigo-500/20 scale-[1.02]' 
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-text)]'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] uppercase tracking-[0.2em]">{tab.name}</span>
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-12">
          {/* Profile Details Section */}
          <section className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl relative overflow-hidden group">
            <h2 className="text-2xl font-bold mb-10 tracking-tight text-[var(--color-text)]">Profile Details</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-10 mb-12">
              <div className="relative group/avatar">
                <div className="w-24 h-24 rounded-3xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden shadow-sm dark:shadow-2xl transition-transform group-hover/avatar:scale-105">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover p-2"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">{fullName}</h3>
                <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Personal Account • VaultX Pro</p>
                <div className="flex flex-wrap gap-2">
                  {avatars.map(seed => (
                    <button
                      key={seed}
                      onClick={() => setAvatarSeed(seed)}
                      className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all ${avatarSeed === seed ? 'border-[#6366f1] scale-110 shadow-lg shadow-indigo-500/20' : 'border-[var(--color-border)] opacity-40 hover:opacity-100'}`}
                    >
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt="Avatar option" className="w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/5 transition-all text-[var(--color-text)]"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={user?.email || ''}
                  readOnly
                  className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/5 transition-all text-[var(--color-text)]"
                />
              </div>
            </div>

            <button className="bg-[#6366f1] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all">
              Save Changes
            </button>
          </section>

          {/* Security Settings Section */}
          <section className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl relative">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Security Settings</h2>
              <span className="bg-green-500/10 text-green-500 text-[8px] font-black px-3 py-1.5 rounded-full border border-green-500/20 flex items-center gap-2 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Two-Factor Active
              </span>
            </div>

            <div className="space-y-12">
              <div className="p-8 bg-[var(--color-bg)] rounded-[32px] border border-[var(--color-border)]">
                <h3 className="text-lg font-bold mb-6 text-[var(--color-text)]">Change Master Password</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Current Password', state: showCurrent, setter: setShowCurrent },
                    { label: 'New Password', state: showNew, setter: setShowNew },
                    { label: 'Confirm New Password', state: showConfirm, setter: setShowConfirm }
                  ].map((field, i) => (
                    <div key={i} className="space-y-3">
                      <label className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest ml-1">{field.label}</label>
                      <div className="relative">
                        <input 
                          type={field.state ? 'text' : 'password'}
                          className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#6366f1]/50 transition-all text-[var(--color-text)]"
                          placeholder="••••••••••••••••"
                        />
                        <button 
                          onClick={() => field.setter(!field.state)}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        >
                          {field.state ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-1 h-1.5 mt-4">
                    <div className="flex-1 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-[var(--color-surface)] rounded-full"></div>
                    <span className="ml-4 text-[10px] font-black text-green-500 uppercase tracking-widest -mt-1">Strong</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vault Preferences Section */}
          <section className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl">
            <h2 className="text-2xl font-bold mb-10 tracking-tight text-[var(--color-text)]">Vault Preferences</h2>
            
            <div className="flex items-center justify-between p-8 bg-[var(--color-bg)] rounded-[32px] border border-[var(--color-border)] mb-8">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">Interface Theme</h3>
                <p className="text-xs text-[var(--color-text-muted)]">Switch between light and dark modes.</p>
              </div>
              <div className="flex bg-[var(--color-surface-soft)] p-1.5 rounded-2xl border border-[var(--color-border)]">
                <button 
                  onClick={() => setTheme('light')}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    theme === 'light' ? 'bg-white text-black shadow-lg' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  Light
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    theme === 'dark' ? 'bg-[#6366f1] text-white shadow-lg' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button className="p-10 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[32px] hover:bg-[var(--color-surface-soft)] transition-all group text-center">
                <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center text-[#6366f1] mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2 text-[var(--color-text)]">Export Vault</h4>
                <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-widest">Secure JSON backup</p>
              </button>
              <button className="p-10 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[32px] hover:bg-[var(--color-surface-soft)] transition-all group text-center">
                <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center text-[#6366f1] mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2 text-[var(--color-text)]">Import Vault</h4>
                <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-widest">Restore from backup</p>
              </button>
            </div>
          </section>

          {/* Active Sessions Section */}
          <section className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-10 tracking-tight text-[var(--color-text)]">Active Sessions</h2>
            
            <div className="space-y-4">
              {[
                { device: 'Chrome on macOS', status: 'THIS DEVICE', location: 'San Francisco, USA', ip: '192.168.1.45', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', action: 'Refresh' },
                { device: 'iPhone 15 Pro', status: 'Active 2 hours ago', location: 'London, UK', ip: 'Hidden for security', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', action: 'Revoke' },
                { device: 'iPad Pro (Alex\'s iPad)', status: 'Active 1 day ago', location: 'San Francisco, USA', ip: 'Hidden for security', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z', action: 'Revoke' }
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-[var(--color-bg)] rounded-[32px] border border-[var(--color-border)] group hover:bg-[var(--color-surface-soft)] transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-[var(--color-surface-soft)] rounded-2xl flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[#6366f1] transition-colors">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={session.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-[var(--color-text)]">{session.device}</h4>
                        {session.status.includes('THIS DEVICE') && (
                          <span className="bg-[#6366f1]/20 text-[#6366f1] text-[8px] font-black px-2 py-0.5 rounded-md tracking-tighter uppercase">THIS DEVICE</span>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-widest">{session.location} • IP: {session.ip}</p>
                    </div>
                  </div>
                  <button className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    session.action === 'Revoke' 
                      ? 'border-red-500/20 text-red-500/60 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/40' 
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-soft)]'
                  }`}>
                    {session.action}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

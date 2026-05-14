import { useState, useEffect } from 'react'
import * as vaultService from '../services/vaultService'
import VaultList from '../components/Vault/VaultList'
import PasswordModal from '../components/Vault/PasswordModal'

export default function DashboardPage() {
  const [entries, setEntries] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchEntries()
    
    // Listen for global updates (e.g. from Sidebar Add Item)
    const handleGlobalUpdate = () => fetchEntries()
    window.addEventListener('vault-updated', handleGlobalUpdate)
    return () => window.removeEventListener('vault-updated', handleGlobalUpdate)
  }, [])

  const fetchEntries = async () => {
    setIsLoading(true)
    try {
      const data = await vaultService.getAll()
      setEntries(data)
    } catch (err) {
      setError('Failed to fetch vault entries')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenModal = (entry = null) => {
    setEditingEntry(entry)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setEditingEntry(null)
    setIsModalOpen(false)
  }

  const handleSaveEntry = async (entryData) => {
    try {
      if (editingEntry) {
        await vaultService.update(editingEntry._id, entryData)
      } else {
        await vaultService.create(entryData)
      }
      handleCloseModal()
      fetchEntries()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save entry')
    }
  }

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return
    try {
      await vaultService.remove(id)
      fetchEntries()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete entry')
    }
  }

  // Compute stats
  const retailCount = entries.filter(e => {
    const cat = e.category?.toLowerCase() || ''
    return cat.includes('retail') || cat.includes('shop')
  }).length

  const socialCount = entries.filter(e => {
    const cat = e.category?.toLowerCase() || ''
    return cat.includes('social')
  }).length

  const entertainmentCount = entries.filter(e => {
    const cat = e.category?.toLowerCase() || ''
    return cat.includes('entertainment')
  }).length

  const getStrengthScore = (pass) => {
    if (!pass) return 0
    if (pass.length < 8) return 25
    if (!/[^A-Za-z0-9]/.test(pass)) return 50
    return 100
  }

  const weakCount = entries.filter(e => getStrengthScore(e.password) <= 25).length

  const averageScore = entries.length > 0
    ? Math.round(entries.reduce((acc, e) => acc + getStrengthScore(e.password), 0) / entries.length)
    : 0

  const dashOffset = 251 * (1 - averageScore / 100)
  
  const filteredEntries = entries.filter(entry => {
    const name = (entry.title || entry.siteName || '').toLowerCase()
    const user = (entry.username || '').toLowerCase()
    const cat = (entry.category || '').toLowerCase()
    const search = searchTerm.toLowerCase()
    return name.includes(search) || user.includes(search) || cat.includes(search)
  })

  return (
    <div className="space-y-8 md:space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)]">Vault Dashboard</h1>
          <p className="text-[10px] md:text-sm text-[var(--color-text-muted)] font-bold uppercase tracking-widest">Welcome back. Your digital life is protected.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="w-full md:w-auto bg-[#6366f1] text-white px-8 py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add New Password
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Retail Vault', count: retailCount, color: 'bg-green-500', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
          { label: 'Social Keys', count: socialCount, color: 'bg-blue-500', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
          { label: 'Media Access', count: entertainmentCount, color: 'bg-purple-500', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
          { label: 'Weak Points', count: weakCount, color: 'bg-orange-500', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm dark:shadow-2xl relative overflow-hidden group hover:bg-[var(--color-surface)]/60 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`}></div>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg ${stat.color} bg-opacity-20`}>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-black text-[var(--color-text)]">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Vault List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm dark:shadow-2xl overflow-hidden min-h-[500px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-lg md:text-xl font-bold tracking-tight uppercase tracking-[0.1em]">Encrypted Items</h3>
              <div className="relative group w-full sm:w-auto">
                <input 
                  type="text" 
                  placeholder="Filter vault..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-[#6366f1]/50 text-[var(--color-text)]"
                />
              </div>
            </div>


            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <svg className="animate-spin w-10 h-10 text-[#6366f1]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center py-32 space-y-4">
                <div className="w-20 h-20 bg-[var(--color-surface-soft)] rounded-full flex items-center justify-center mx-auto text-[var(--color-text-muted)]">
                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                   </svg>
                </div>
                <p className="text-[var(--color-text-muted)] font-bold uppercase tracking-widest text-xs">Your vault is empty</p>
                <button onClick={() => handleOpenModal()} className="text-[#6366f1] font-black uppercase tracking-widest text-[10px] hover:underline">Add your first password</button>
              </div>
            ) : (
              <VaultList 
                entries={filteredEntries} 
                onEdit={handleOpenModal} 
                onDelete={handleDeleteEntry} 
              />
            )}
          </div>
        </div>

        {/* Side Panels */}
        <div className="lg:col-span-4 space-y-8">
          {/* Security Score */}
          <div className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#6366f1]/10 blur-[100px] rounded-full group-hover:bg-[#6366f1]/20 transition-all duration-700"></div>
            <h3 className="text-xl font-bold tracking-tight mb-8 relative z-10">Security Health</h3>
            
            <div className="flex justify-center mb-8 relative z-10">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="none" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="42" 
                    stroke={averageScore > 70 ? '#6366f1' : averageScore > 40 ? '#f59e0b' : '#ef4444'} 
                    strokeWidth="10" 
                    fill="none" 
                    strokeDasharray="264" 
                    strokeDashoffset={264 * (1 - averageScore / 100)} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(99,102,241,0.5)]" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-[var(--color-text)]">{averageScore}</span>
                  <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest mt-1">Aggregate</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg)] rounded-2xl p-6 relative z-10 border border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {averageScore > 80 ? 'Excellent! Your vault meets military-grade standards.' : 
                 averageScore > 50 ? 'Fair. Consider strengthening your orange-coded passwords.' : 
                 'Warning. Your security posture is currently vulnerable.'}
              </p>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl">
            <h3 className="text-xl font-bold tracking-tight mb-8">Access Logs</h3>
            <div className="space-y-6">
              {[
                { site: 'Google', time: '2m ago', color: 'bg-blue-500' },
                { site: 'Netflix', time: '14m ago', color: 'bg-red-500' },
                { site: 'Amazon', time: '1h ago', color: 'bg-orange-500' }
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${log.color} rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-white/5`}>
                      {log.site[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-text)] group-hover:text-[#6366f1] transition-colors">{log.site}</p>
                      <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">Vault Accessed</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{log.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 text-[10px] font-black text-[var(--color-text-muted)] hover:text-[var(--color-text)] uppercase tracking-[0.2em] transition-colors">
              View Full History
            </button>
          </div>
        </div>
      </div>

      <PasswordModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveEntry} 
        initialData={editingEntry} 
      />
    </div>
  )
}

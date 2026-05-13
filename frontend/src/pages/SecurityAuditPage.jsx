import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import * as vaultService from '../services/vaultService'

export default function SecurityAuditPage() {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuditing, setIsAuditing] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    setIsLoading(true)
    try {
      const data = await vaultService.getAll()
      setEntries(data)
    } catch (err) {
      console.error('Failed to fetch entries', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAudit = () => {
    setIsAuditing(true)
    setTimeout(() => {
      fetchEntries()
      setIsAuditing(false)
    }, 1500)
  }

  // Analysis Logic
  const getStrengthScore = (pass) => {
    if (!pass) return 0
    let score = 0
    if (pass.length >= 8) score += 25
    if (pass.length >= 12) score += 25
    if (/[0-9]/.test(pass)) score += 25
    if (/[^A-Za-z0-9]/.test(pass)) score += 25
    return score
  }

  const stats = entries.reduce((acc, entry) => {
    const score = getStrengthScore(entry.password)
    if (score >= 75) acc.strong++
    else if (score >= 50) acc.fair++
    else acc.weak++
    return acc
  }, { strong: 0, fair: 0, weak: 0 })

  // Find reused passwords
  const passwordMap = {}
  entries.forEach(entry => {
    if (!entry.password) return
    if (!passwordMap[entry.password]) passwordMap[entry.password] = []
    passwordMap[entry.password].push(entry)
  })

  const reusedItems = Object.entries(passwordMap)
    .filter(([pass, items]) => items.length > 1)
    .map(([pass, items]) => ({
      name: items[0].title || items[0].siteName || 'Unknown',
      count: items.length,
      others: items.slice(1).map(i => i.title || i.siteName || 'Unknown')
    }))

  // Find critical issues (mocking breach check for common weak passwords or very short ones)
  const criticalIssues = entries.filter(e => e.password && e.password.length < 6).map(e => ({
    name: e.title || e.siteName || 'Unknown',
    issue: 'Extremely short password. Vulnerable to brute-force attacks.'
  }))

  const aggregateScore = entries.length > 0
    ? Math.round(entries.reduce((acc, e) => acc + getStrengthScore(e.password), 0) / entries.length)
    : 100

  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (aggregateScore / 100) * circumference

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-64">
        <svg className="animate-spin w-10 h-10 text-[#6366f1]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Hero Section: Gauge & Summary */}
      <section className="text-center space-y-8 py-10">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[var(--color-surface-soft)]" />
            <circle cx="96" cy="96" r={radius} stroke="#6366f1" strokeWidth="8" fill="transparent" strokeDasharray={circumference} style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1s ease-in-out' }} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-black tracking-tighter text-[var(--color-text)]">{aggregateScore}</span>
            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">/ 100</span>
          </div>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text)]">
            {aggregateScore > 80 ? 'Excellent' : aggregateScore > 50 ? 'Good' : 'Needs Work'}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {aggregateScore > 80 ? 'Your security posture is strong. You are following best practices for password management.' : 
             aggregateScore > 50 ? 'Your security is decent, but there are areas for improvement to reach maximum protection.' :
             'Immediate action is recommended to secure your vulnerable accounts.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button onClick={handleAudit} className="w-full sm:w-auto bg-[#6366f1] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
            {isAuditing ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            Audit All
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Critical Issues Section */}
        <section className={`backdrop-blur-xl border rounded-[40px] p-8 shadow-sm ${criticalIssues.length > 0 ? 'bg-red-500/5 border-red-500/10' : 'bg-[var(--color-surface)]/40 border-[var(--color-border)] opacity-50'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${criticalIssues.length > 0 ? 'bg-red-500/10 text-red-500' : 'bg-[var(--color-surface-soft)] text-[var(--color-text-muted)]'}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--color-text)]">Critical Issues</h3>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${criticalIssues.length > 0 ? 'text-red-500' : 'text-[var(--color-text-muted)]'}`}>
                {criticalIssues.length} {criticalIssues.length === 1 ? 'Immediate action required' : criticalIssues.length > 1 ? 'Actions required' : 'No issues found'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {criticalIssues.length > 0 ? criticalIssues.map((issue, i) => (
              <div key={i} className="bg-[var(--color-surface)]/40 border border-[var(--color-border)] rounded-3xl p-6 group cursor-pointer hover:bg-[var(--color-surface)] transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-red-900/20 rounded-2xl flex items-center justify-center text-red-500 font-black text-xl">{issue.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[var(--color-text)]">{issue.name}</h4>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{issue.issue}</p>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-center py-10 text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">Everything looks secure</p>
            )}
          </div>
        </section>

        {/* Entropy Analysis Section */}
        <section className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-[#6366f1]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">Entropy Analysis</h3>
          </div>

          <div className="space-y-8">
            {[
              { label: 'Strong', count: stats.strong, width: entries.length ? `${(stats.strong / entries.length) * 100}%` : '0%', color: 'bg-[#6366f1]' },
              { label: 'Fair', count: stats.fair, width: entries.length ? `${(stats.fair / entries.length) * 100}%` : '0%', color: 'bg-orange-500' },
              { label: 'Weak', count: stats.weak, width: entries.length ? `${(stats.weak / entries.length) * 100}%` : '0%', color: 'bg-red-500' }
            ].map((stat, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                  <span>{stat.label}</span>
                  <span className="text-[var(--color-text)]">{stat.count}</span>
                </div>
                <div className="h-2 bg-[var(--color-surface-soft)] rounded-full overflow-hidden">
                  <div className={`h-full ${stat.color} rounded-full transition-all duration-1000`} style={{ width: stat.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warnings Section */}
        <section className={`backdrop-blur-xl border rounded-[40px] p-8 shadow-sm md:col-span-2 ${reusedItems.length > 0 ? 'bg-orange-500/5 border-orange-500/10' : 'bg-[var(--color-surface)]/40 border-[var(--color-border)] opacity-50'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${reusedItems.length > 0 ? 'bg-orange-500/10 text-orange-500' : 'bg-[var(--color-surface-soft)] text-[var(--color-text-muted)]'}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--color-text)]">Warnings</h3>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${reusedItems.length > 0 ? 'text-orange-500' : 'text-[var(--color-text-muted)]'}`}>
                {reusedItems.length > 0 ? 'Passwords reused across multiple accounts' : 'No password reuse detected'}
              </p>
            </div>
          </div>

          {reusedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reusedItems.map((item, i) => (
                <div key={i} className="bg-[var(--color-surface)]/40 border border-[var(--color-border)] rounded-3xl p-6 flex items-center justify-between group hover:bg-[var(--color-surface)] transition-all">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-500/10 text-orange-500`}>
                      <span className="font-black text-lg">{item.name[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[var(--color-text)] truncate">{item.name}</h4>
                      <p className="text-[8px] font-bold text-[var(--color-text-muted)] uppercase">Also used in {item.others.join(', ')}</p>
                    </div>
                  </div>
                  <span className="bg-[var(--color-surface-soft)] text-orange-500 text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-tighter shrink-0">Reused {item.count}x</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-10 text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">Great job! All passwords are unique.</p>
          )}
        </section>
      </div>
    </div>
  )
}

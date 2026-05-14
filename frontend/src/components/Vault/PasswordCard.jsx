import { useState } from 'react'
import { useClipboard } from '../../hooks/useClipboard'

export default function PasswordCard({ entry, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false)
  const { copied, copy } = useClipboard()

  const categoryStr = entry.category?.toLowerCase() || ''
  let badgeColor = 'bg-[var(--color-surface-soft)] text-[var(--color-text-muted)] border-[var(--color-border)]'
  if (categoryStr.includes('retail') || categoryStr.includes('shop')) badgeColor = 'bg-green-500/10 text-green-500 border-green-500/20'
  else if (categoryStr.includes('social')) badgeColor = 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  else if (categoryStr.includes('entertainment')) badgeColor = 'bg-purple-500/10 text-purple-500 border-purple-500/20'
  else if (categoryStr.includes('finance') || categoryStr.includes('bank')) badgeColor = 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'

  const getStrength = (pass) => {
    if (!pass) return { label: 'NONE', segments: 0, color: 'bg-white/10' }
    if (pass.length < 8) return { label: 'WEAK', segments: 1, color: 'bg-red-500' }
    if (!/[^A-Za-z0-9]/.test(pass)) return { label: 'MEDIUM', segments: 2, color: 'bg-yellow-500' }
    return { label: 'GREAT', segments: 4, color: 'bg-[#6366f1]' }
  }
  const strength = getStrength(entry.password)
  const logoChar = entry.title ? entry.title.charAt(0).toUpperCase() : '?'
  
  // Extract hostname for favicon
  let domain = ''
  try {
    if (entry.url) {
      const urlObj = new URL(entry.url.startsWith('http') ? entry.url : `https://${entry.url}`)
      domain = urlObj.hostname
    }
  } catch (e) {
    // Ignore invalid URLs
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 hover:bg-[var(--color-surface-soft)] transition-all border-b border-[var(--color-border)] group relative last:border-b-0 gap-4 md:gap-6">
      
      {/* Left section: Identity */}
      <div className="flex items-center gap-4 md:gap-6 min-w-0 sm:w-1/3">
        <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] font-black text-xl shrink-0 shadow-sm dark:shadow-lg group-hover:scale-105 transition-all overflow-hidden">
          {domain ? (
            <img 
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} 
              alt={entry.title}
              className="w-8 h-8 object-contain"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
          ) : null}
          <span style={{ display: domain ? 'none' : 'block' }}>{logoChar}</span>
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-sm font-bold text-[var(--color-text)] truncate">{entry.title}</h3>
            {entry.category && (
              <span className={`text-[8px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter border shrink-0 ${badgeColor}`}>
                {entry.category}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1 truncate">
            <span className="truncate">{entry.username}</span>
            <span className="opacity-30 shrink-0">•</span>
            <span className="text-[var(--color-text-muted)] shrink-0">Accessed recently</span>
          </div>
        </div>
      </div>

      {/* Middle section: Hidden Data Controls */}
      <div className="flex items-center sm:justify-center min-w-0 sm:w-1/3">
        <div className="flex items-center bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl shadow-inner px-4 py-2 w-full max-w-[200px]">
          <span className="text-xs font-mono text-[var(--color-text-muted)] truncate w-full text-center tracking-widest">
            {showPassword ? entry.password : '••••••••••••••••'}
          </span>
        </div>
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center justify-end gap-1 md:gap-3 sm:w-1/3 shrink-0">
        <button onClick={() => setShowPassword(!showPassword)} className="p-2 sm:p-3 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-soft)] rounded-xl transition-all" title="View Password">
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          )}
        </button>
        <button onClick={() => copy(entry.password)} className="p-2 sm:p-3 text-[var(--color-text-muted)] hover:text-[#6366f1] hover:bg-[#6366f1]/10 rounded-xl transition-all relative" title="Copy Password">
          {copied ? (
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          )}
        </button>
        <button onClick={() => onEdit(entry)} className="p-2 sm:p-3 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-soft)] rounded-xl transition-all" title="Edit Entry">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        </button>
        <button onClick={() => onDelete(entry._id)} className="p-2 sm:p-3 text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all" title="Delete Entry">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  )
}

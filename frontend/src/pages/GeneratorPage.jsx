import { useState, useEffect } from 'react'
import { generatePassword } from '../utils/passwordGenerator'
import { useClipboard } from '../hooks/useClipboard'
import { useAuth } from '../context/AuthContext'

export default function GeneratorPage() {
  const { user } = useAuth()
  const userId = user?.id || 'guest'
  const { copied, copy } = useClipboard()

  const [website, setWebsite] = useState('')
  const [memorableWord, setMemorableWord] = useState('')
  const [memorableNumber, setMemorableNumber] = useState('')
  const [specialChar, setSpecialChar] = useState('!')
  const [secondaryWord, setSecondaryWord] = useState('')
  const [variationIndex, setVariationIndex] = useState(0)
  const [history, setHistory] = useState([])

  const currentPassword = generatePassword(
    website || 'VaultX',
    memorableWord,
    memorableNumber,
    specialChar,
    secondaryWord,
    variationIndex
  )

  useEffect(() => {
    // Load defaults from localStorage
    if (userId) {
      setMemorableWord(localStorage.getItem(`vaultx_${userId}_memorable_word`) || '')
      setMemorableNumber(localStorage.getItem(`vaultx_${userId}_memorable_number`) || '')
      setSpecialChar(localStorage.getItem(`vaultx_${userId}_special_char`) || '!')
      setSecondaryWord(localStorage.getItem(`vaultx_${userId}_secondary_word`) || '')
    }
  }, [userId])

  const handleCopy = () => {
    copy(currentPassword)
    if (!history.find(p => p.password === currentPassword)) {
      setHistory(prev => [{ password: currentPassword, timestamp: new Date(), website: website || 'VaultX' }, ...prev].slice(0, 10))
    }
  }

  const inputBaseClass = "w-full pl-5 pr-5 py-3.5 rounded-2xl text-sm transition-all duration-300 bg-[var(--color-bg)] border border-[var(--color-border)] focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/5 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-[var(--color-text-muted)] ml-1"

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-[var(--color-text)]">Password Generator</h1>
          <p className="text-[var(--color-text-muted)] font-medium">Create memorable, military-grade passwords in milliseconds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Generator Interface */}
        <div className="lg:col-span-8 space-y-8">
          {/* Display Card */}
          <div className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl relative overflow-hidden group min-h-[300px] flex flex-col justify-center items-center text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/10 blur-[100px] rounded-full group-hover:bg-[#6366f1]/20 transition-all duration-700"></div>
            
            <p className="text-[10px] font-black text-[#6366f1] uppercase tracking-[0.3em] mb-6 relative z-10">Live Secure Output</p>
            
            <div className="relative z-10 w-full max-w-2xl px-6 py-8 bg-[var(--color-bg)]/50 border border-[var(--color-border)] rounded-[32px] shadow-inner mb-8 group-hover:scale-[1.02] transition-transform duration-500">
              <span className="text-3xl md:text-5xl font-mono font-bold tracking-tighter text-[var(--color-text)] break-all px-4">
                {currentPassword}
              </span>
            </div>

            <div className="flex gap-4 relative z-10">
              <button 
                onClick={handleCopy}
                className="bg-[#6366f1] text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
              <button 
                onClick={() => setVariationIndex(prev => prev + 1)}
                className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border border-[var(--color-border)] px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[var(--color-surface)] transition-all"
              >
                Shuffle Style
              </button>
            </div>
          </div>

          {/* Parameters Grid */}
          <div className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-10 shadow-sm dark:shadow-2xl">
            <h3 className="text-xl font-bold tracking-tight mb-8">Generation Parameters</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className={labelClass}>Target Website</label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="e.g. Netflix, Amazon"
                  className={inputBaseClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Master Seed Word</label>
                <input
                  value={memorableWord}
                  onChange={(e) => { 
                    setMemorableWord(e.target.value); 
                    localStorage.setItem(`vaultx_${userId}_memorable_word`, e.target.value); 
                  }}
                  placeholder="A secret word only you know"
                  className={inputBaseClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Seed Number</label>
                <input
                  value={memorableNumber}
                  onChange={(e) => { 
                    setMemorableNumber(e.target.value); 
                    localStorage.setItem(`vaultx_${userId}_memorable_number`, e.target.value); 
                  }}
                  placeholder="e.g. 1995"
                  className={inputBaseClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Special Symbol</label>
                <input
                  value={specialChar}
                  onChange={(e) => { 
                    setSpecialChar(e.target.value); 
                    localStorage.setItem(`vaultx_${userId}_special_char`, e.target.value); 
                  }}
                  placeholder="e.g. @, #, $"
                  className={inputBaseClass}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className={labelClass}>Secondary Seed (Optional)</label>
                <input
                  value={secondaryWord}
                  onChange={(e) => { 
                    setSecondaryWord(e.target.value); 
                    localStorage.setItem(`vaultx_${userId}_secondary_word`, e.target.value); 
                  }}
                  placeholder="Additional complexity layer"
                  className={inputBaseClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Variations & History */}
        <div className="lg:col-span-4 space-y-8">
          {/* Style Variations */}
          <div className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-8 shadow-sm dark:shadow-2xl">
            <h3 className="text-lg font-bold tracking-tight mb-6">Algorithm Variations</h3>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVariationIndex(i)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    variationIndex % 10 === i 
                      ? 'bg-[#6366f1] text-white shadow-lg shadow-indigo-500/20 scale-110' 
                      : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[#6366f1]/50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="mt-6 text-[10px] text-[var(--color-text-muted)] font-medium leading-relaxed">
              Switching variations changes the internal assembly pattern without altering your master seeds.
            </p>
          </div>

          {/* History */}
          <div className="bg-[var(--color-surface)]/40 backdrop-blur-xl border border-[var(--color-border)] rounded-[40px] p-8 shadow-sm dark:shadow-2xl flex-1">
            <h3 className="text-lg font-bold tracking-tight mb-6">Recent Generations</h3>
            {history.length === 0 ? (
              <div className="py-12 text-center space-y-3 opacity-30">
                <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[10px] font-black uppercase tracking-widest">No history yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item, i) => (
                  <div key={i} className="p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl group flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-[#6366f1] uppercase tracking-widest mb-1">{item.website}</p>
                      <p className="text-xs font-mono text-[var(--color-text)] truncate">{item.password}</p>
                    </div>
                    <button 
                      onClick={() => copy(item.password)}
                      className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { generatePassword } from '../../utils/passwordGenerator'
import { useClipboard } from '../../hooks/useClipboard'
import { useAuth } from '../../hooks/useAuth'

export default function PasswordModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    username: '',
    password: '',
    category: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  
  const { user } = useAuth()
  const userId = user?.id || 'guest'

  const [memorableWord, setMemorableWord] = useState('')
  const [memorableNumber, setMemorableNumber] = useState('')
  const [specialChar, setSpecialChar] = useState('!')
  const [secondaryWord, setSecondaryWord] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [variationIndex, setVariationIndex] = useState(0)
  
  const { copied, copy } = useClipboard()

  useEffect(() => {
    if (isOpen && userId) {
      setMemorableWord(localStorage.getItem(`vaultx_${userId}_memorable_word`) || '')
      setMemorableNumber(localStorage.getItem(`vaultx_${userId}_memorable_number`) || '')
      setSpecialChar(localStorage.getItem(`vaultx_${userId}_special_char`) || '!')
      setSecondaryWord(localStorage.getItem(`vaultx_${userId}_secondary_word`) || '')
    }
  }, [isOpen, userId])

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || initialData.siteName || '',
          url: initialData.url || '',
          username: initialData.username || '',
          password: initialData.password || '',
          category: initialData.category || '',
          notes: initialData.notes || '',
        })
      } else {
        setFormData({
          title: '',
          url: '',
          username: '',
          password: '',
          category: '',
          notes: '',
        })
      }
      setErrors({})
      setShowPassword(false)
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSave(formData)
  }

  const handleGenerate = () => {
    const website = formData.title || formData.url || 'Vault'
    const newPassword = generatePassword(website, memorableWord, memorableNumber, specialChar, secondaryWord, variationIndex)
    setFormData((prev) => ({ ...prev, password: newPassword }))
    setVariationIndex((prev) => prev + 1)
    setShowPassword(true)
  }

  const inputBaseClass = "w-full pl-5 pr-5 py-3.5 rounded-2xl text-sm transition-all duration-300 bg-[var(--color-bg)] border border-[var(--color-border)] focus:outline-none focus:border-[#6366f1]/50 focus:ring-4 focus:ring-[#6366f1]/5 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-[var(--color-text-muted)] ml-1"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl rounded-[40px] p-10 overflow-y-auto max-h-[90vh] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl dark:shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text)] tracking-tight">
              {initialData ? 'Edit Asset' : 'Secure New Asset'}
            </h2>
            <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">Impenetrable Vault Storage</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-soft)] rounded-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className={labelClass}>Site Name</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Amazon"
                className={`${inputBaseClass} ${errors.title ? 'border-red-500/50' : ''}`}
              />
              {errors.title && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Retail"
                className={inputBaseClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Website URL</label>
            <input
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://www.amazon.com"
              className={inputBaseClass}
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Username / Identifier</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="alex@vaultx.io"
              className={`${inputBaseClass} ${errors.username ? 'border-red-500/50' : ''}`}
            />
            {errors.username && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end mb-2">
              <label className={labelClass} style={{ marginBottom: 0 }}>Access Key</label>
              <button
                type="button"
                onClick={handleGenerate}
                className="text-[10px] font-black text-[#6366f1] hover:underline uppercase tracking-widest"
              >
                {formData.password ? 'Regenerate' : 'Generate Secure'}
              </button>
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`${inputBaseClass} ${errors.password ? 'border-red-500/50' : ''}`}
                style={{ paddingRight: '5rem' }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => copy(formData.password)}
                    className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    title="Copy"
                  >
                    {copied ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            {errors.password && <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Internal Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Optional details, recovery codes, or hints..."
              className={`${inputBaseClass} resize-none`}
            />
          </div>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="text-[10px] font-black text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center gap-2 uppercase tracking-widest transition-all"
            >
              <svg className={`w-4 h-4 transform transition-transform duration-300 ${showSettings ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              Advanced Generator Parameters
            </button>
            
            {showSettings && (
              <div className="grid grid-cols-2 gap-6 mt-6 p-8 rounded-3xl bg-[var(--color-surface-soft)] border border-[var(--color-border)] animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className={labelClass}>Seed Word</label>
                  <input
                    value={memorableWord}
                    onChange={(e) => { 
                      setMemorableWord(e.target.value); 
                      localStorage.setItem(`vaultx_${userId}_memorable_word`, e.target.value); 
                    }}
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
                    className={inputBaseClass}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Secondary Seed</label>
                  <input
                    value={secondaryWord}
                    onChange={(e) => { 
                      setSecondaryWord(e.target.value); 
                      localStorage.setItem(`vaultx_${userId}_secondary_word`, e.target.value); 
                    }}
                    className={inputBaseClass}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-6 mt-12 pt-8 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              {initialData ? 'Update Asset' : 'Secure to Vault'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

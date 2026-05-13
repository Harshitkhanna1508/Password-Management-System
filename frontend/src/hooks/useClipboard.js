// hooks/useClipboard.js — Copy to clipboard with a timed "Copied!" feedback state
import { useState, useCallback } from 'react'

/**
 * useClipboard — copy text to clipboard and get visual feedback
 *
 * Usage:
 *   const { copied, copy } = useClipboard()
 *   <button onClick={() => copy(password)}>{copied ? 'Copied!' : 'Copy'}</button>
 *
 * @param {number} resetDelay - ms before `copied` resets to false (default 2000)
 */
export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity  = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    }
  }, [resetDelay])

  return { copied, copy }
}

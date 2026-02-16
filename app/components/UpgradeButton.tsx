'use client'

import { useState } from 'react'

export function UpgradeButton({ className = '' }: { className?: string }) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Checkout-Session konnte nicht erstellt werden')
      }
    } catch (error) {
      console.error('Upgrade error:', error)
      alert('Etwas ist schief gelaufen. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors ${className}`}
    >
      {loading ? 'Lade...' : 'Auf Premium upgraden'}
    </button>
  )
}

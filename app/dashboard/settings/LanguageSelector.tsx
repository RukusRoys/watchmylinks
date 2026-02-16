'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LanguageSelectorProps {
  currentLanguage: string
}

export function LanguageSelector({ currentLanguage }: LanguageSelectorProps) {
  const [language, setLanguage] = useState(currentLanguage)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = async (newLanguage: string) => {
    if (newLanguage === language) return

    setLoading(true)

    try {
      const response = await fetch('/api/user/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: newLanguage }),
      })

      if (!response.ok) {
        throw new Error('Failed to update language')
      }

      setLanguage(newLanguage)
      
      // Refresh the page to update all translations
      router.refresh()
    } catch (error) {
      console.error('Failed to update language:', error)
      alert('Failed to update language. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleChange('en')}
        disabled={loading}
        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
          language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading && language !== 'en' ? (
          <span className="inline-block animate-spin">⏳</span>
        ) : (
          '🇬🇧 English'
        )}
      </button>

      <button
        onClick={() => handleChange('de')}
        disabled={loading}
        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
          language === 'de'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading && language !== 'de' ? (
          <span className="inline-block animate-spin">⏳</span>
        ) : (
          '🇩🇪 Deutsch'
        )}
      </button>
    </div>
  )
}

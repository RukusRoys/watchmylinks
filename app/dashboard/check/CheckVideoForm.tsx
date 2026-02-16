'use client'

import { useState } from 'react'

interface CheckResult {
  success: boolean
  video: {
    id: string
    title: string
    url: string
  }
  links: Array<{
    url: string
    provider: string
    status: 'WORKING' | 'BROKEN'
    statusCode: number
  }>
  message?: string
}

export function CheckVideoForm() {
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/check-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check video')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-slate-300 mb-2">
              YouTube Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-sm text-slate-400">
              Kopiere die URL eines YouTube-Videos, um alle Affiliate-Links aus der Beschreibung zu extrahieren und zu prüfen
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Prüfe...' : 'Link prüfen'}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">❌</div>
            <div>
              <h3 className="font-bold text-red-200 mb-1">Fehler</h3>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Video Info */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-2">Video</h3>
            <div className="text-slate-300">{result.video.title}</div>
            <a 
              href={result.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              {result.video.url}
            </a>
          </div>

          {/* Links Results */}
          {result.links.length === 0 ? (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
              <div className="text-4xl mb-3">🤷</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Keine Affiliate-Links gefunden
              </h3>
              <p className="text-slate-400 text-sm">
                In der Video-Beschreibung wurden keine bekannten Affiliate-Links entdeckt
              </p>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">
                Gefundene Links ({result.links.length})
              </h3>
              <div className="space-y-3">
                {result.links.map((link, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      link.status === 'WORKING' 
                        ? 'bg-green-900/20 border-green-700' 
                        : 'bg-red-900/20 border-red-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            link.status === 'WORKING'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                          }`}>
                            {link.status === 'WORKING' ? '✓ Funktioniert' : '✗ Defekt'}
                          </span>
                          <span className="text-slate-400 text-sm">
                            {link.provider}
                          </span>
                          <span className="text-slate-500 text-sm">
                            (Status: {link.statusCode})
                          </span>
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm break-all"
                        >
                          {link.url}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-400">
                      {result.links.filter(l => l.status === 'WORKING').length}
                    </div>
                    <div className="text-sm text-slate-400">Funktionierend</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-400">
                      {result.links.filter(l => l.status === 'BROKEN').length}
                    </div>
                    <div className="text-sm text-slate-400">Defekt</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

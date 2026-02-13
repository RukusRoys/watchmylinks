'use client';

import { useState } from 'react';

interface CheckResult {
  working: number;
  broken: number;
  redirects: number;
  total: number;
  estimatedLostRevenue: number;
  brokenUrls?: string[];
  redirectUrls?: string[];
  message?: string;
}

export default function LinkChecker() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/check-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to check links');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-16" id="free-checker">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">
          Check Your Links Now — Free
        </h2>
        <p className="text-xl text-center text-gray-600 mb-8">
          See how many broken links you have in 30 seconds
        </p>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste your YouTube video URL"
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Scanning...' : 'Scan My Links (Free) →'}
            </button>
          </form>
          
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
            <span>✓ No signup required</span>
            <span>✓ Results in 30 seconds</span>
            <span>✓ 100% free</span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">
                Scanning your video for affiliate links...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Your Link Health Report
              </h3>
              
              {result.message ? (
                <p className="text-center text-gray-600">{result.message}</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-700">✅ Working links:</span>
                      <strong className="text-green-600 text-2xl">{result.working}</strong>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-700">❌ Broken links:</span>
                      <strong className="text-red-600 text-2xl">{result.broken}</strong>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-700">⚠️ Redirects:</span>
                      <strong className="text-amber-600 text-2xl">{result.redirects}</strong>
                    </div>
                  </div>

                  {result.broken > 0 && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-xl font-bold text-red-600 text-center">
                        💰 Estimated lost revenue: ${result.estimatedLostRevenue}/month
                      </p>
                      <p className="text-sm text-red-500 text-center mt-2">
                        Based on $60 average commission per broken link
                      </p>
                    </div>
                  )}

                  {/* Broken URLs Details */}
                  {result.brokenUrls && result.brokenUrls.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-red-600 mb-2">Broken Links:</h4>
                      <div className="bg-white rounded border border-red-200 p-3 max-h-40 overflow-y-auto">
                        {result.brokenUrls.slice(0, 5).map((url, idx) => (
                          <div key={idx} className="text-sm text-gray-600 truncate mb-1">
                            ❌ {url}
                          </div>
                        ))}
                        {result.brokenUrls.length > 5 && (
                          <p className="text-sm text-gray-500 italic mt-2">
                            +{result.brokenUrls.length - 5} more...
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <a
                    href="#pricing"
                    className="block w-full text-center bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                  >
                    Want alerts when links break? Get Early Access →
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

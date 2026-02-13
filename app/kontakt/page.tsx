'use client';

import { useState } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 py-20">
      <LanguageSwitcher />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800 rounded-lg p-8 border-2 border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-4">Kontakt</h1>
          <p className="text-gray-300 mb-8">
            Hast du eine Frage? Willst du Early Access? Schreib uns!
          </p>

          {status === 'success' ? (
            <div className="bg-green-900 border-2 border-green-600 rounded-lg p-6 text-center">
              <p className="text-white font-semibold mb-2">✅ Nachricht gesendet!</p>
              <p className="text-green-100">Wir melden uns bald bei dir.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-blue-400 hover:text-blue-300 font-semibold"
              >
                Weitere Nachricht senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                  required
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-900 border-2 border-red-600 rounded-lg p-4">
                  <p className="text-red-100 text-center">
                    ❌ Etwas ist schiefgelaufen. Bitte versuche es erneut.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed shadow-xl"
              >
                {status === 'sending' ? 'Sendet...' : 'Nachricht senden'}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-700">
            <a href="/de" className="text-blue-400 hover:text-blue-300 font-semibold">
              ← Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

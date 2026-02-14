'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isGerman = pathname?.startsWith('/de');

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-white hover:text-blue-300 transition-colors"
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900 md:hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <span className="text-xl font-bold text-white">WatchMyLinks</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white hover:text-blue-300"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-6">
              <div className="space-y-2 px-4">
                <a
                  href="/sign-up"
                  className="block w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-bold text-center hover:bg-blue-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </a>
                
                <a
                  href="/sign-in"
                  className="block w-full px-6 py-4 bg-slate-700 text-white rounded-lg font-bold text-center hover:bg-slate-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </a>

                <div className="pt-4 border-t border-slate-700 mt-4">
                  <div className="text-sm text-slate-400 mb-3 px-2">Language</div>
                  <div className="flex gap-2">
                    <Link
                      href="/"
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold text-center transition-colors ${
                        !isGerman
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      EN - English
                    </Link>
                    <Link
                      href="/de"
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold text-center transition-colors ${
                        isGerman
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      DE - Deutsch
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 mt-4">
                  <a
                    href="/demo"
                    className="block px-6 py-3 text-white hover:bg-slate-700 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    📊 Demo Dashboard
                  </a>
                  <a
                    href="/imprint"
                    className="block px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Imprint
                  </a>
                  <a
                    href="/privacy"
                    className="block px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Privacy
                  </a>
                  <a
                    href="/contact"
                    className="block px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

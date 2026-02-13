'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith('/de');

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2 bg-slate-800 rounded-lg p-2 border-2 border-slate-700 shadow-xl">
      <Link
        href="/"
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${
          !isGerman
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-slate-700'
        }`}
      >
        EN
      </Link>
      <Link
        href="/de"
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${
          isGerman
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-slate-700'
        }`}
      >
        DE
      </Link>
    </div>
  );
}

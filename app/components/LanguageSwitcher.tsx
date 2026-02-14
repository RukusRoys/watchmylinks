'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith('/de');

  return (
    <div className="flex gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
      <Link
        href="/"
        className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
          !isGerman
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:text-white hover:bg-slate-700'
        }`}
      >
        EN
      </Link>
      <Link
        href="/de"
        className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
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

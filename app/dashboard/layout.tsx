import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">WatchMyLinks</span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/channels" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Kanäle
              </Link>
              <Link 
                href="/dashboard/links" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Links
              </Link>
              <Link 
                href="/dashboard/settings" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Einstellungen
              </Link>
              
              {/* User Button */}
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

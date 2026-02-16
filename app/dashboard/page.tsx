import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

export default async function DashboardPage() {
  try {
    const user = await currentUser()
    
    if (!user) {
      redirect('/sign-in')
    }

    // Get or create user in database
    let dbUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
        },
      })
    }

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Willkommen zurück, {user.firstName || 'Creator'}! 👋
          </h1>
          <p className="text-slate-400">
            Dashboard lädt... (Minimal-Version zum Testen)
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Debug Info</h2>
          <div className="space-y-2 text-slate-300">
            <div>Email: {dbUser.email}</div>
            <div>User ID: {dbUser.id}</div>
            <div>Name: {dbUser.name || 'Nicht gesetzt'}</div>
            <div>Erstellt: {new Date(dbUser.createdAt).toLocaleDateString('de-DE')}</div>
          </div>
        </div>

        <div className="bg-blue-900 rounded-lg p-6 border border-blue-700">
          <h3 className="text-lg font-bold text-white mb-2">Nächste Schritte</h3>
          <p className="text-blue-200 mb-4">
            Die volle Dashboard-Funktion wird gleich wiederhergestellt. Erstmal prüfen wir ob Login funktioniert.
          </p>
          <a
            href="/dashboard/check"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Link prüfen
          </a>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Dashboard error:', error)
    return (
      <div className="bg-red-900 rounded-lg p-6 border border-red-700">
        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
        <p className="text-red-200">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    )
  }
}

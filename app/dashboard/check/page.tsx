import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { SubscriptionStatus } from '@prisma/client'
import { CheckVideoForm } from './CheckVideoForm'

export default async function CheckLinkPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
  })

  if (!dbUser) {
    redirect('/dashboard')
  }

  const isPremium = dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {isPremium ? 'Video-Link prüfen' : 'Kostenlose Link-Prüfung'}
        </h1>
        <p className="text-slate-400">
          {isPremium 
            ? 'Prüfe einzelne Video-Links oder scanne ganze Kanäle'
            : 'Gib eine YouTube-Video-URL ein, um Affiliate-Links in der Beschreibung zu prüfen'}
        </p>
      </div>

      {/* Free User Notice */}
      {!isPremium && (
        <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">⚡</div>
            <div>
              <h3 className="font-bold text-yellow-200 mb-1">Free Version</h3>
              <p className="text-yellow-300 text-sm">
                Du kannst einzelne Video-Links manuell checken. 
                Mit <strong>Premium</strong> erhältst du:
              </p>
              <ul className="text-yellow-300 text-sm mt-2 space-y-1">
                <li>✓ Automatische Kanal-Scans (alle Videos auf einmal)</li>
                <li>✓ Tägliche automatische Überwachung</li>
                <li>✓ E-Mail-Benachrichtigungen bei defekten Links</li>
                <li>✓ Multi-Plattform Support (YouTube, Instagram, TikTok)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Link Check Form */}
      <CheckVideoForm />

      {/* Premium CTA for Free Users */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
          <h3 className="text-xl font-bold text-white mb-2">
            Upgrade auf Premium 🚀
          </h3>
          <p className="text-blue-200 mb-4">
            Automatisiere deine Link-Überwachung mit Kanal-Scans und Benachrichtigungen
          </p>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-white">
              $10<span className="text-lg">/mo</span>
            </div>
            <a
              href="/dashboard/upgrade"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Jetzt upgraden
            </a>
          </div>
        </div>
      )}

      {/* Premium: Channel Scan Option */}
      {isPremium && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-2">
            Oder scanne einen ganzen Kanal
          </h3>
          <p className="text-slate-400 mb-4">
            Analysiere alle Videos eines Kanals automatisch und überwache alle Affiliate-Links
          </p>
          <a
            href="/dashboard/channels/add"
            className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Kanal hinzufügen
          </a>
        </div>
      )}
    </div>
  )
}

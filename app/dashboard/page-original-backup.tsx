import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { UpgradeButton } from '@/app/components/UpgradeButton'
import { SubscriptionStatus } from '@prisma/client'

export default async function DashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  // Get or create user in database
  let dbUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
    include: {
      channels: {
        include: {
          links: true,
        },
      },
      links: true,
    },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
      },
      include: {
        channels: {
          include: {
            links: true,
          },
        },
        links: true,
      },
    })
  }

  // Calculate stats
  const totalChannels = dbUser.channels.length
  const totalLinks = dbUser.links.length
  const workingLinks = dbUser.links.filter(l => l.status === 'WORKING').length
  const brokenLinks = dbUser.links.filter(l => l.status === 'BROKEN').length
  const totalRevenue = dbUser.links.reduce((sum, l) => sum + l.revenue, 0)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Willkommen zurück, {user.firstName || 'Creator'}! 👋
        </h1>
        <p className="text-slate-400">
          Hier ist deine Affiliate-Link Übersicht
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-slate-400 text-sm mb-2">Kanäle gesamt</div>
          <div className="text-3xl font-bold text-white">{totalChannels}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-slate-400 text-sm mb-2">Links gesamt</div>
          <div className="text-3xl font-bold text-white">{totalLinks}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-slate-400 text-sm mb-2">Funktionierend / Kaputt</div>
          <div className="text-3xl font-bold">
            <span className="text-green-400">{workingLinks}</span>
            <span className="text-slate-600 mx-2">/</span>
            <span className="text-red-400">{brokenLinks}</span>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-slate-400 text-sm mb-2">Gesamtumsatz</div>
          <div className="text-3xl font-bold text-green-400">
            ${totalRevenue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      {dbUser.subscriptionStatus === SubscriptionStatus.FREE && (
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Upgrade auf Premium 🚀
              </h3>
              <p className="text-blue-200 mb-4">
                Erhalte automatische Überwachung, E-Mail-Benachrichtigungen und Multi-Plattform-Support
              </p>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>✓ Vollständige Kanal-Überwachung</li>
                <li>✓ Automatische tägliche Prüfungen</li>
                <li>✓ E-Mail-Benachrichtigungen bei defekten Links</li>
                <li>✓ Analytics Dashboard</li>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-2">$10<span className="text-lg">/mo</span></div>
              <div className="text-blue-200 text-sm mb-4">50% Rabatt für Early Access</div>
              <UpgradeButton />
            </div>
          </div>
        </div>
      )}

      {dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE && (
        <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Premium Aktiv ✨
              </h3>
              <p className="text-green-200">
                Du hast vollen Zugang zu allen Premium-Funktionen
              </p>
            </div>
            <Link
              href="/dashboard/settings"
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Abo verwalten
            </Link>
          </div>
        </div>
      )}

      {/* Empty State or Channel List */}
      {totalChannels === 0 ? (
        <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE 
              ? 'Füge deinen ersten Kanal hinzu'
              : 'Prüfe deine ersten Links'}
          </h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            {dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE
              ? 'Verbinde deinen YouTube, Instagram oder TikTok Kanal, um alle Affiliate-Links automatisch zu überwachen'
              : 'Teste einzelne Video-Links aus YouTube-Beschreibungen (Kanal-Scan nur mit Premium verfügbar)'}
          </p>
          <Link
            href={dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE 
              ? '/dashboard/channels/add' 
              : '/dashboard/check'}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE 
              ? 'Kanal hinzufügen' 
              : 'Link prüfen'}
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Deine Kanäle</h2>
          <div className="space-y-4">
            {dbUser.channels.map(channel => (
              <div 
                key={channel.id}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {channel.avatarUrl && (
                    <img 
                      src={channel.avatarUrl} 
                      alt={channel.channelName}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-medium text-white">{channel.channelName}</div>
                    <div className="text-sm text-slate-400">
                      {channel.platform} • {channel.links.length} Links
                    </div>
                  </div>
                </div>
                <Link
                  href={`/dashboard/channels/${channel.id}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {totalLinks > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Letzte Links</h2>
          <div className="space-y-3">
            {dbUser.links.slice(0, 5).map(link => (
              <div 
                key={link.id}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
              >
                <div>
                  <div className="font-medium text-white">{link.productName}</div>
                  <div className="text-sm text-slate-400">{link.affiliateProvider}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    link.status === 'WORKING' ? 'bg-green-900 text-green-300' :
                    link.status === 'BROKEN' ? 'bg-red-900 text-red-300' :
                    'bg-slate-600 text-slate-300'
                  }`}>
                    {link.status}
                  </div>
                  <div className="text-sm text-slate-400">${link.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

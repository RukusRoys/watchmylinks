import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { LanguageSelector } from './LanguageSelector'
import { SubscriptionStatus } from '@prisma/client'
import Link from 'next/link'

export default async function SettingsPage() {
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

  const translations = {
    en: {
      title: 'Settings',
      subtitle: 'Manage your account preferences',
      account: 'Account',
      email: 'Email',
      name: 'Name',
      memberSince: 'Member since',
      language: 'Language',
      languageDesc: 'Choose your preferred language',
      subscription: 'Subscription',
      subscriptionStatus: 'Status',
      manageBilling: 'Manage Billing',
      upgradeNow: 'Upgrade Now',
      free: 'Free',
      premium: 'Premium',
    },
    de: {
      title: 'Einstellungen',
      subtitle: 'Verwalte deine Kontoeinstellungen',
      account: 'Konto',
      email: 'E-Mail',
      name: 'Name',
      memberSince: 'Mitglied seit',
      language: 'Sprache',
      languageDesc: 'Wähle deine bevorzugte Sprache',
      subscription: 'Abonnement',
      subscriptionStatus: 'Status',
      manageBilling: 'Abrechnung verwalten',
      upgradeNow: 'Jetzt upgraden',
      free: 'Kostenlos',
      premium: 'Premium',
    },
  }

  const t = translations[(dbUser.language || 'en') as 'en' | 'de']

  const isPremium = dbUser.subscriptionStatus === SubscriptionStatus.ACTIVE

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t.title}
        </h1>
        <p className="text-slate-400">
          {t.subtitle}
        </p>
      </div>

      {/* Account Section */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">{t.account}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              {t.email}
            </label>
            <div className="text-white">{dbUser.email}</div>
          </div>
          
          {dbUser.name && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                {t.name}
              </label>
              <div className="text-white">{dbUser.name}</div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              {t.memberSince}
            </label>
            <div className="text-white">
              {new Date(dbUser.createdAt).toLocaleDateString((dbUser.language || 'en') === 'de' ? 'de-DE' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Language Section */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-2">{t.language}</h2>
        <p className="text-slate-400 text-sm mb-4">{t.languageDesc}</p>
        <LanguageSelector currentLanguage={dbUser.language || 'en'} />
      </div>

      {/* Subscription Section */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">{t.subscription}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              {t.subscriptionStatus}
            </label>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isPremium 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-slate-600 text-slate-300'
              }`}>
                {isPremium ? t.premium : t.free}
              </span>
            </div>
          </div>

          {isPremium ? (
            <div>
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_BILLING_PORTAL_URL || '#'}
                className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {t.manageBilling}
              </a>
            </div>
          ) : (
            <div>
              <Link
                href="/dashboard/upgrade"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {t.upgradeNow}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

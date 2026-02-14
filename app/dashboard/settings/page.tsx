import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

export default async function SettingsPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0].emailAddress },
  })

  if (!dbUser) {
    redirect('/dashboard')
  }

  const isPremium = dbUser.subscriptionStatus === 'ACTIVE'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account and subscription</p>
      </div>

      {/* Account Info */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-slate-400">Email</div>
            <div className="text-white">{dbUser.email}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Name</div>
            <div className="text-white">{dbUser.name || 'Not set'}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Member since</div>
            <div className="text-white">
              {new Date(dbUser.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Subscription</h2>
        
        {isPremium ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium">
                Premium Active
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-slate-400">Status</div>
              <div className="text-white capitalize">{dbUser.subscriptionStatus.toLowerCase()}</div>
            </div>

            {dbUser.subscriptionEndsAt && (
              <div className="space-y-2">
                <div className="text-sm text-slate-400">Ends at</div>
                <div className="text-white">
                  {new Date(dbUser.subscriptionEndsAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            )}

            <form action="/api/stripe/create-portal" method="POST">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Manage Subscription
              </button>
            </form>

            <p className="text-sm text-slate-400">
              Update payment method, view invoices, or cancel subscription
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium">
                Free Plan
              </span>
            </div>

            <div className="text-slate-300">
              You're currently on the free plan. Upgrade to Premium to unlock all features.
            </div>

            <a
              href="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Premium Features
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

import LinkChecker from './components/LinkChecker';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            YouTubers lose <span className="text-red-600">$500/month</span>
            <br />
            to broken affiliate links
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We check 100+ links daily so you don't have to.
            <br />
            Stop losing commissions to dead links you don't even know about.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#free-checker"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Check Your Links Free →
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Get Early Access - $10/mo
            </a>
          </div>

          {/* Social Proof */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <p className="text-gray-700 italic mb-2">
                "Found 12 broken links costing me $800/month"
              </p>
              <p className="text-sm text-gray-500">
                — Sarah K., 50K subscribers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-white py-16" id="problem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            The Hidden Revenue Leak
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            💰 Average creator loses $500-1,500/month to broken links
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '❌',
                title: 'Programs Shut Down',
                description: 'Affiliate programs close without notice. Your links → 404 pages.'
              },
              {
                icon: '❌',
                title: 'Products Go Unavailable',
                description: 'Amazon items go out of stock. Clicks → no commissions.'
              },
              {
                icon: '❌',
                title: 'Links Break During Updates',
                description: 'Platforms change URL structures. Old links stop working.'
              },
              {
                icon: '❌',
                title: "You Don't Even Know",
                description: 'Unless you manually check 100+ links. (Spoiler: Nobody does this)'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free Tool Section */}
      <LinkChecker />

      {/* Solution Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Auto-Monitor Every Link, Everywhere
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            One dashboard for all your affiliate links across every platform
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '📺', title: 'YouTube', desc: 'Video descriptions, Playlists, Community posts' },
              { icon: '📸', title: 'Instagram', desc: 'Bio links, Stories, Highlights' },
              { icon: '🎵', title: 'TikTok', desc: 'Profile links, Video captions' },
              { icon: '📝', title: 'Blog', desc: 'All posts, Comments' },
              { icon: '✉️', title: 'Newsletter', desc: 'All emails, Signatures' },
              { icon: '🔗', title: 'More', desc: 'Any platform with links' }
            ].map((platform, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-5xl mb-3">{platform.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{platform.title}</h3>
                <p className="text-gray-600 text-sm">{platform.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
            <p className="text-2xl font-semibold text-blue-900">
              Daily scans + instant alerts when links break
            </p>
            <p className="text-lg text-blue-700 mt-2">
              Never lose another commission to a dead link
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need to Protect Your Revenue
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Centralized Dashboard',
                desc: 'All your links in one place. Organize by platform, campaign, or product.'
              },
              {
                icon: '🔍',
                title: '24/7 Monitoring',
                desc: 'Automatic daily scans. Checks HTTP status codes. Detects redirects & timeouts.'
              },
              {
                icon: '🔔',
                title: 'Instant Alerts',
                desc: 'Email + SMS notifications when link breaks. Customizable alert frequency.'
              },
              {
                icon: '💡',
                title: 'AI-Powered Recovery',
                desc: 'Alternative products suggested. Higher-paying affiliate programs. One-click replacement.'
              },
              {
                icon: '📈',
                title: 'Revenue Analytics',
                desc: 'Click tracking per link. Revenue attribution. Performance benchmarks.'
              },
              {
                icon: '🔗',
                title: 'Platform Integrations',
                desc: 'YouTube API (auto-scan). Instagram bio monitoring. Newsletter platforms.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-b from-white to-blue-50 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Lock in Founder Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Regular Pricing */}
            <div className="bg-white rounded-lg p-8 border-2 border-gray-300 opacity-75">
              <div className="text-center mb-6">
                <div className="text-red-500 font-semibold mb-2">❌ Regular Pricing</div>
                <div className="text-4xl font-bold mb-2 line-through text-gray-400">$20/month</div>
                <div className="text-gray-500">After public launch</div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Unlimited links</li>
                <li>✓ All platforms</li>
                <li>✓ Daily monitoring</li>
                <li>✓ Email + SMS alerts</li>
                <li>✓ Basic analytics</li>
              </ul>
            </div>

            {/* Early Access */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 border-4 border-blue-400 shadow-2xl transform scale-105">
              <div className="text-center mb-6">
                <div className="text-blue-100 font-semibold mb-2">✅ EARLY ACCESS</div>
                <div className="text-5xl font-bold mb-2 text-white">$10/month</div>
                <div className="text-blue-100">50% off for life</div>
              </div>
              <ul className="space-y-3 text-white mb-6">
                <li>✓ Everything in Regular, PLUS:</li>
                <li>⭐ Lifetime 50% discount</li>
                <li>⭐ Priority support</li>
                <li>⭐ Beta features first</li>
                <li>⭐ Shape the roadmap</li>
                <li>⭐ Founder badge</li>
              </ul>
              <button className="w-full bg-white text-blue-600 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                Get Early Access Now →
              </button>
              <div className="mt-4 text-center text-blue-100 text-sm">
                ⚠️ Limited to first 100 creators<br />
                47/100 spots taken
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold text-green-900 mb-2">
                💯 100% Money-Back Guarantee
              </p>
              <p className="text-green-700">
                Start using in 6-8 weeks. If we don't deliver → full refund. No questions asked.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl font-semibold text-gray-800">
              💰 One fixed link pays for 6 months
            </p>
            <p className="text-gray-600 mt-2">
              If you recover just $60 in commissions, the tool pays for itself for half a year.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'How is this different from PrettyLinks or ThirstyAffiliates?',
                a: "We're built for creators (YouTube, Instagram, TikTok), not WordPress bloggers. Mobile-first, multi-platform, with YouTube API integration for auto-scanning."
              },
              {
                q: 'Do you support YouTube?',
                a: 'Yes! We auto-scan video descriptions, playlists, community posts, and channel about sections. Set it up once, never think about it again.'
              },
              {
                q: 'What platforms do you support?',
                a: 'Currently: YouTube, Instagram, TikTok, blogs, newsletters. More coming soon (vote on roadmap as early access member).'
              },
              {
                q: "What if I don't have many links yet?",
                a: 'Perfect! Start monitoring early before links break. Prevention is easier than recovery. Plus, you get lifetime 50% discount for joining early.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, no contracts. Cancel anytime, download your data, keep full export of all your links and analytics.'
              },
              {
                q: 'When can I start using it?',
                a: "MVP launches in 6-8 weeks for early access members. You'll get beta access before public launch."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stop Losing Money to Broken Links
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 47 creators who locked in $10/month for life
          </p>
          <button className="px-12 py-5 bg-white text-blue-600 rounded-lg font-bold text-xl hover:bg-blue-50 transition-colors shadow-2xl">
            Get Early Access Now →
          </button>
          <div className="mt-6 flex justify-center gap-8 text-blue-100">
            <span>✓ 50% off forever</span>
            <span>✓ Start in 6-8 weeks</span>
            <span>✓ 100% money-back guarantee</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">
              WatchMyLinks — Link Monitoring for Creators
            </p>
            <p className="text-sm">
              Made with 👻 by Echo & Nico
            </p>
            <p className="text-xs mt-4">
              © 2026 WatchMyLinks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

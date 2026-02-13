import LanguageSwitcher from '../components/LanguageSwitcher';

export default function DemoDE() {
  const demoLinks = [
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'Amazon', url: 'Kabellose Kopfhörer', status: 'working', clicks: 1847, revenue: 421 },
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'PartnerHub', url: 'Software Deal (abgelaufen)', status: 'broken', clicks: 932, revenue: 0 },
    { platform: 'Instagram', channel: '@lifestyle_creator', provider: 'Shopify Store', url: 'Yogamatten Bundle', status: 'working', clicks: 2341, revenue: 587 },
    { platform: 'TikTok', channel: '@fitness_tips', provider: 'Awin', url: 'Protein Pulver', status: 'working', clicks: 1523, revenue: 305 },
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'ClickBank', url: 'Online Kurs (alter Link)', status: 'redirect', clicks: 743, revenue: 223 },
    { platform: 'Blog', channel: 'meinefitness.de', provider: 'Amazon DE', url: 'Laufschuhe (alte SKU)', status: 'broken', clicks: 1122, revenue: 0 },
    { platform: 'Newsletter', channel: 'Tech Wöchentlich', provider: 'CJ Affiliate', url: 'Webhosting Deal', status: 'working', clicks: 892, revenue: 267 },
    { platform: 'YouTube', channel: 'Gadget Unboxing', provider: 'AliExpress', url: 'Handyhülle (entfernt)', status: 'broken', clicks: 2145, revenue: 0 },
    { platform: 'Instagram', channel: '@home_decor', provider: 'Etsy', url: 'Handgemachte Kerzen', status: 'working', clicks: 645, revenue: 129 },
    { platform: 'TikTok', channel: '@beauty_tips', provider: 'Amazon', url: 'Hautpflege Set', status: 'working', clicks: 3421, revenue: 821 },
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'ShareASale', url: 'VPN Service (weitergeleitet)', status: 'redirect', clicks: 534, revenue: 160 },
    { platform: 'Blog', channel: 'reiseblog.net', provider: 'Rakuten', url: 'Koffer Deals', status: 'working', clicks: 423, revenue: 127 },
    { platform: 'YouTube', channel: 'Gadget Unboxing', provider: 'PartnerStack', url: 'Altes Programm (geschlossen)', status: 'broken', clicks: 1834, revenue: 0 },
    { platform: 'Newsletter', channel: 'Marketing Weekly', provider: 'Impact', url: 'Email Tool Trial', status: 'working', clicks: 756, revenue: 227 },
    { platform: 'Instagram', channel: '@book_reviews', provider: 'Amazon', url: 'Bestseller Bücher', status: 'working', clicks: 1245, revenue: 374 },
  ];

  const totalLinks = demoLinks.length;
  const workingLinks = demoLinks.filter(l => l.status === 'working').length;
  const brokenLinks = demoLinks.filter(l => l.status === 'broken').length;
  const redirectLinks = demoLinks.filter(l => l.status === 'redirect').length;
  const totalClicks = demoLinks.reduce((sum, l) => sum + l.clicks, 0);
  const totalRevenue = demoLinks.reduce((sum, l) => sum + l.revenue, 0);
  const lostRevenue = demoLinks.filter(l => l.status === 'broken').reduce((sum, l) => sum + (l.clicks * 0.3), 0);

  return (
    <main className="min-h-screen bg-slate-900 py-20">
      <LanguageSwitcher />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dashboard Demo
          </h1>
          <p className="text-xl text-gray-300">
            Sieh wie WatchMyLinks deinen Umsatz schützt
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 border-2 border-blue-500">
            <div className="text-blue-100 text-sm font-semibold mb-2">GESAMT LINKS</div>
            <div className="text-4xl font-bold text-white mb-1">{totalLinks}</div>
            <div className="text-blue-200 text-sm">Über alle Plattformen</div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 border-2 border-green-500">
            <div className="text-green-100 text-sm font-semibold mb-2">FUNKTIONIEREND</div>
            <div className="text-4xl font-bold text-white mb-1">{workingLinks}</div>
            <div className="text-green-200 text-sm">✅ Generieren Umsatz</div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 border-2 border-red-500">
            <div className="text-red-100 text-sm font-semibold mb-2">KAPUTTE LINKS</div>
            <div className="text-4xl font-bold text-white mb-1">{brokenLinks}</div>
            <div className="text-red-200 text-sm">❌ Verloren: ${Math.round(lostRevenue)}/Monat</div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 border-2 border-purple-500">
            <div className="text-purple-100 text-sm font-semibold mb-2">GESAMT-UMSATZ</div>
            <div className="text-4xl font-bold text-white mb-1">${totalRevenue}</div>
            <div className="text-purple-200 text-sm">Diesen Monat</div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-slate-800 rounded-lg p-8 border-2 border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Performance-Übersicht</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">Funktionierend</span>
                <span className="text-green-400 font-bold">{workingLinks}/{totalLinks}</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  style={{ width: `${(workingLinks / totalLinks) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">Kaputt</span>
                <span className="text-red-400 font-bold">{brokenLinks}/{totalLinks}</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-600"
                  style={{ width: `${(brokenLinks / totalLinks) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">Weiterleitungen</span>
                <span className="text-amber-400 font-bold">{redirectLinks}/{totalLinks}</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                  style={{ width: `${(redirectLinks / totalLinks) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-gray-400 text-sm mb-1">Gesamt-Klicks (30 Tage)</div>
                <div className="text-3xl font-bold text-white">{totalClicks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Ø Umsatz pro Klick</div>
                <div className="text-3xl font-bold text-white">$0.{Math.round((totalRevenue / totalClicks) * 100)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box: Was sind Weiterleitungen? */}
        <div className="bg-amber-900/30 border-2 border-amber-600 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-2">Was sind Weiterleitungen?</h3>
              <p className="text-amber-100 leading-relaxed">
                Eine Weiterleitung bedeutet, der Link funktioniert NOCH, ABER die URL hat sich geändert (301/302 Redirect). 
                <span className="font-semibold"> Beispiel:</span> alter-shop.com/produkt → leitet weiter zu → neuer-shop.com/produkt
              </p>
              <p className="text-amber-100 leading-relaxed mt-2">
                <span className="font-semibold">⚠️ Risiko:</span> Die Weiterleitung könnte bald kaputt gehen oder du verlierst Affiliate-Tracking. 
                <span className="font-semibold"> Empfehlung:</span> Link auf die neue URL updaten.
              </p>
            </div>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Alle Links</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase">Quelle</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase">Affiliate</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase">Produkt/Link</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-300 uppercase">Klicks</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-300 uppercase">Umsatz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {demoLinks.map((link, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-gray-300 w-fit">
                          {link.platform === 'YouTube' && '📺'}
                          {link.platform === 'Instagram' && '📸'}
                          {link.platform === 'TikTok' && '🎵'}
                          {link.platform === 'Blog' && '📝'}
                          {link.platform === 'Newsletter' && '✉️'}
                          {' '}{link.platform}
                        </span>
                        <span className="text-xs text-gray-400">{link.channel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-900 text-blue-300 border border-blue-600">
                        {link.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 text-sm max-w-xs">
                        {link.url}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {link.status === 'working' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-900 text-green-300 border border-green-600">
                          ✅ Funktioniert
                        </span>
                      )}
                      {link.status === 'broken' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-900 text-red-300 border border-red-600">
                          ❌ Kaputt
                        </span>
                      )}
                      {link.status === 'redirect' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-900 text-amber-300 border border-amber-600">
                          ⚠️ Weiterleitung
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-white font-semibold">{link.clicks.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-bold ${link.status === 'broken' ? 'text-red-400' : 'text-green-400'}`}>
                        ${link.revenue}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 border-2 border-blue-500">
          <h2 className="text-3xl font-bold text-white mb-4">
            Willst du das für deine Links?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sichere dir Early Access — $10/Monat für immer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/de#pricing"
              className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Early Access sichern →
            </a>
            <a
              href="/de"
              className="px-8 py-4 bg-blue-800 text-white rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors border-2 border-blue-400"
            >
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

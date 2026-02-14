import LinkChecker from '../components/LinkCheckerDE';
import LanguageSwitcher from '../components/LanguageSwitcher';
import MobileMenu from '../components/MobileMenu';

export default function HomeDE() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold text-white">WatchMyLinks</div>
          
          {/* Mobile Menu (visible on small screens) */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          {/* Desktop Menu (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="/sign-in"
              className="px-4 py-2 text-white hover:text-blue-300 transition-colors font-medium"
            >
              Anmelden
            </a>
            <a
              href="/sign-up"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Registrieren
            </a>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            YouTuber verlieren <span className="text-red-500">$500/Monat</span>
            <br />
            durch kaputte Affiliate-Links
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Wir prüfen täglich 100+ Links, damit du es nicht musst.
            <br />
            Schluss mit verlorenen Provisionen durch tote Links.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#free-checker"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-xl"
            >
              Links kostenlos prüfen →
            </a>
            <a
              href="/demo-de"
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold text-lg border-2 border-purple-400 hover:bg-purple-700 transition-colors"
            >
              📊 Demo Dashboard ansehen
            </a>
            <a
              href="/sign-up"
              className="px-8 py-4 bg-slate-700 text-white rounded-lg font-bold text-lg border-2 border-blue-500 hover:bg-slate-600 transition-colors"
            >
              Early Access - $10/Monat
            </a>
          </div>

          {/* Social Proof */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl border-2 border-slate-700">
              <p className="text-gray-100 italic mb-2 text-lg">
                "12 kaputte Links gefunden, die mich $800/Monat kosteten"
              </p>
              <p className="text-sm text-gray-300">
                — Sarah K., 50K Abonnenten
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-slate-800 py-16" id="problem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Das versteckte Umsatzleck
          </h2>
          <p className="text-xl text-center text-gray-200 mb-12 font-semibold">
            💰 Creator verlieren durchschnittlich $500-1.500/Monat durch kaputte Links
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '❌',
                title: 'Programme schließen',
                description: 'Affiliate-Programme werden ohne Vorwarnung beendet. Deine Links → 404 Fehler.'
              },
              {
                icon: '❌',
                title: 'Produkte nicht verfügbar',
                description: 'Amazon-Artikel sind ausverkauft. Klicks → keine Provisionen.'
              },
              {
                icon: '❌',
                title: 'Links brechen bei Updates',
                description: 'Plattformen ändern URL-Strukturen. Alte Links funktionieren nicht mehr.'
              },
              {
                icon: '❌',
                title: 'Du weißt es nicht mal',
                description: 'Es sei denn, du prüfst manuell 100+ Links. (Spoiler: Das macht niemand)'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900 rounded-lg p-6 border-2 border-slate-700">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free Tool Section */}
      <LinkChecker />

      {/* Solution Section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Überwache jeden Link, überall
          </h2>
          <p className="text-xl text-center text-gray-200 mb-12">
            Ein Dashboard für alle deine Affiliate-Links auf jeder Plattform
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '📺', title: 'YouTube', desc: 'Video-Beschreibungen, Playlists, Community-Posts' },
              { icon: '📸', title: 'Instagram', desc: 'Bio-Links, Stories, Highlights' },
              { icon: '🎵', title: 'TikTok', desc: 'Profil-Links, Video-Untertitel' },
              { icon: '📝', title: 'Blog', desc: 'Alle Beiträge, Kommentare' },
              { icon: '✉️', title: 'Newsletter', desc: 'Alle E-Mails, Signaturen' },
              { icon: '🔗', title: 'Mehr', desc: 'Jede Plattform mit Links' }
            ].map((platform, idx) => (
              <div key={idx} className="text-center p-6 bg-slate-800 rounded-lg border-2 border-slate-700">
                <div className="text-5xl mb-3">{platform.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{platform.title}</h3>
                <p className="text-gray-300 text-sm">{platform.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-blue-900 rounded-lg p-8 border-2 border-blue-600">
            <p className="text-2xl font-bold text-white">
              Tägliche Scans + sofortige Benachrichtigung bei kaputten Links
            </p>
            <p className="text-lg text-blue-200 mt-2">
              Nie wieder Provisionen durch tote Links verlieren
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Alles, was du brauchst um deinen Umsatz zu schützen
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Zentrales Dashboard',
                desc: 'Alle Links an einem Ort. Sortiert nach Plattform, Kampagne oder Produkt.'
              },
              {
                icon: '🔍',
                title: '24/7 Überwachung',
                desc: 'Automatische tägliche Scans. Prüft HTTP-Statuscodes. Erkennt Weiterleitungen & Timeouts.'
              },
              {
                icon: '🔔',
                title: 'Sofort-Benachrichtigung',
                desc: 'E-Mail + SMS wenn Link kaputt geht. Anpassbare Benachrichtigungen.'
              },
              {
                icon: '📈',
                title: 'Umsatz-Analytics',
                desc: 'Klick-Tracking pro Link. Umsatz-Zuordnung. Performance-Benchmarks.'
              },
              {
                icon: '🔗',
                title: 'Plattform-Integrationen',
                desc: 'YouTube API (Auto-Scan). Instagram Bio-Überwachung. Newsletter-Plattformen.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-900 rounded-lg p-6 shadow-xl border-2 border-slate-700">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-16" id="pricing">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Sichere dir Gründer-Preise
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Regular Pricing */}
            <div className="bg-slate-700 rounded-lg p-8 border-2 border-slate-600 opacity-75">
              <div className="text-center mb-6">
                <div className="text-red-400 font-bold mb-2">❌ Normal-Preis</div>
                <div className="text-4xl font-bold mb-2 line-through text-gray-400">$20/Monat</div>
                <div className="text-gray-300">Nach offiziellem Launch</div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>✓ Unbegrenzte Links</li>
                <li>✓ Alle Plattformen</li>
                <li>✓ Tägliche Überwachung</li>
                <li>✓ E-Mail + SMS Benachrichtigungen</li>
                <li>✓ Umsatz-Analytics</li>
              </ul>
            </div>

            {/* Early Access */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 border-4 border-blue-500 shadow-2xl transform scale-105">
              <div className="text-center mb-6">
                <div className="text-blue-100 font-bold mb-2 text-lg">✅ EARLY ACCESS</div>
                <div className="text-5xl font-bold mb-2 text-white">$10/Monat</div>
                <div className="text-blue-100 font-semibold">50% Rabatt für immer</div>
              </div>
              <ul className="space-y-3 text-white mb-6 font-medium">
                <li>✓ Alles aus Normal-Preis, PLUS:</li>
                <li>⭐ Lebenslanger 50% Rabatt</li>
                <li>⭐ Prioritäts-Support</li>
                <li>⭐ Beta-Features zuerst</li>
                <li>⭐ Roadmap mitgestalten</li>
              </ul>
              <a href="/sign-up" className="block w-full bg-white text-blue-700 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl text-center">
                Jetzt Early Access sichern →
              </a>
              <div className="mt-4 text-center text-white text-sm font-semibold">
                ⚠️ Limitiert auf die ersten 100 Creator<br />
                47/100 Plätze vergeben
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-green-900 border-2 border-green-600 rounded-lg p-6 inline-block">
              <p className="text-lg font-bold text-white mb-2">
                💯 100% Geld-zurück-Garantie
              </p>
              <p className="text-green-100">
                Start in 6-8 Wochen. Wenn wir nicht liefern → volle Rückerstattung. Keine Fragen.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-white">
              💰 Ein reparierter Link zahlt sich 6 Monate
            </p>
            <p className="text-gray-200 mt-2">
              Wenn du nur $60 an Provisionen wiederherstellst, hat sich das Tool für ein halbes Jahr bezahlt gemacht.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Wie unterscheidet sich das von PrettyLinks oder ThirstyAffiliates?',
                a: "Wir sind für Creator (YouTube, Instagram, TikTok) gebaut, nicht für WordPress-Blogger. Mobile-First, Multi-Plattform, mit YouTube API-Integration für Auto-Scanning."
              },
              {
                q: 'Unterstützt ihr YouTube?',
                a: 'Ja! Wir scannen automatisch Video-Beschreibungen, Playlists, Community-Posts und Kanal-Infos. Einmal einrichten, nie wieder dran denken.'
              },
              {
                q: 'Welche Plattformen unterstützt ihr?',
                a: 'Aktuell: YouTube, Instagram, TikTok, Blogs, Newsletter. Weitere folgen bald (als Early Access Mitglied hast du Mitspracherecht).'
              },
              {
                q: "Was wenn ich noch nicht viele Links habe?",
                a: 'Perfekt! Starte die Überwachung früh, bevor Links kaputt gehen. Prävention ist einfacher als Reparatur. Plus: Du bekommst lebenslang 50% Rabatt.'
              },
              {
                q: 'Kann ich jederzeit kündigen?',
                a: 'Ja, keine Vertragsbindung. Jederzeit kündbar, Daten herunterladen, vollständiger Export aller Links und Analytics.'
              },
              {
                q: 'Wann kann ich loslegen?',
                a: "MVP startet in 6-8 Wochen für Early Access Mitglieder. Du bekommst Beta-Zugang vor dem öffentlichen Launch."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-800 rounded-lg p-6 border-2 border-slate-700">
                <h3 className="text-lg font-bold mb-2 text-white">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Schluss mit Geldverlust durch kaputte Links
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-semibold">
            47 Creator haben sich bereits $10/Monat lebenslang gesichert
          </p>
          <a href="/sign-up" className="inline-block px-12 py-5 bg-white text-blue-700 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-2xl">
            Jetzt Early Access sichern →
          </a>
          <div className="mt-6 flex justify-center gap-8 text-white font-medium">
            <span>✓ 50% für immer</span>
            <span>✓ Start in 6-8 Wochen</span>
            <span>✓ 100% Geld-zurück-Garantie</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-4">
              WatchMyLinks — Link-Überwachung für Creator
            </p>
            
            {/* Legal Links */}
            <div className="flex justify-center gap-6 text-sm mb-4">
              <a href="/impressum" className="text-gray-400 hover:text-white transition-colors">
                Impressum
              </a>
              <span className="text-gray-600">|</span>
              <a href="/datenschutz" className="text-gray-400 hover:text-white transition-colors">
                Datenschutz
              </a>
              <span className="text-gray-600">|</span>
              <a href="/kontakt" className="text-gray-400 hover:text-white transition-colors">
                Kontakt
              </a>
            </div>
            
            <p className="text-xs mt-4">
              © 2026 WatchMyLinks. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

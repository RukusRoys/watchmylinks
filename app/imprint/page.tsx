export default function Imprint() {
  return (
    <main className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800 rounded-lg p-8 border-2 border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-8">Legal Notice / Imprint</h1>
          
          <div className="space-y-6 text-gray-200">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Information according to § 5 TMG (German Telemedia Act)</h2>
              <p className="leading-relaxed">
                Nicolas David Jahnel<br />
                Keelbeker Weg 26<br />
                24852 Langstedt<br />
                Schleswig-Holstein<br />
                Germany
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Contact</h2>
              <p className="leading-relaxed">
                Email: <a href="mailto:nicolasjahnel@outlook.de" className="text-blue-400 hover:text-blue-300 underline">nicolasjahnel@outlook.de</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">EU Dispute Resolution</h2>
              <p className="leading-relaxed">
                The European Commission provides a platform for online dispute resolution (ODR):<br />
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                  https://ec.europa.eu/consumers/odr/
                </a><br />
                Our email address can be found above in the imprint.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Consumer Dispute Resolution / Universal Arbitration Board</h2>
              <p className="leading-relaxed">
                We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Liability for Content</h2>
              <p className="leading-relaxed">
                As a service provider, we are responsible for our own content on these pages in accordance with § 7 para. 1 TMG 
                under general law. However, according to §§ 8 to 10 TMG, we as a service provider are not obliged to monitor 
                transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
              </p>
              <p className="leading-relaxed mt-4">
                Obligations to remove or block the use of information according to general laws remain unaffected. However, 
                liability in this regard is only possible from the time of knowledge of a specific infringement. Upon becoming 
                aware of corresponding infringements, we will remove this content immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Liability for Links</h2>
              <p className="leading-relaxed">
                Our offer contains links to external websites of third parties, on whose contents we have no influence. 
                Therefore, we cannot assume any liability for these external contents. The respective provider or operator 
                of the pages is always responsible for the content of the linked pages.
              </p>
              <p className="leading-relaxed mt-4">
                The linked pages were checked for possible legal violations at the time of linking. Illegal contents were 
                not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages 
                is not reasonable without concrete evidence of an infringement. Upon becoming aware of infringements, we 
                will remove such links immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-2">Copyright</h2>
              <p className="leading-relaxed">
                The content and works created by the site operators on these pages are subject to German copyright law. 
                The reproduction, editing, distribution and any kind of use outside the limits of copyright require the 
                written consent of the respective author or creator.
              </p>
              <p className="leading-relaxed mt-4">
                Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the 
                content on this site was not created by the operator, the copyrights of third parties are respected. 
                In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright 
                infringement, please inform us accordingly. Upon becoming aware of infringements, we will remove such 
                content immediately.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <a href="/" className="text-blue-400 hover:text-blue-300 font-semibold">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

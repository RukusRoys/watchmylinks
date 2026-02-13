'use client';

import { useState } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';

type SortField = 'platform' | 'channel' | 'provider' | 'clicks' | 'revenue' | 'status';
type SortDirection = 'asc' | 'desc';

export default function Demo() {
  const initialLinks = [
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'Amazon', product: 'Wireless Headphones', url: 'amazon.com/dp/B08XYZ', status: 'working', clicks: 1847, revenue: 421 },
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'PartnerHub', product: 'Software Deal', url: 'partnerhub.com/ref/expired', status: 'broken', clicks: 932, revenue: 0 },
    { platform: 'Instagram', channel: '@lifestyle_creator', provider: 'Shopify Store', product: 'Yoga Mat Bundle', url: 'shopify-store.com/yoga', status: 'working', clicks: 2341, revenue: 587 },
    { platform: 'TikTok', channel: '@fitness_tips', provider: 'Awin', product: 'Protein Powder', url: 'awin.com/link/789', status: 'working', clicks: 1523, revenue: 305 },
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'ClickBank', product: 'Online Course', url: 'clickbank.net/promo-old', status: 'redirect', clicks: 743, revenue: 223 },
    { platform: 'Blog', channel: 'myfitnessjournal.com', provider: 'Amazon DE', product: 'Running Shoes', url: 'amazon.de/dp/OLDSKU', status: 'broken', clicks: 1122, revenue: 0 },
    { platform: 'Newsletter', channel: 'Weekly Tech Digest', provider: 'CJ Affiliate', product: 'Web Hosting Deal', url: 'cj.com/advertiser/link', status: 'working', clicks: 892, revenue: 267 },
    { platform: 'YouTube', channel: 'Gadget Unboxing', provider: 'AliExpress', product: 'Phone Case', url: 'aliexpress.com/item/old', status: 'broken', clicks: 2145, revenue: 0 },
    { platform: 'Instagram', channel: '@lifestyle_creator', provider: 'Etsy', product: 'Handmade Candles', url: 'etsy.com/shop/product', status: 'working', clicks: 645, revenue: 129 },
    { platform: 'TikTok', channel: '@beauty_tips', provider: 'Amazon', product: 'Skincare Set', url: 'amazon.com/product/abc789', status: 'working', clicks: 3421, revenue: 821 },
    { platform: 'YouTube', channel: 'Tech Reviews Daily', provider: 'ShareASale', product: 'VPN Service', url: 'shareasale.com/m-pr.cfm', status: 'redirect', clicks: 534, revenue: 160 },
    { platform: 'Blog', channel: 'travelblog.net', provider: 'Rakuten', product: 'Luggage Deals', url: 'rakuten.com/affiliate', status: 'working', clicks: 423, revenue: 127 },
    { platform: 'YouTube', channel: 'Gadget Unboxing', provider: 'PartnerStack', product: 'Old Program', url: 'partner-network.com/closed', status: 'broken', clicks: 1834, revenue: 0 },
    { platform: 'Newsletter', channel: 'Marketing Weekly', provider: 'Impact', product: 'Email Tool Trial', url: 'impact.com/campaign', status: 'working', clicks: 756, revenue: 227 },
    { platform: 'Instagram', channel: '@lifestyle_creator', provider: 'Amazon', product: 'Bestseller Books', url: 'amazon.com/gp/product', status: 'working', clicks: 1245, revenue: 374 },
  ];

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [links, setLinks] = useState(initialLinks);

  const handleSort = (field: SortField) => {
    const newDirection = sortField === field && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...links].sort((a, b) => {
      let aVal: any = a[field];
      let bVal: any = b[field];

      if (field === 'clicks' || field === 'revenue') {
        return newDirection === 'desc' ? bVal - aVal : aVal - bVal;
      }

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (newDirection === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      } else {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
    });

    setLinks(sorted);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-gray-500 ml-1">↕</span>;
    return <span className="ml-1">{sortDirection === 'desc' ? '↓' : '↑'}</span>;
  };

  const totalLinks = links.length;
  const workingLinks = links.filter(l => l.status === 'working').length;
  const brokenLinks = links.filter(l => l.status === 'broken').length;
  const redirectLinks = links.filter(l => l.status === 'redirect').length;
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const totalRevenue = links.reduce((sum, l) => sum + l.revenue, 0);
  const lostRevenue = links.filter(l => l.status === 'broken').reduce((sum, l) => sum + (l.clicks * 0.3), 0);

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
            See how WatchMyLinks protects your revenue
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 border-2 border-blue-500">
            <div className="text-blue-100 text-sm font-semibold mb-2">TOTAL LINKS</div>
            <div className="text-4xl font-bold text-white mb-1">{totalLinks}</div>
            <div className="text-blue-200 text-sm">Across all platforms</div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 border-2 border-green-500">
            <div className="text-green-100 text-sm font-semibold mb-2">WORKING LINKS</div>
            <div className="text-4xl font-bold text-white mb-1">{workingLinks}</div>
            <div className="text-green-200 text-sm">✅ Generating revenue</div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 border-2 border-red-500">
            <div className="text-red-100 text-sm font-semibold mb-2">BROKEN LINKS</div>
            <div className="text-4xl font-bold text-white mb-1">{brokenLinks}</div>
            <div className="text-red-200 text-sm">❌ Lost revenue: ${Math.round(lostRevenue)}/mo</div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 border-2 border-purple-500">
            <div className="text-purple-100 text-sm font-semibold mb-2">TOTAL REVENUE</div>
            <div className="text-4xl font-bold text-white mb-1">${totalRevenue}</div>
            <div className="text-purple-200 text-sm">This month</div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-slate-800 rounded-lg p-8 border-2 border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Performance Overview</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">Working</span>
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
                <span className="text-gray-300 font-medium">Broken</span>
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
                <span className="text-gray-300 font-medium">Redirects</span>
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
                <div className="text-gray-400 text-sm mb-1">Total Clicks (30 days)</div>
                <div className="text-3xl font-bold text-white">{totalClicks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Avg. Revenue per Click</div>
                <div className="text-3xl font-bold text-white">$0.{Math.round((totalRevenue / totalClicks) * 100)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box: What are Redirects? */}
        <div className="bg-amber-900/30 border-2 border-amber-600 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-2">What are Redirects?</h3>
              <p className="text-amber-100 leading-relaxed">
                A redirect means the link still works, BUT the URL has changed (301/302 redirect). 
                <span className="font-semibold"> Example:</span> old-shop.com/product → redirects to → new-shop.com/product
              </p>
              <p className="text-amber-100 leading-relaxed mt-2">
                <span className="font-semibold">⚠️ Risk:</span> The redirect could break soon, or you might lose affiliate tracking. 
                <span className="font-semibold"> Recommendation:</span> Update the link to the new URL.
              </p>
            </div>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-slate-800 rounded-lg border-2 border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">All Links (Click headers to sort)</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th 
                    onClick={() => handleSort('platform')}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase cursor-pointer hover:text-white transition-colors"
                  >
                    Platform <SortIcon field="platform" />
                  </th>
                  <th 
                    onClick={() => handleSort('channel')}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase cursor-pointer hover:text-white transition-colors"
                  >
                    Channel <SortIcon field="channel" />
                  </th>
                  <th 
                    onClick={() => handleSort('provider')}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase cursor-pointer hover:text-white transition-colors"
                  >
                    Affiliate <SortIcon field="provider" />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase">
                    Product / Link
                  </th>
                  <th 
                    onClick={() => handleSort('status')}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase cursor-pointer hover:text-white transition-colors"
                  >
                    Status <SortIcon field="status" />
                  </th>
                  <th 
                    onClick={() => handleSort('clicks')}
                    className="px-6 py-4 text-right text-xs font-bold text-gray-300 uppercase cursor-pointer hover:text-white transition-colors"
                  >
                    Clicks <SortIcon field="clicks" />
                  </th>
                  <th 
                    onClick={() => handleSort('revenue')}
                    className="px-6 py-4 text-right text-xs font-bold text-gray-300 uppercase cursor-pointer hover:text-white transition-colors"
                  >
                    Revenue <SortIcon field="revenue" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {links.map((link, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-gray-300">
                        {link.platform === 'YouTube' && '📺'}
                        {link.platform === 'Instagram' && '📸'}
                        {link.platform === 'TikTok' && '🎵'}
                        {link.platform === 'Blog' && '📝'}
                        {link.platform === 'Newsletter' && '✉️'}
                        {' '}{link.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-200 text-sm font-medium">{link.channel}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-900 text-blue-300 border border-blue-600">
                        {link.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-gray-200 text-sm font-medium">{link.product}</div>
                        <div className="text-gray-400 text-xs font-mono">{link.url}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {link.status === 'working' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-900 text-green-300 border border-green-600">
                          ✅ Working
                        </span>
                      )}
                      {link.status === 'broken' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-900 text-red-300 border border-red-600">
                          ❌ Broken
                        </span>
                      )}
                      {link.status === 'redirect' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-900 text-amber-300 border border-amber-600">
                          ⚠️ Redirect
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
            Want this for your links?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get Early Access — $10/month for life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#pricing"
              className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get Early Access →
            </a>
            <a
              href="/"
              className="px-8 py-4 bg-blue-800 text-white rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors border-2 border-blue-400"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

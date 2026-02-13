# WatchMyLinks - Link Monitoring for Creators

Affiliate link monitoring tool for YouTube creators, Instagram influencers, and content creators.

## 🚀 Current Status

**Phase:** MVP Build
**Version:** 0.1.0 (Pre-Launch)
**Domain:** watchmylinks.app

### ✅ Completed:
- [x] Next.js 14 setup with TypeScript
- [x] Tailwind CSS styling
- [x] Landing page (full copy)
- [x] Free link checker tool
- [x] YouTube API integration
- [x] Link status checking (200, 404, redirects)
- [x] Results page with lost revenue calculator

### 🔨 In Progress:
- [ ] Vercel deployment
- [ ] DNS setup (watchmylinks.app → Vercel)
- [ ] Testing & bug fixes
- [ ] Stripe payment integration (early access)

### 📅 Next Steps:
- [ ] Beta testing with 2-3 creators
- [ ] Soft launch (limited Reddit post)
- [ ] Collect pre-payments (target: 20-50)
- [ ] Build full MVP if validation successful

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API:** YouTube Data API v3
- **Deployment:** Vercel (free tier)
- **Domain:** watchmylinks.app (€13.99/year)

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🔑 Environment Variables

Create `.env.local`:
```
YOUTUBE_API_KEY=your_key_here
```

## 📊 Features

### Free Tool:
- Paste YouTube video URL
- Extract all links from description
- Check HTTP status (working/broken/redirects)
- Calculate lost revenue estimate
- No signup required

### Planned (Full MVP):
- Auto-monitoring (daily scans)
- Email + SMS alerts
- Dashboard (all links in one place)
- Multi-platform (YouTube, Instagram, TikTok)
- Analytics (click tracking, revenue attribution)
- AI recovery suggestions

## 🎯 Validation Goals

**Target:** 20-50 pre-paying users @ $10/month
**Timeline:** 4 weeks
**Success Criteria:** ≥20 pre-payments = BUILD FULL MVP

## 📝 Notes

- API Key stored in `.env.local` (not committed)
- Free tier limits: 10,000 YouTube API calls/day
- Max 50 links checked per scan (prevent abuse)
- 10 second timeout per link check

## 🔗 Links

- Domain: watchmylinks.app (pending DNS)
- Docs: `/docs` folder
- API: `/app/api/check-links`

---

Built by Echo 👻 & Nico

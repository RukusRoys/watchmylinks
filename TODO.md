# TODO - WatchMyLinks

## 🚨 CRITICAL - Cost & Limits Dashboard

**WARUM:** Wir müssen Limits im Blick behalten um böse Überraschungen zu vermeiden!

**Was tracken:**

### **Vercel Limits:**
- [ ] Bandwidth Usage (1 TB Free, dann $40/100GB)
- [ ] Serverless Function Usage (100 GB-Hours Free)
- [ ] Deployment Count
- [ ] Edge Requests

### **Neon Database Limits:**
- [ ] Storage Usage (0.5 GB Free, dann $19/mo für Scale)
- [ ] Connection Count
- [ ] Query Count

### **YouTube API Limits:**
- [ ] Daily Quota Usage (10k units/day Free)
- [ ] Remaining Quota
- [ ] Cost wenn drüber ($0.10/10k units)

### **Features:**
- [ ] Dashboard mit aktuellen Usage Stats
- [ ] Warnungen bei 80% Auslastung
- [ ] Email Alert bei 95%
- [ ] Monatliche Cost-Reports

### **Tech Stack:**
- Vercel API für Usage Stats
- Neon API für Database Stats
- YouTube API Quota Check
- Simple Next.js Dashboard Page (`/admin/limits`)

**Priorität:** MEDIUM (nach MVP Launch bauen)

---

## 📊 MVP Features (6-8 Wochen)

### **Done:**
- [x] Landing Page (DE/EN)
- [x] Free Link Checker (1 Video)
- [x] Demo Dashboard
- [x] Contact Form
- [x] Legal Pages (Impressum/Datenschutz)

### **In Progress:**
- [ ] Database Setup (Neon)
- [ ] User Authentication
- [ ] Link Storage
- [ ] Daily Monitoring Cron

### **TODO:**
- [ ] Premium Channel Scan (alle Videos)
- [ ] Link Dashboard (grouped by link)
- [ ] Email Alerts (broken links)
- [ ] Stripe Integration (Payments)
- [ ] User Dashboard
- [ ] Multi-platform support (Instagram, TikTok manual)

---

## 🔧 Technical Debt

- [ ] Add rate limiting to Free Tool
- [ ] Optimize YouTube API calls
- [ ] Add caching layer
- [ ] Error logging (Sentry?)
- [ ] Analytics (PostHog oder Plausible?)

---

## 💡 Nice to Have (Post-MVP)

- [ ] View by Video (zusätzlich zu View by Link)
- [ ] AI-powered link suggestions
- [ ] Browser Extension
- [ ] Slack/Discord Integrations
- [ ] Historical tracking / Charts
- [ ] Competitor link analysis

---

**Last Updated:** 2026-02-13
**Status:** PRE-MVP (Validation Phase)

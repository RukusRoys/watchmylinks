# LINKGUARD - STEP-BY-STEP FAHRPLAN

**Status:** ✅ Repo angelegt
**Path:** `/data/.openclaw/workspace/linkguard/`

---

## 📋 PHASE 1: DOMAIN & SETUP

### STEP 1: Domain kaufen
**Was:** Domain registrieren
**Wo:** https://www.namecheap.com/ oder https://www.hostinger.com/
**Action:**
- [ ] Suche: "linkguard.io"
- [ ] Wenn verfügbar: Kaufen (~€35-50/Jahr)
- [ ] Wenn NICHT verfügbar: Alternativen checken:
  - linkhealth.app
  - linkguard.app
  - creatorlinks.io
- [ ] Bei Checkout aktivieren:
  - [x] Domain Privacy / WHOIS Protection
  - [x] Auto-Renewal
- [ ] Nach Kauf: Schreib mir welche Domain du hast ✅

### STEP 2: YouTube API Key holen
**Was:** Kostenloser API Key für YouTube Data API
**Wo:** https://console.cloud.google.com/
**Action:**
- [ ] Gehe zu Google Cloud Console
- [ ] Create New Project (Name: "LinkGuard")
- [ ] Enable "YouTube Data API v3"
- [ ] Create API Key (Credentials → Create Credentials → API Key)
- [ ] Restrict API Key (nur YouTube Data API v3)
- [ ] Kopiere API Key → schick mir (oder speichere sicher)

---

## 📋 PHASE 2: LANDING PAGE + FREE TOOL BUILD

### STEP 3: Next.js Projekt setup
**Was:** Ich erstelle das Grundgerüst
**Action:**
- [ ] Ich mache: Next.js 14 App Router + Tailwind CSS
- [ ] Du machst: NICHTS (warte auf mein Update)

### STEP 4: Landing Page Code
**Was:** Ich code die Landing Page
**Copy:** Bereits fertig in `LANDING-PAGE-COPY-FINAL.md`
**Action:**
- [ ] Ich mache: Hero, Features, Pricing, FAQ Sections
- [ ] Du machst: NICHTS (oder Feedback geben wenn ich zeige)

### STEP 5: Free Link Checker Tool
**Was:** Ich baue das kostenlose Tool
**Spec:** Bereits fertig in `FREE-TOOL-BUILD-SPEC.md`
**Action:**
- [ ] Ich mache: YouTube URL → Links extrahieren → Status checken
- [ ] Du machst: Testen wenn fertig

### STEP 6: Vercel Deployment
**Was:** Tool live schalten
**Action:**
- [ ] Ich mache: Vercel Account + Deployment
- [ ] Du machst: Domain DNS auf Vercel zeigen (ich gebe Anleitung)

### STEP 7: YouTube API Key eintragen
**Was:** API Key in Vercel Environment Variables
**Action:**
- [ ] Du gibst mir: YouTube API Key (aus Step 2)
- [ ] Ich mache: Eintragen in Vercel
- [ ] Test: Free Tool funktioniert live

---

## 📋 PHASE 3: PAYMENT SETUP

### STEP 8: Stripe Account
**Was:** Payment Processing Setup
**Wo:** https://stripe.com/
**Action:**
- [ ] Stripe Account erstellen (kostenlos)
- [ ] Business Details eingeben
- [ ] Bank Account verbinden
- [ ] Kopiere: Secret Key + Publishable Key
- [ ] Schick mir Keys (oder ich helfe beim Setup)

### STEP 9: Early Access Pricing
**Was:** Stripe Produkt anlegen
**Action:**
- [ ] Ich mache: Stripe Product + Price erstellen
  - Product: "LinkGuard Early Access"
  - Price: €10/Monat recurring
  - Alternative: €99/Jahr
- [ ] Du machst: Approve Pricing

### STEP 10: Checkout Integration
**Was:** Payment Flow einbauen
**Action:**
- [ ] Ich mache: Stripe Checkout Flow
- [ ] Button: "Get Early Access" → Stripe Checkout → Success
- [ ] Email wird automatisch gesammelt
- [ ] Du machst: Test-Payment machen (Stripe Test Mode)

---

## 📋 PHASE 4: VALIDATION / OUTREACH

### STEP 11: Email Setup (ConvertKit Free)
**Was:** Email für Follow-ups sammeln
**Wo:** https://convertkit.com/ (free bis 1,000 subscribers)
**Action:**
- [ ] ConvertKit Account erstellen
- [ ] Form erstellen: "Get Early Access"
- [ ] Automation: Welcome Email nach Signup
- [ ] Ich helfe bei Integration (oder du machst selbst)

### STEP 12: Reddit Posts
**Was:** Traffic auf Free Tool + Landing Page
**Wo:** r/YouTube, r/NewTubers, r/Influencer
**Action:**
- [ ] Ich schreibe: Reddit Post Draft (in `VALIDATION-PHASE-START.md`)
- [ ] Du postest: In Subreddits (Karma required)
- [ ] Link: linkguard.io/free-checker

### STEP 13: Twitter Thread
**Was:** Creator Community erreichen
**Action:**
- [ ] Ich schreibe: Twitter Thread Draft
- [ ] Du postest: Auf deinem Twitter (oder ich mache neuen Account)
- [ ] Engagement: Reply auf Creator-Tweets

### STEP 14: Follow-up Emails
**Was:** Free Tool User zu Payments konvertieren
**Action:**
- [ ] Ich schreibe: Email Sequence (3 Emails)
  - Email 1: "You found X broken links"
  - Email 2: "Here's what you're losing"
  - Email 3: "Lock in $10/mo (50% off)"
- [ ] ConvertKit sendet automatisch

---

## 📋 PHASE 5: VALIDATION AUSWERTUNG

### STEP 15: Metrics tracken
**Was:** Daten sammeln
**Metrics:**
- Free Tool Usage (wie viele Checks?)
- Email Signups (wie viele?)
- Pre-Payments (wie viele zahlen?)
**Tool:** Google Analytics ODER Plausible
**Action:**
- [ ] Ich mache: Analytics Setup
- [ ] Du checkst: Dashboard täglich

### STEP 16: GO/NO-GO Entscheidung
**Was:** Nach Outreach Phase entscheiden
**Kriterien:**
- ✅ **≥20 Pre-Payments** → GO (Build MVP)
- ⚠️ **10-19 Pre-Payments** → MAYBE (mehr Marketing?)
- ❌ **<10 Pre-Payments** → NO-GO (Pivot oder Kill)

**Action:**
- [ ] Count Pre-Payments
- [ ] Du entscheidest: Weitermachen oder nicht

---

## 📋 PHASE 6: MVP BUILD (NUR WENN VALIDATION ERFOLGREICH)

### STEP 17: Full App Architecture
**Was:** Richtiges SaaS Backend bauen
**Action:**
- [ ] Ich mache: Supabase Setup (Auth + Database)
- [ ] User Accounts (Login/Signup)
- [ ] Dashboard (Link Management)
- [ ] Daily Monitoring Cron Job
- [ ] Alert System (Email/SMS)

### STEP 18: Platform Integrations
**Was:** YouTube, Instagram, etc. anbinden
**Action:**
- [ ] YouTube API (auto-scan channels)
- [ ] Instagram API (bio links) - falls möglich
- [ ] Generic URL input (für andere Plattformen)

### STEP 19: Beta Launch
**Was:** Early Access User einladen
**Action:**
- [ ] Email an alle Pre-Payment User
- [ ] Beta Access gewähren
- [ ] Onboarding: 1-on-1 Calls
- [ ] Feedback sammeln → Iterate

### STEP 20: Public Launch
**Was:** Product Hunt + Marketing Push
**Action:**
- [ ] Product Hunt Launch
- [ ] Reddit Posts (wieder)
- [ ] Twitter Launch Thread
- [ ] Press Release (optional)

---

## 📊 AKTUELLER STATUS

**Fertig:**
- [x] Research (2h Deep Dive)
- [x] Landing Page Copy geschrieben
- [x] Free Tool Spec geschrieben
- [x] Domain Empfehlungen
- [x] Repo angelegt (`/data/.openclaw/workspace/linkguard/`)

**Als Nächstes (JETZT):**
- [ ] **STEP 1:** Du kaufst Domain
- [ ] **STEP 2:** Du holst YouTube API Key
- [ ] **STEP 3:** Ich baue Next.js Setup + Landing Page
- [ ] **STEP 4-7:** Ich baue Free Tool + Deploy

**Was DU jetzt machen musst:**
1. Domain kaufen (linkguard.io oder Alternative)
2. YouTube API Key holen
3. Schreib mir wenn beides fertig → ich starte Build

**Was ICH dann mache:**
- Landing Page + Free Tool bauen
- Deployment zu Vercel
- DNS Anleitung geben

---

## 🎯 KRITISCHE PFAD

**Was blockiert was:**

```
Domain kaufen (Step 1)
    ↓
YouTube API Key (Step 2)
    ↓
Ich baue Landing Page + Free Tool (Step 3-6)
    ↓
DNS Setup (Step 7)
    ↓
Stripe Setup (Step 8-10)
    ↓
LIVE! → Validation kann starten (Step 11-14)
```

**Bottleneck:** Domain + YouTube API (du musst machen)

---

## ✅ NÄCHSTE ACTIONS (PRIORITÄT)

### FÜR DICH (JETZT):
1. [ ] Domain kaufen → schreib mir welche
2. [ ] YouTube API Key holen → schick mir

### FÜR MICH (DANACH):
3. [ ] Next.js Setup
4. [ ] Landing Page bauen
5. [ ] Free Tool bauen
6. [ ] Vercel Deploy

**Sobald du Steps 1+2 gemacht hast → ich kann loslegen! 🚀**

---

**Repo Path:** `/data/.openclaw/workspace/linkguard/`
**Last Updated:** 2026-02-13 18:05 CET

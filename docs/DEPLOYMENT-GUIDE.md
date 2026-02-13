# DEPLOYMENT GUIDE - WatchMyLinks

## 🚀 Ready to Deploy!

**Status:** Local build complete, ready for Vercel deployment

---

## ✅ WHAT'S DONE:

```
✅ Next.js 14 setup
✅ Landing page built
✅ Free link checker working
✅ YouTube API integrated
✅ Local testing successful (http://localhost:3001)
```

---

## 📋 DEPLOYMENT STEPS:

### STEP 1: Create GitHub Repo (Nico or Echo)

```bash
# On GitHub: Create new repo "watchmylinks"
# Then:
cd /data/.openclaw/workspace/linkguard
git remote add origin https://github.com/YOUR_USERNAME/watchmylinks.git
git branch -M main
git push -u origin main
```

### STEP 2: Vercel Setup

**Go to:** https://vercel.com/

1. **Sign up/Login** (GitHub account recommended)
2. **Import Project:**
   - Click: "Add New" → "Project"
   - Select: GitHub repo "watchmylinks"
   - Click: "Import"

3. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Install Command: `npm install` (default)

4. **Environment Variables:**
   ```
   YOUTUBE_API_KEY = AIzaSyCP2G6cNgjHbWMfWhOorCi3U2TWMybhZKc
   ```
   - Click: "Add" → Paste key
   - Click: "Deploy"

5. **Wait:** 2-3 minutes for build

6. **Done!** Vercel gives you: `watchmylinks.vercel.app`

---

### STEP 3: Connect Custom Domain

**In Vercel Dashboard:**

1. Go to: Project Settings → "Domains"
2. Add: `watchmylinks.app`
3. Add: `www.watchmylinks.app` (optional)

**Vercel will show DNS settings:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

### STEP 4: Update DNS (Nico does this)

**At Namecheap/Hostinger:**

1. Go to: Domain Management → DNS Settings
2. Delete existing A/CNAME records for @ and www
3. Add new records from Vercel:
   ```
   Type: A
   Host: @
   Value: 76.76.21.21
   TTL: Automatic

   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```
4. Save changes
5. Wait: 1-24 hours for DNS propagation (usually 10-30 min)

---

### STEP 5: Verify

**After DNS propagation:**
- Visit: https://watchmylinks.app
- SSL: Automatically activated by Vercel
- Test: Free link checker tool

---

## 🧪 TESTING CHECKLIST:

After deployment, test:

- [ ] Homepage loads (https://watchmylinks.app)
- [ ] Hero section visible
- [ ] Free tool form works
- [ ] Paste YouTube URL (test: https://youtube.com/watch?v=dQw4w9WgXcQ)
- [ ] Click "Scan My Links"
- [ ] Results show (working/broken/redirects)
- [ ] Lost revenue calculation shows
- [ ] CTA buttons work
- [ ] Mobile responsive (test on phone)
- [ ] SSL works (https://)

---

## ⚠️ TROUBLESHOOTING:

**If deployment fails:**
```
1. Check Vercel build logs
2. Verify YOUTUBE_API_KEY is set correctly
3. Check .env.local is NOT committed (it's in .gitignore)
4. Rebuild: Vercel Dashboard → "Redeploy"
```

**If DNS not working:**
```
1. Wait longer (can take 24h max)
2. Check DNS propagation: https://dnschecker.org/
3. Verify records match Vercel's requirements
4. Clear browser cache / try incognito
```

**If API not working:**
```
1. Check Vercel logs: Vercel Dashboard → Logs
2. Verify YouTube API key is correct
3. Check quota: Google Cloud Console → APIs → YouTube Data API v3
```

---

## 📊 POST-DEPLOYMENT:

**After going live:**

1. **Test everything** (use checklist above)
2. **Fix bugs** (if any found)
3. **Soft launch:**
   - Small Reddit comment
   - Monitor for issues
4. **Big launch** (only if stable):
   - Reddit posts
   - Twitter thread
   - Collect pre-payments

---

## 🎯 VALIDATION PHASE:

**Week 1-4 goals:**
- 500+ free tool uses
- 50+ email signups
- **20-50 pre-payments @ $10/mo**

**If ≥20 pre-payments:**
→ BUILD FULL MVP ✅

**If <10 pre-payments:**
→ Iterate or pivot ⚠️

---

**Ready to deploy?** Let's go! 🚀

---

Last Updated: 2026-02-13 20:37 CET

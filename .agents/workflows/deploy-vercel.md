---
description: Deploy services.flexgrafik.nl to Vercel production
---

# Deploy to Vercel — services.flexgrafik.nl

## Prerequisites
- Vercel CLI installed: `npm install -g vercel`
- Logged in: `npx vercel whoami` shows `wozniaknorbert95-del`
- Project linked: `npx vercel link --project flexgrafik-services`

## Steps

1. Follow `build-check.md` first — build must pass
2. Deploy: `npx vercel dist --prod --yes`
3. Verify production URL: `curl -sI https://quietforge.nl/` → HTTP 200
4. Check domain status: `npx vercel domains inspect services.flexgrafik.nl`
5. If DNS not active:
   - In Cyber-Folks panel (ns1.cyberfolks.pl):
     - **A Record**: Host `services` → `76.76.21.21`
     - **OR CNAME**: Host `services` → `cname.vercel-dns.com`
   - Wait 5–60 min for propagation
   - Re-check: `npx vercel domains inspect services.flexgrafik.nl`

## Post-Deploy Verification

```bash
# Production health
curl -sI https://quietforge.nl/ | head -1

# Custom domain (after DNS)
curl -sI https://services.flexgrafik.nl/ | head -1

# Check all routes
curl -s https://quietforge.nl/ | grep -o '<title>.*</title>'
curl -s https://quietforge.nl/inbox-killer/ | grep -o '<title>.*</title>'
curl -s https://quietforge.nl/legal/ | grep -o '<title>.*</title>'
```

## Rollback
If deploy is broken, roll back in Vercel Dashboard: `https://vercel.com/wozniaknorbert95-dels-projects/flexgrafik-services/deployments`

## Acceptance Criteria
- [ ] `npx vercel dist --prod --yes` completes with success
- [ ] Production URL returns HTTP 200
- [ ] Custom domain `services.flexgrafik.nl` resolves (after DNS)
- [ ] All routes render correct `<title>`

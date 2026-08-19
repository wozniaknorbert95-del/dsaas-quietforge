# Handoff — QuietForge canon + S1 IA (2026-08-19)

**Repo:** dsaas-quietforge · **Build:** `npm run typecheck` ✅ · `npm run build` ✅ (49 routes) · **Ship:** `main` → Vercel

## Cel / Goal

Lock identity from `kim jestem`, land tenant canon, LinkedIn paste pack, and S1 public IA (Home + systems + 301) on the current Vercel host. No production deploy. No LinkedIn login.

## Co zrobiono / What changed

- Canon: identity, objections, business plan v1.1, site map v2, LinkedIn pack
- Tenant JSON: industry `smb-operating-systems`, scan €690, hours counter 0
- Removed FlexGrafik “live proof” from chrome and JSON-LD
- New routes: `/systems`, 6 spokes, `/approach`, `/security`, `/proof`, `/book-a-scan`
- 301s in `next.config.ts` from old `/solutions` `/results` `/trust` `/book-discovery`
- LinkedIn strategy v3.1 marked SUPERSEDED; cadence PARKED

## Pliki / Files

| File | Action |
|------|--------|
| `docs/canon/*` | new |
| `tenant-config/*` | update |
| `src/lib/constants.ts` | rewrite routes + social |
| `src/content/systems-catalog.ts` | new |
| `src/app/page.tsx` | rewrite home |
| `src/app/systems/**` | new |
| `next.config.ts` | 301 map |
| `docs/strategy/linkedin/*` | superseded banners |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass
```

## Post-deploy smoke (Commander)

- https://quietforge.flexgrafik.nl/ — H1 “Systems that give you back your time.”
- /systems/quote-order-engine/ exists
- /book-discovery/ → /book-a-scan/
- /trust/ → /security/
- Footer has no “live proof”
- Counter shows 0 hours

## Next steps

- S2: pricing page aligned to Scan €690 / from €2 500 / from €300
- S3: full RODO form + legal EN
- Commander: paste LinkedIn pack; do not start posting cadence
- Own domain deferred; host stays quietforge.flexgrafik.nl

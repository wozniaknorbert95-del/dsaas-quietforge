# Handoff — SMB Clarity W2 polish (2026-09-16)

**Repo:** dsaas-quietforge · **Build:** typecheck ✅ · build ✅ (57 routes)

## Cel

Second pass on external AUDIT.txt after W1: only high-ROI items still missing, canon-safe, minimal diff.

## Audit filter (what we took vs skipped)

| Audit item | Action |
|------------|--------|
| Hero clarity + HITL higher | ✅ `hitlLine` above CTA |
| Dual brand “QuietForge sells / FlexGrafik runs” | ✅ proof strip |
| 3 pain bullets before systems | ✅ `HOME_SYSTEMS_PAINS` |
| Pricing “for who” | ✅ scan/build/care one-liners on home |
| Founder + KVK + location | ✅ About home + footer trust line |
| FAQ CRM / EU / VPS | ✅ VPS added (W1 had CRM+EU) |
| Sample scan visible | ✅ approach + final CTA with GA location |
| OG home stale | ✅ `public/og/home.svg` |
| NL locale, SEO landings, fake client cases | ❌ defer (canon) |
| €290 pricing from audit | ❌ ignore — Scan €690 SSoT |
| Full /security rewrite | ❌ defer |

## Files

| File | Change |
|------|--------|
| `src/content/conversion-copy.ts` | hitlLine, dual brand, pains, for-who, footer trust |
| `src/app/page.tsx` | hero HITL, pains, about, pricing, FAQ, sample locations |
| `src/app/globals.css` | `.qf-hero-hitl` |
| `src/components/Footer.tsx` | trust line |
| `src/components/analytics/SampleScanLink.tsx` | `location` prop |
| `public/og/home.svg` | new hero OG copy |

## Verification

```bash
npm run typecheck && npm run build
```

## Post-deploy smoke

- `/` — HITL line visible above Book CTA
- Footer — Rotterdam · KVK · EN/NL
- Systems — 3 pain bullets + 3 cards
- Pricing cards — “for who” lines

## Next

14-day GA4 on `cta_book_map_click` / `intake_submit`. If flat → one hero string iteration only.

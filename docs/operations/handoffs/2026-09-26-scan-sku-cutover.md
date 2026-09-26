# Handoff — Scan SKU cutover (2026-09-26)

**Repo:** dsaas-quietforge · **Commit:** `86b080d` on `main` · **Build:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors) · `npm run build` ✅ (57 routes, sitemap 28)

**Deploy:** `dpl_6t93ujLib1SUYVKeurMJAdpm1enW` · `flexgrafik-services` Production (CLI promote; Git CD left the domain on a 10-day-old Production until promote)

**Live:** https://quietforge.flexgrafik.nl/

## Cel / Goal

Replace public Offer A (Automation Scan €690 / 90 min workshop) with Hours Engine Scan SKUs from tenant SSoT: Hours €149 / Both-lanes €290 / Decision €490 excl. VAT. Offer B and C unchanged. Polish, commit, push `main` → Vercel CD.

## Co zrobiono / What changed

- New content SSoT [`src/content/scan.ts`](../../src/content/scan.ts): three SKUs, VAT 21%, evidence labels, tools, credit 30 days, `eyebrow` + `scanVatLine`.
- Money pages rewritten: home, `/pricing/`, `/book-a-scan/`, `/approach/` + OG.
- Intake carries `skuId`; WhatsApp and Mollie description use the selected SKU. Form still requests a payment link (SR-18).
- Book SKU picker: visible radios, 44px tap target, no duplicated names, VAT line without repeating net.
- Honesty: no public €690, no 90-min engine, no payback-in-weeks, no €80/h as scan math. Sample PDF rewritten as illustration with labels. Seven blog closers retargeted to Book a scan.
- Canon: site-map CTA, conversion-pipeline L3, marketing-strategy, MR-08 (€149), scan delivery runbook, LinkedIn paste pack (no publish).

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/scan.ts` | new SSoT |
| `src/components/scan/BookScanIntake.tsx` | SKU picker + WhatsApp + form |
| `src/content/pricing.ts` | Hours/Both/Decision numbers |
| `src/content/conversion-copy.ts` | hero meta, PUBLIC_OFFER |
| `src/app/page.tsx` | home scan copy + CTA |
| `src/app/pricing/page.tsx` | three scan cards |
| `src/app/book-a-scan/page.tsx` | rewrite |
| `src/app/approach/page.tsx` | rewrite |
| `src/app/book-discovery/BookDiscoveryForm.tsx` | `skuId` |
| `src/app/api/intake/route.ts` + `src/lib/email.ts` | SKU in payload/mail |
| `src/lib/constants.ts` + `src/lib/mollie.ts` | WhatsApp / payment amount |
| `src/app/blog/posts/*.mdx` | 7 closers: Book a scan, no 90-min Map |
| `public/og/approach.svg` + `book-discovery.svg` + `pricing.svg` | OG |
| `public/artefacts/automation-map-sample.md` + PDF | illustration Hours Scan |
| `docs/canon/site-map.md` + conversion-pipeline + MR-08 + runbook | canon |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run lint        # 0 errors (10 pre-existing warnings)
npm run build       # pass (57 routes)
rg '\[FILL:' src/   # 0 matches
rg '€690|90-minute|Book Automation Map' src/ --glob '*.{ts,tsx,mdx}'  # 0 in public copy
```

Browser (localhost:3000 production server after rebuild):

- Home: hero `from €149 excl. VAT · credited 30d`; pricing card Hours/Both/Decision; B/C unchanged.
- `/pricing/`: three SKU cards with net + `excl. VAT · incl. 21% VAT`; Core/Scale/Command and Keep/Grow/Unlock unchanged.
- `/book-a-scan/`: Hours default; click Decision radio → form `Requesting: Decision Scan · €490 excl. VAT`. No checkout UI.
- `/approach/`: eyebrows Start here / Two work files / GO / PARK / NO; no “dearer SKU”.

## Post-deploy smoke (live)

1. Home hero — `Book a scan from €149 excl. VAT · credited 30d`. Pricing card Hours/Both/Decision. B/C unchanged.
2. `/pricing/` three scan cards with net + incl. VAT; Core/Scale/Command and Keep/Grow/Unlock unchanged.
3. `/book-a-scan/` Hours default; Decision radio → form `Requesting: Decision Scan · €490 excl. VAT`.
4. `/approach/` eyebrows Start here / Two work files / GO / PARK / NO.
5. Domain aliases on this deploy: `quietforge.flexgrafik.nl` + `services.flexgrafik.nl`.

## Następny krok / Next steps

- Runtime job Scan Measure remains a separate platform issue.
- LinkedIn paste pack updated; live cadence still PARKED (tool-first).
- Optional: enable Production Git deployments on `flexgrafik-services` so the next `main` push does not require `vercel promote`.

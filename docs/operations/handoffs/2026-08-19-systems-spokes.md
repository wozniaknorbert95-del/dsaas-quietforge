# Handoff — Systems spokes rebuild (2026-08-19)

**Repo:** quietforge.flexgrafik.nl · **Build:** `npm run typecheck` + `npm run build` ✅ (49 routes)

## Cel / Goal

Sześć stron `/systems/[slug]` było szkieletem. Przebudowa na treść z lab (bez FlexGrafik jako sukcesu rynkowego, bez wymyślonych klientów). Deploy na `main` → Vercel prod.

## Co zrobiono / What changed

- `SystemRecord` + 6 rekordów: TL;DR, labelled cost-of-inaction, composite firm, 6–10 features, FAQ „when NOT”, ROI €40/h
- Szablon B1–B10: TLDRBox, CostOfInaction, ExampleCompany, FeatureGallery, FlowDiagram + WhatsApp CTA
- Czyste SVG w `public/systems/` (gratka zostawiona — za dużo żargonu / stara tożsamość)
- Evidence sheets + OPEN-QUESTIONS (brak PNG w `public/gratka/`)
- `formatEuro` → `€2,500` (`en-US` comma thousands)
- Status: quote/inbox/scout/cockpit = `PROVEN IN THE LAB`; gate + release = `NEW ON THE PLATFORM`

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/systems-catalog.ts` | rewrite |
| `src/app/systems/[slug]/page.tsx` | rewrite B1–B10 |
| `src/components/v2/{TLDRBox,CostOfInaction,ExampleCompany,FeatureGallery,FlowDiagram}.tsx` | new |
| `src/app/globals.css` | `.qf-sys-*` / `.qf-tldr` / `.qf-cost-*` / `.qf-feature-*` |
| `src/content/pricing.ts` | `formatEuro` |
| `public/systems/*-flow.svg` | new (6) |
| `docs/canon/systems-evidence/` | new |
| `docs/canon/site-map.md` | spoke template B1–B10 |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (49 routes)
# banned words (HITL/Jadzia/DSAAS/VCMS/KODA/AI-powered/seamless) — 0 in new catalog, spoke, public/systems
```

## Post-deploy smoke (Dowódca)

1. https://quietforge.flexgrafik.nl/systems/quote-order-engine/ — TL;DR above fold, Van Dijk footnote, WhatsApp
2. …/inbox-triage/ — 142 msgs labelled Lab measurement, no auto-send
3. …/lead-scout/ — no PNG 404, composite StadLicht
4. …/owner-cockpit/ — no Jadzia/COI in copy or SVG
5. …/publishing-gate/ — NEW ON THE PLATFORM, no VCMS
6. …/build-release-flow/ — specialist steps, not “agents”
7. Currency on `/pricing/` still `€2,500` not `€2.500`

## Następny krok / Next steps

- LinkedIn nadal PARKED
- Telegram approval — nie na spoke (OPEN-QUESTIONS)
- PNG gallery z `proof.ts` nie publikować aż pliki będą w `public/gratka/`

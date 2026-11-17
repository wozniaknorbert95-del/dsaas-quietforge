# Handoff — Four doors → demo previews (2026-11-17)

**Repo:** quietforge.flexgrafik.nl (dsaas-quietforge) · **Build:** `npm run build` ✅ (62 static pages, sitemap 33 routes) · **Branch:** `strona-sprzatanie` (commit only — push/PR/deploy = Dowódca)

## Cel / Goal
Enable potential clients to *see* what was built for FlexGrafik: each "Four doors" tile on `/results/flexgrafik/` now shows a real tool screenshot that leads to a sales-led demo preview page under `/lab/` (decision D9: demos = `/lab/` subpages, no subdomain). Copy direction (Commander, this session): sales-first, plain language, technical detail only where it builds trust — this proof exists to inspire viewers to consider a build for their own company.

## Co zrobiono / What changed
- **4 new demo routes**: `/lab/portal/`, `/lab/wizard/`, `/lab/game/`, `/lab/inspire/` — one shared layout (`DoorDemoPreview`): outcome hero → real screens → "What this changes in your company" (3 intent-coloured benefits) → "How this lands in your company" (scan → build → you stay in control) → scan CTA + one honest boundary line. Arc: Problem → System → Effect (MR-05), labels DEMO only (MR-13), numbers from `proof.ts` only (MR-14).
- **Four doors tiles reworked**: clickable screenshot (proof-manifest screen) → demo page, chip `DEMO`, ghost CTA "See it in action →", sales-led body copy. Honest per-tile status line kept ("Offline — coming back").
- **Content SSoT**: all demo copy in `src/content/lab-demos.ts` (traceable, proof-check friendly).
- **New routes registered**: sitemap script (33 routes), `site-map.md` §5, OG images ×4 (`scripts/generate-og.mjs`).

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/lab-demos.ts` | new — demo page copy SSoT (sales-led) |
| `src/components/lab/DoorDemoPreview.tsx` | new — shared demo page layout |
| `src/app/lab/{portal,wizard,game,inspire}/page.tsx` | new ×4 — thin routes + metadata |
| `src/content/flexgrafik-company-case.ts` | update — `CompanyDoor` + demoHref/demoLabel/screenKey, sales bodies, doorsLead/demoChip |
| `src/app/results/flexgrafik/page.tsx` | update — tiles: clickable screen → demo, CTA, chip |
| `src/lib/constants.ts` | update — 4 demo routes in `ROUTES` |
| `src/app/globals.css` | update — `qf-fg-door-shot`, `qf-demo-*` classes (tokens only, no inline) |
| `scripts/generate-sitemap.mjs` | update — 4 routes registered |
| `public/sitemap.xml` | regenerated (33 routes) |
| `public/og/lab-{portal,wizard,game,inspire}.svg` | new — OG 1200×630 |
| `docs/strategy/site-map.md` | update — §5 route map |

## Weryfikacja / Verification
```bash
npm run typecheck        # pass
npm run lint             # 0 errors (10 pre-existing warnings, files untouched)
npm run build            # pass — 62 static pages; /lab/{portal,wizard,game,inspire} prerendered
npm run generate:sitemap # 33 routes, 4 new in sitemap.xml
postbuild check-links    # 0 broken internal links
grep '[FILL' src/        # 0 placeholders (1 pre-existing comment in proof.ts)
```

## Post-deploy smoke (Dowódca)
1. `/results/flexgrafik/` → 4 tiles show screenshots; click any → correct `/lab/...` demo page (no 404).
2. Each `/lab/<door>/` renders H1 + screens + benefits + scan CTA; OG preview when shared (og/lab-*.svg).
3. Mobile 375px: no horizontal scroll on tiles and demo pages.
4. `node scripts/check-links.mjs` after deploy — 0 broken.

## Następny krok / Next steps
- **Claim do zatwierdzenia (MR-16):** "typical build lands 2–4 weeks after the scan" — owner-stated delivery window (źródło: mapa/SoT). Zostawić, złagodzić czy usunąć — Twoja decyzja przed publikacją.
- **"Three walks" section** — ten sam treatment (screen + demo link) jako osobna sesja, jeśli chcesz.
- **Status LIVE:** gdy flexgrafik.nl wraca — pola `href`/`hrefLabel` w `FLEXGRAFIK_DOORS` są gotowe na linki do żywych powierzchni.
- **Decyzja domenowa:** `SITE_URL` w `constants.ts` = `quietforge.flexgrafik.nl`, a operujesz na `quietforge.nl` — ustalić przed deployem (wpływa na canonical/OG/sitemap).
- **Push/PR:** commit na `strona-sprzatanie`; push + merge do master (auto-deploy Vercel) = ręczny krok Dowódcy (Zasada 11).

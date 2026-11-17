# Handoff — Four doors → demo previews + deploy (2026-11-17)

**Repo:** quietforge.nl (dsaas-quietforge) · **Build:** `npm run build` ✅ (static export `out/`, sitemap 33 routes) · **Deployed:** 2026-11-17, Cloudflare Pages CI on `main` (per `MIG-30-PAGES-RUNBOOK.md`)

## Cel / Goal
Enable potential clients to *see* what was built for FlexGrafik: each "Four doors" tile on `/results/flexgrafik/` shows a real tool screenshot leading to a sales-led demo preview under `/lab/` (decision D9: demos = `/lab/` subpages, no subdomain). Copy direction (Commander): sales-first, plain language — the proof exists to inspire viewers to consider a build for their own company. Then: polish details and deploy comprehensively (explicit Commander order).

## Co zrobiono / What changed
- **4 demo routes live**: `/lab/portal/`, `/lab/wizard/`, `/lab/game/`, `/lab/inspire/` — shared layout `DoorDemoPreview`: outcome hero → real screens → "What this changes in your company" (intent-coloured benefits) → "How this lands in your company" (scan → build → you stay in control) → scan CTA + one honest boundary line. Arc Problem → System → Effect (MR-05); tier DEMO (MR-13); numbers from `proof.ts` only (MR-14).
- **Four doors tiles**: clickable proof-manifest screenshot → demo page, chip `DEMO`, CTA "See it in action →", sales-led bodies. Honest per-tile status line kept.
- **Detail polish**: OG generator wraps titles on word boundaries (42-char slice cut mid-word) + footer `quietforge.nl`; shot frames get `--qf-radius`; graceful-empty fallback keeps frame border only; `meta.title` without doubled `| Quietforge` suffix (layout template appends); `audit:links` → `quietforge.nl`.
- **Domain truth**: `quietforge.nl` = live on Cloudflare Pages (HTTP 200 verified); `quietforge.flexgrafik.nl` dead. `brain.md` deploy section rewritten (was stale Vercel) per MIG-30 runbook: production branch `main`, artifact `out/`, rollback via Pages.
- **Landing on `main`**: 3 commits cherry-picked onto `origin/main` (PR #9/#10/#11 content preserved; PR #10 already had the SITE_URL fix — cherry-pick duplicated harmlessly). Stale `.next/` cache (deleted API route types) cleared before gate.

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/lab-demos.ts` | new — demo copy SSoT (sales-led) |
| `src/components/lab/DoorDemoPreview.tsx` | new — shared demo page layout |
| `src/app/lab/{portal,wizard,game,inspire}/page.tsx` | new ×4 — thin routes + metadata |
| `src/content/flexgrafik-company-case.ts` | update — `CompanyDoor` demoHref/demoLabel/screenKey, sales bodies, doorsLead/demoChip |
| `src/app/results/flexgrafik/page.tsx` | update — tiles: clickable screen → demo, CTA, chip |
| `src/lib/constants.ts` | update — 4 demo routes in `ROUTES` |
| `src/app/globals.css` | update — `qf-fg-door-shot`, `qf-demo-*` (tokens only) |
| `scripts/generate-og.mjs` | update — title wrap (no mid-word cuts), footer `quietforge.nl` |
| `scripts/generate-sitemap.mjs` | update — 4 routes registered |
| `public/robots.txt` / `public/sitemap.xml` | update — `quietforge.nl` base, 33 routes |
| `public/og/lab-{portal,wizard,game,inspire}.svg` | new — OG 1200×630 |
| `docs/strategy/site-map.md` | update — §5 route map |
| `brain.md` | update — Cloudflare Pages deploy truth (MIG-30) |
| `package.json` | update — `audit:links` → `quietforge.nl` |

## Weryfikacja / Verification
```bash
npm run typecheck        # pass (after clearing stale .next/)
npm run lint             # 0 errors (10 pre-existing warnings, untouched files)
npm run build            # pass — static export, 0 broken internal links (postbuild check-links)
npm run generate:sitemap # 33 routes incl. 4 demo routes
grep '[FILL' src/        # 0 placeholders
```

**Live smoke (2026-11-17, post-deploy):** `quietforge.nl/lab/{portal,wizard,game,inspire}/` render full demo pages (screens, benefits, CTA, canonical `quietforge.nl`, OG images) · `/sitemap.xml` 33 routes on `quietforge.nl` · `/robots.txt` OK · `/og/lab-portal.svg` with wrapped title. Defect found in smoke (doubled `| Quietforge` in titles) — fixed, second push deployed.

## Post-deploy smoke (Dowódca — do weryfikacji wzrokowej)
1. `/results/flexgrafik/` → 4 tiles: screen → demo page (desktop + mobile 375px).
2. Udostępnienie linka (LinkedIn/WhatsApp) → podgląd OG z nowym obrazem.
3. `npm run lighthouse:ci` — cel A11y ≥95 / Perf ≥85.

## Następny krok / Next steps
- **Claim do zatwierdzenia (MR-16):** "typical build lands 2–4 weeks after the scan" — owner-stated delivery window (mapa/SoT). Zostawić / złagodzić / usunąć — Twoja decyzja.
- **Domain sweep (follow-up):** stare `quietforge.flexgrafik.nl` zostaje w docs/canony, `.cursorrules`, `public/systems/*.svg`, `config/ga4-quietforge.ids.json` (stream URL — zmiana też w GA4), `vercel.json` (resztki Vercel).
- **"Three walks" section** — ten sam treatment (screen + demo link), osobna sesja.
- **Status LIVE:** gdy flexgrafik.nl wraca — pola `href`/`hrefLabel` w `FLEXGRAFIK_DOORS` gotowe na linki do żywych powierzchni.
- **Rollback gdyby coś:** Pages → Rollback deployment (poprzedni commit `fb5ceae`).

# Handoff — Chrome last-mile + polish plan (2026-09-26)

**Repo:** dsaas-quietforge · **Build:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors, 10 pre-existing warnings) · `npm run build` ✅ (58 routes)

**Commits:** `47b6c45` (fix) · `8e7463b` (ops docs) on `main`

**Deploy:** `dpl_4RdKJYtwhyw2kLWcDFSoNUWnSsku` · Production (CLI promote Preview `3scf4ooke`)

**Live:** https://quietforge.flexgrafik.nl/

## Cel / Goal

Zweryfikować slim footer na live, naprawić intercept sticky CTA na mobile, domknąć microcopy stopki i spisać plan polerki home/chrome (S1–S5) bez powrotu katalogu w footerze.

## Co zrobiono / What changed

- **Sticky:** chowa się, gdy footer wchodzi w strefę nad barem (`IntersectionObserver`, `rootMargin` −76px); style w `qf-sticky-*`.
- **Footer:** `Scan sample (PDF)` (SSoT + artefakt link bez `↓`); Lab link `nowrap`.
- **Social:** WhatsApp = brand glyph (SVG), listy w `qf-social-*`.
- **Ops:** plan [`2026-09-26-chrome-polish.md`](../plans/2026-09-26-chrome-polish.md) (Session 0 shipped; S1–S5 queued); SESSION-ANCHOR → DEPLOYED.
- **Nie w tej sesji:** treść PDF sample — zrobiona wcześniej w [`2026-09-26-scan-buyer-education.md`](2026-09-26-scan-buyer-education.md) (4h/€160 Measured vs waiting €0).

## Pliki / Files

| File | Action |
|------|--------|
| `src/components/layout/StickyCta.tsx` | footer-aware hide; `qf-sticky-*` |
| `src/app/globals.css` | sticky + social tokens; Lab nowrap |
| `src/lib/navigation.ts` | Scan sample (PDF) label |
| `src/components/FooterArtefactLinks.tsx` | label from SSoT; no `↓` |
| `src/components/ui/SocialLinks.tsx` | WhatsApp SVG; `qf-social-*` |
| `docs/operations/plans/2026-09-26-chrome-polish.md` | new |
| `docs/operations/SESSION-ANCHOR.md` | DEPLOYED pointer |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run lint        # 0 errors, 10 pre-existing warnings
npm run build       # pass (58 routes)
rg '\[FILL:' src/   # 0 matches
node scripts/audit-menu-footer.mjs https://quietforge.flexgrafik.nl  # PASS, 11 links
```

CTA canon: `Book a scan` via `CTAS.bookAutomationMap` — do not revert skill text „Book Automation Map”.

## Post-deploy smoke (Dowódca)

1. Home @390: scroll to footer — **Quick actions** znika; **Privacy & terms** + **Scan sample (PDF)** tappable.
2. `/legal/` H1 Legal & Privacy; PDF `/artefacts/automation-map-sample.pdf` 200.
3. Footer: 11 links, no system catalog; Lab ×1; LI + WA only.
4. Optional: `node scripts/audit-404s.mjs` — failed routes = [].

## Następny krok / Next steps

- **S1** cookie vs sticky (first visit @390) — [`2026-09-26-chrome-polish.md`](../plans/2026-09-26-chrome-polish.md) §S1.
- **S2–S5** home density (FAQ 13→7, Evidence ×6, WA/arrow canon, „Automation Scan” copy cleanup).
- LinkedIn live **PARKED** (tool-first). Hours counter stays **0**. FlexGrafik ≠ client case.

# Handoff — Footer last-mile + chrome polish plan (2026-09-26)

**Repo:** dsaas-quietforge · **Commit:** `47b6c45` on `main` · **Build:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors, 10 pre-existing warnings) · `npm run build` ✅ (58 routes)

**Deploy:** `dpl_4RdKJYtwhyw2kLWcDFSoNUWnSsku` · Production (CLI promote of Preview `3scf4ooke`)

**Live:** https://quietforge.flexgrafik.nl/

**Live audit:** `node scripts/audit-menu-footer.mjs https://quietforge.flexgrafik.nl` → **PASS** (11 footer links, Scan sample (PDF))

**Plan (next sessions):** [`docs/operations/plans/2026-09-26-chrome-polish.md`](../plans/2026-09-26-chrome-polish.md)

## Cel / Goal

Zweryfikować slim footer na live, domknąć ostatnie szlify chrome (klik w legal), spisać plan dalszej polerki bez wracania katalogu.

## Live verify (Production, przed szlifem)

- Footer 11 linków. Brak katalogu. Privacy → `/legal/` 200. Sample PDF 200. Lab ×1.
- **Bug:** na ~390px sticky CTA (`qf-sticky-cta`, z-40) przejmuje klik w Privacy & terms.

## Co zrobiono / What changed (lokalnie)

- Sticky chowa się, gdy footer wchodzi w strefę nad barem.
- `Scan sample (PDF)` bez `↓`. Lab `nowrap`. WhatsApp = glyph, nie MessageCircle.
- Sticky + social wyciągnięte do `qf-*`. Extra padding pod sticky usunięty (observer wystarcza).
- Plan S1–S5: cookie vs sticky, FAQ 13→7, Evidence ×6, WhatsApp/strzałki, „Automation Scan” leftover.

## Pliki / Files

| File | Action |
|------|--------|
| `src/components/layout/StickyCta.tsx` | hide on footer intersect; `qf-sticky-*` |
| `src/app/globals.css` | sticky/social tokens; Lab nowrap |
| `src/lib/navigation.ts` | Scan sample (PDF) |
| `src/components/FooterArtefactLinks.tsx` | drop `↓` + hover util |
| `src/components/ui/SocialLinks.tsx` | WhatsApp SVG; `qf-social-*` |
| `docs/operations/plans/2026-09-26-chrome-polish.md` | new |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run lint        # 0 errors, 10 pre-existing warnings
npm run build       # pass (58 routes)
```

Copy-polish: glued-copy 0. CTA source remains `Book a scan` (skill “Book Automation Map” is stale — do not revert).

Local + live audit PASS. Footer label **Scan sample (PDF)** on production.

## Post-deploy smoke (Dowódca)

1. Home @390: scroll to footer — Quick actions znika; Privacy & terms i Scan sample (PDF) tappable.
2. Lab link nie łamie się na dwie linie.
3. WhatsApp ikona = bubble w stopce.
4. `node scripts/audit-404s.mjs` — opcjonalnie pełny crawl.

## Następny krok

- S1 cookie vs sticky (plan §S1).
- LinkedIn live PARKED. Hours counter 0.

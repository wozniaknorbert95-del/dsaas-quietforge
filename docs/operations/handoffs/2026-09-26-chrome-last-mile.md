# Handoff — Footer last-mile + chrome polish plan (2026-09-26)

**Repo:** dsaas-quietforge · **Status:** LOCAL READY (not promoted) · **Build:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors, 10 pre-existing warnings) · `npm run build` ✅ (58 routes)

**Live (still previous):** `5fa1676` / `dpl_4a6mpeDDu3MTGqBf8wGLkzb1VG8V` until Commander GO + `vercel promote`

**Plan:** [`docs/operations/plans/2026-09-26-chrome-polish.md`](../plans/2026-09-26-chrome-polish.md)

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

Local: `node scripts/audit-menu-footer.mjs http://localhost:3000` → **PASS** (11 links, Scan sample (PDF)). Privacy & terms at footer → `/legal/` (no sticky intercept). Live still intercepts until GO + promote.

## Post-deploy smoke (after GO)

1. Home @390: scroll to footer — Quick actions znika; Privacy & terms i Scan sample (PDF) tappable.
2. Lab link nie łamie się na dwie linie.
3. WhatsApp ikona = bubble, nie kółko czatu.
4. Audit `node scripts/audit-menu-footer.mjs` nadal ≤12.

## Następny krok

- **GO** commit + push `main` + `vercel promote` (Git CD często zostawia stary Production alias).
- Potem S1 cookie vs sticky — osobna sesja.
- LinkedIn live PARKED. Hours counter 0.

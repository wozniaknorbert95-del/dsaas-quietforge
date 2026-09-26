# Handoff — Footer calm (2026-09-26)

**Repo:** dsaas-quietforge · **Commit:** `5fa1676` on `main` · **Build:** `npm run typecheck` ✅ · `npm run lint` ✅ (0 errors, 10 pre-existing warnings) · `npm run build` ✅ (58 routes)

**Deploy:** `dpl_4a6mpeDDu3MTGqBf8wGLkzb1VG8V` · Production (CLI promote of Preview `q39hfa2dm`)

**Live:** https://quietforge.flexgrafik.nl/

**Local audit:** `node scripts/audit-menu-footer.mjs http://localhost:3000` → **PASS** (11 footer links, budget 12)

## Cel / Goal

Stopka zamyka stronę. Nie jest drugim sitemapem. ICP: właściciel 3–15, jeden L3, trust, legal.

## Co zrobiono / What changed

- Footer 29 → **11** linków. Zero katalogu 9 systemów.
- Company: About · Proof · Blog. Lab **raz** (zdanie platformy).
- Privacy & terms (jedno `/legal/`). Scan sample only. GitHub poza chrome (zostaje na About).
- Marka: jeden lockup (ośmiornica + wordmark) → home.
- Mobile: extra padding, copyright nad sticky CTA.
- Canon Global chrome + historical §10 STALE. Audit ma budżet ≤12 i listę zakazów.

## Pliki / Files

| File | Action |
|------|--------|
| `src/components/Footer.tsx` | slim 2-band |
| `src/lib/navigation.ts` | SSoT, no catalog |
| `src/content/conversion-copy.ts` | drop column labels |
| `src/components/ui/SocialLinks.tsx` | `icons` filter |
| `src/app/globals.css` | `qf-footer-*` |
| `scripts/audit-menu-footer.mjs` | budget + forbidden |
| `docs/canon/site-map.md` | footer spec |
| `docs/strategy/site-map.md` | §10 historical |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run lint        # 0 errors
npm run build       # pass (58 routes)
node scripts/audit-menu-footer.mjs http://localhost:3000  # PASS, 11 links
```

Desktop: close, not catalog. Mobile 390: Lab + © visible above sticky.

## Post-deploy smoke (Dowódca)

1. Live footer: no Quote & Order Engine / Custom AI Agent list.
2. LinkedIn + WhatsApp only (no GitHub icon).
3. Privacy & terms → `/legal/`. Scan sample PDF 200.
4. Builder’s Lab → once, `/lab/`.
5. If Git CD Preview-only: `vercel promote` on `flexgrafik-services`.

## Następny krok

- Cookie banner / sticky CTA = osobna sesja.
- LinkedIn live nadal PARKED.

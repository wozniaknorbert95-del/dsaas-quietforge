# SESSION-ANCHOR — Live Session Pointer

**Updated:** 2026-08-30 · **Status:** DEPLOYED ✅ (Vercel prod, dpl_Hi6FJHDuhNBcJyCB1LRwL9CzZf26) · 56 pages, sitemap 27 routes

**Canon:** `docs/strategy/site-map.md` §3 v7.0 (home order live) · `docs/strategy/conversion-pipeline.md` v3.0 (ceny €690, eventy §10)

**Handoff:** [`handoffs/2026-08-30-conversion-plan-implementation.md`](handoffs/2026-08-30-conversion-plan-implementation.md)

## CO

Zaimplementowano plan optymalizacji konwersji (audyt 2026-08-30) — wszystkie 7 todos:
- **P0 GDPR:** Consent Mode v2 + banner cookie + checkbox zgody (client+server) + /legal/ (DPA, cookies, company, retention, usunięty Calendly).
- **P0 Proof:** próbka raportu PDF + 3 bullety „what you get" + credit line na /book-a-scan/ (oraz pricing + final CTA).
- **P0 Docs:** sync €290 → €690 w conversion-pipeline + site-map; Care €300/mo.
- **P1 Home:** hero CTA w 1. viewporcie (mobile), 4 flagowce + „See all 9 systems", rename wariantów Core/Scale/Command + Keep/Grow/Unlock, framing licznika + spots tracker.
- **P1 Analytics:** eventy form_error/payment_link_click/sample_scan_download/system_page_view/whatsapp_prefill_selected, UTM na WhatsApp, spec dashboardu Looker Studio (§10.3).
- **P1 Tech:** security headers (CSP/XCTO/XFO/Referrer/Permissions) + JSON-LD (FAQPage home, Service/Offer systemy).
- **P2:** A/B WhatsApp pain-picker, start programu referencyjnego (5 spots tracker), wpis blogowy `quote-to-order-automation`.

**Audyt diagramów + deploy (ostatnia sesja):**
- **Wykryto:** 6 z 9 diagramów systemów miało uszkodzony em-dash (U+0014 zamiast `—` → tofu w przeglądarce); `owner-cockpit` miał `’` zamiast `→`, `publishing-gate` backticks zamiast `·`.
- **Naprawa:** wszystkie 9 SVG czyste (em-dash `—`, brak znaków kontrolnych); skrypt naprawczy `scripts/fix-flow-svgs.cjs`.
- **Weryfikacja:** build ✅ (56 stron), 9/9 SVG 200 na produkcji bez znaków kontrolnych, nagłówki security aktywne.
- **Deploy:** `npx vercel --prod --project flexgrafik-services` → **READY**, alias `https://services.flexgrafik.nl` (live: `quietforge.flexgrafik.nl`).

Public offer: Scan €690 credited · Core €2,500 / Scale €4,500* / Command €7,900 · Keep €300 / Grow €600* / Unlock €1,000/mo.

## DECYZJE (veta Dowódcy)

D1 eyebrow hero = lock („Conversion systems architect…”); D2 slots+#reference współistnieją; D3 Blog w footerze; D4 bez portretu; D5 KVK 89057554; OG ośmiornica = decyzja otwarta.

## NASTĘPNY KROK

1. **Dowódca: post-deploy smoke** — banner cookie + mobile fold na telefonie; diagramy systemów (9/9) wizualnie.
2. **Looker Studio dashboard** — zbudować wg `conversion-pipeline.md` §10.3 (7 kart, GA4 connector).
3. Po baseline: testy P3 (A/B cen, B-8 sticky timing, B-1 /pl/ decyzja strategiczna).
4. Decyzja o usunięciu artefaktu projektu Vercel `dsaas-quietforge` (błędny projekt z pierwszego deployu).

---

*Maintainer: update at end of every session*

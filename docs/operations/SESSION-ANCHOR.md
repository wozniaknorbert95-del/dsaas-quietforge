# SESSION-ANCHOR — Live Session Pointer

**Updated:** 2026-08-30 · **Status:** Implementation complete, NOT deployed (manual Vercel step by Dowódca) · Plan conversion audit zaimplementowany end-to-end; build ✅ 55 pages

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

Public offer: Scan €690 credited · Core €2,500 / Scale €4,500* / Command €7,900 · Keep €300 / Grow €600* / Unlock €1,000/mo.

## DECYZJE (veta Dowódcy)

D1 eyebrow hero = lock („Conversion systems architect…”); D2 slots+#reference współistnieją; D3 Blog w footerze; D4 bez portretu; D5 KVK 89057554; OG ośmiornica = decyzja otwarta.

## NASTĘPNY KROK

1. **Dowódca: deploy** — `npx vercel --prod --project flexgrafik-services --yes` (uważać: nie tworzyć nowego projektu; domena = `flexgrafik-services`).
2. Post-deploy smoke wg handoff (nagłówki, mobile fold, banner cookie, /blog/quote-to-order-automation/).
3. **Looker Studio dashboard** — zbudować wg `conversion-pipeline.md` §10.3 (7 kart, GA4 connector).
4. Po baseline: testy P3 (A/B cen, B-8 sticky timing, B-1 /pl/ decyzja strategiczna).
5. Decyzja o usunięciu artefaktu projektu Vercel `dsaas-quietforge` (błędny projekt z pierwszego deployu).

---

*Maintainer: update at end of every session*

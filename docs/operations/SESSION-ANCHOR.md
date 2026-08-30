# SESSION-ANCHOR — Live Session Pointer

**Updated:** 2026-08-30 · **Status:** Etap 4 LIVE na produkcji (vercel --prod, projekt flexgrafik-services); smoke 12 URL ✓; home hero PAS added; ship to main

**Canon:** `docs/canon/identity.md` LOCKED · `docs/canon/site-map.md` v2 (updated 24.08)

**Handoff:** [`handoffs/2026-08-30-home-hero-pas-added.md`](handoffs/2026-08-30-home-hero-pas-added.md)

## CO

Etap 4 (plan v2.0 w `quietforge/quietforge-strona-etap4-plan.md`):
- /about v2 (9 sekcji, KVK w stopce) · /pricing v2 (warianty ESSENTIAL/SYSTEM*/AUTONOMOUS + CARE/GROW*/AUTONOMY) · /proof#reference (program 5 firm).
- Home: lead hero (self-improving systems), proof „five doors”, ceny wariantowe, FAQ +2, Fit +1, hero chip.
- 3 nowe spokes: company-brain (flagship) · ai-security-audit (pioneer) · custom-ai-agent — pełny szablon B1–B10, hub „Nine systems”.
- Blog: +3 wpisy Five Pillars, kategorie, schema Article. Ośmiornica w footerze.
- Eventy: pricing_variant_click · reference_program_click · blog_read · about_section_scroll.
- Sitemap 26 routes. Canon site-map zsynchronizowany (SR-03).

Dodano sekcję Problem → System → Effect (PAS) do hero na stronie głównej, wykorzystując istniejące dane z conversion-copy.ts. Sekcja PAS znajduje się między subline a anti-position.

Public offer: Scan €690 · ESSENTIAL €2,500 / SYSTEM €4,500* / AUTONOMOUS €7,900 · CARE €300 / GROW €600* / AUTONOMOUS €1,000/mo.

## DECYZJE (veta Dowódcy)

D1 eyebrow hero = lock („System builder…”); D2 slots+#reference współistnieją; D3 Blog w footerze; D4 bez portretu; D5 KVK 89057554; OG ośmiornica = decyzja otwarta.

## NASTĘPNY KROK
1. Optymalizacja sekcji IntentSystems (redukcja liczby odznak na kartach).
2. Poprawa a11y FAQ (aria-controls, hidden, fokus).
3. Refaktoryzacja sekcji Approach i Compare w stylu PAS.
4. Przegl zmian z Dowódcą i zgoda na dalsze optymalizacje.
5. Dowódca: review diff → commit/push/deploy (ręczny, Zasada 11).
6. Smoke po deployu: / · /about · /pricing · /proof#reference · /systems + 3 spokes · /blog.
7. LinkedIn dopiero po akceptacji strony vs `kim jestem`.
8. Nie publikować PNG z `proof.ts`, których nie ma w `public/gratka/`.

---

*Maintainer: update at end of every session*

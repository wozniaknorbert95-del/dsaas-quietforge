# QuietForge — ROADMAP (SoT)

**Owner:** Norbert Wozniak (Dowódca)  
**Repo:** `dsaas-quietforge` — to jest jedyne miejsce dla biznesowej roadmapy QuietForge.  
**Updated:** 2026-08-21  

> **Granica:** ten plik = cele marki / strony / platformy / showcase / marketing.  
> Narzędzie **KOKPIT** (karty klientów, zespół HITL) żyje w osobnym repo: [`zlotaskrzynia`](https://github.com/wozniaknorbert95-del/zlotaskrzynia).  
> Nie mieszamy sesji: 1 sesja = 1 repo = 1 moduł.

---

## Święte (nie zmieniać bez decyzji)

| Waluta QuietForge | Na stronie | W KOKPIT |
|---|---|---|
| Czas · pieniądze · nerwy | Time / Money / Calm (+ Team / Order — do dyskusji) | czas / pieniądze / nerwy |

Licznik publiczny: **Hours confirmed** — `0 = 0` dopóki klient nie potwierdzi godzin. Zero fabrykowania. Źródło: `src/content/hours-counter.ts`.

---

## Cele (z bloku „Musimy" — 2026-08-21)

| # | Cel | Repo / miejsce | Status | Lock |
|---|---|---|---|---|
| 1 | Dokończyć platformę DSaaS | `dsaas-platform-main` | PARKED — LAB/DRY-RUN, F6 BLOCKED do Bramki P + Fala W1 | decyzja właściciela S1/S2/S3 |
| 2 | Pierwszy tenant = quietforge.flexgrafik.nl na platformie | platforma + ten tenant | PARKED — czeka na #1 | jak wyżej |
| 3 | Doprecyzować ofertę (social automation, LinkedIn firm, bogata oferta) | ten repo (content/canon) | OPEN — decyzja ofertowa, nie outreach | nie = publish |
| 4 | Zoptymalizować stronę quietforge.flexgrafik.nl | **ten repo** | OPEN — tool-first; szlify UX/copy w sesjach tu | deploy = ręcznie |
| 5 | Profesjonalne konto GitHub + repo jako wizytówka | `portfolio` + pins | CZĘŚCIOWO — README portfolio zaktualizowane; **pins = ręczne w UI** | — |
| 6 | FB: prywatne → QuietForge marka osobista | poza kodem | PARKED | Demand OS / W8 OFF |
| 7 | Profil Upwork (łowienie zleceń) | poza kodem | PARKED | Demand OS / W8 OFF |
| 8 | Konto TikTok QuietForge | poza kodem | PARKED | Demand OS / W8 OFF |
| 9 | Strona chwali się wynikami (Hours confirmed / €) | **ten repo** | DONE lokalnie — `hours-counter.ts`; **bez deploy** | 0=0 do potwierdzenia klienta |
| 10 | Darmowe wdrożenia + materiały content | poza kodem | PARKED | Demand OS / W8 OFF |

---

## Co już zrobione (lokalnie, 2026-08-21 — bez deploy)

- [x] `src/content/hours-counter.ts` — SSoT licznika `{ hoursConfirmed: 0, ratePerHour: 40 }`
- [x] Home + `/proof` czytają z pliku (nie sztywne `0` / `€0`)
- [x] Link GitHub w footerze (`SOCIAL_LINKS` + ikona)
- [x] `typecheck` / `lint` (0 errors) / `build` zielone lokalnie
- [x] Portfolio README (commit na `portfolio`)

**Do Ciebie ręcznie:** przypnij na profilu GitHub: `dsaas-quietforge`, `zlotaskrzynia`, `dsaas-platform-main`.  
**Deploy strony:** tylko po Twoim „go" (Zasada 11).

---

## Kolejność sesji (rekomendowana)

1. **Sesja tu (dsaas-quietforge):** szlify strony + proof loop live (commit → review → Twój deploy).  
2. **Sesja oferta (#3):** doprecyzowanie oferty w canon/content — bez publish.  
3. **Sesja platforma (#1–#2):** tylko po decyzji bezpieczeństwa w `dsaas-platform-main`.  
4. **Marketing (#6–#8, #10):** dopiero po jawnym unlock Demand OS.

GTM 90-dni (LinkedIn cadence) = dokumentacja w `docs/strategy/gtm/06-roadmap-90-days.md` — **nie zastępuje** tej listy celów; tam kanały, tu cele biznesowe.

---

## Czego NIE robimy w tym pliku / tym repo

- Nie planujemy akademii / LMS Norberta (osobne narzędzie).
- Nie prowadzimy kart klientów KOKPIT (to `zlotaskrzynia`).
- Nie odblokowujemy outreach bez jawnego „go".
- Nie deployujemy autonomicznie.

---

## Linki

- Strona: https://quietforge.flexgrafik.nl  
- Platforma: `dsaas-platform-main`  
- KOKPIT (narzędzie kart): `zlotaskrzynia`  
- Hours SSoT: `src/content/hours-counter.ts`

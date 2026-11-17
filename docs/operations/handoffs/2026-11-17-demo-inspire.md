# Handoff — Demo 2/4: INSPIRE = REPLIKA 1:1 (2026-11-17)

**Repo:** quietforge.nl · **Build:** ✅ · **Deploy:** Cloudflare Pages CI on `main` (`bd308dd`)
**Zasada:** demo = wyłącznie zawartość repo — ZERO autorskich treści (rozkaz Dowódcy).

## Cel / Goal
`/lab/inspire/` = wierne odtworzenie oryginalnego intake „voertuigreclame-ontwerp" (FlexGrafik INSPIRE): chat „FlexGrafik adviesgesprek" → briefing → 2 mockup-richtingen → offerte. Stop demo przy wysyłce (firma offline).

## Źródła (nic nie zmyślone)
- Front: `<kwarantanna zzpackage>\flexgrafik-wizard-theme\page-voertuigreclame-ontwerp.php` + **oryginalny `dtp-design-agent.js/css` (niezmienione)**
- Silnik: `_HOLY_ARCHIVE\...\flexgrafik-inspire\` — pytania (`PHASE_FIELDS`), copy chatu (`brain/i18n/chat/{nl-NL,pl-PL,en-GB}.json` — kopie verbatim), kierunki (`recommend.py reason_nl/budget_note_nl`, MA-005 €149 / NA-WRAP-BASIC €399), mockupy (`mockup-examples/`, portfolio `homepage-v61/` voor/na), `visual_analyzer` strings, `trust-pack.json`

## Co zrobiono
- `public/demo/zzpackage/inspire/` — `index.html` (markup PHP → statyk), `demo-boot.js` (stub API jadzia-core: chat/opening, chat, chat/turn z uploadem logo/„WHERE_BUS", generate → 2 richtingen w kształcie FIXTURE_RESPONSE, offerte-request → modal DEMO), `data/i18n/chat/*`, `assets/` (23 obrazy ≤1200px)
- `/lab/inspire/` = `DemoFrame` (pasek: ← Back to the FlexGrafik story / ALL PROOF / Book a scan, loader, H1/lead sr-only) → iframe repliki
- Stop: „Offerte aanvragen" → modal „Demo — deze aanvraag wordt niet verzonden." + ref DEMO-XXXX (walidacja formularza działa wcześniej)

## Weryfikacja
- typecheck ✅ · lint 0 errors ✅ · build ✅ · check-links 0 broken ✅
- **QA przeglądarka (pełny klikany przepływ):** NL: opening → 8 pytań z chipami (realne etykiety) → upload logo (dropzone + paperclip) → quick previews + contrast feedback → briefing card (edit panel) → **2 mockupy z obrazkami i cenami €149/€399** (Groeirichting badge) → kies richting → offerte (walidacja: e-mail/telefoon/toestemming) → **modal DEMO** (ref DEMO-PS2Z) · **NL/PL/EN toggle** działa przed i po stopie · session restore po reloadzie · **0 błędów konsoli, 0 404**
- Live smoke: 200 na `/lab/inspire/`, replice, demo-boot.js, mockupie ✓ · bar+iframe ✓

## Świadome ograniczenia (brak źródła w repo → pominięte, NIE zmyślone)
- Pytania `marketing.doelgroep/diensten/slogan/telefoon/website` i beat `vibe_pick` + `logo_rescue_pick` (silnik generuje obrazy typograficzne w runtime — w demie jeden realny placeholder SVG)
- Sukces (WhatsApp/Calendly) osiągalny tylko teoretycznie — flow zatrzymuje się na modalu demo

## Następny krok / Next steps
- **Demo 3/4: GAME** — uwaga: źródło to osobny serwis `app.flexgrafik.nl` (nie theme zzpackage) — najpierw zlokalizować repo/assety gry (lub `_HOLY_ARCHIVE`), potem port tym samym schematem + kupon GAME10 → Wizard (logika już gotowa w demo-boot Wizarda)
- Potem Demo 4/4: Portal (`front-page.php`, spec §H)
- Do decyzji: claim „2–4 weeks after the scan" (MR-16)

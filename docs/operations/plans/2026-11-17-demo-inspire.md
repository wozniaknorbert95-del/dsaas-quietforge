# Plan — DEMO 2/4: INSPIRE = PORT repo flexgrafik-inspire + theme zzpackage · 2026-11-17

**Zasada nadrzędna (rozkaz):** demo = **wyłącznie zawartość repo** (pytania, copy, ceny, mockupy, logika) — ZERO autorskich treści. Czego nie ma w repo — nie ma w demie.

## Źródła (read-only)
1. **Front:** `<kwarantanna zzpackage>\flexgrafik-wizard-theme\page-voertuigreclame-ontwerp.php` + `assets\js\dtp-design-agent.js` + `assets\css\dtp-design-agent.css` + `assets\images\mockup-examples\` — oryginalna strona INSPIRE (chat „FlexGrafik adviesgesprek", NL/PL/EN, max 5 pytań z chipami, briefing card, 2 richtingen €149/€399, offerte form, sukces „Top — we bekijken het nu!").
2. **Silnik:** `C:\Users\FlexGrafik\FlexGrafik\_HOLY_ARCHIVE\2026-08-18-consolidation\01-REPOS-FLEXGRAFIK-SUSPENDED\flexgrafik-inspire\` (`engine/`, `data/`, `output/`, `tests/`) — prawdziwe mockupy/directions z output/ i fixture'ów jako materiał „2 richtingen" i portfolio (voor/na: Caddy, Bus L, Bus XL).
3. **Wzorzec portu:** `public/demo/zzpackage/wizard/` (index.html + demo-boot.js) — ten sam schemat stuba.

## Podejście (jak Wizard)
- `public/demo/zzpackage/inspire/index.html` — markup page-voertuigreclame-ontwerp.php (PHP → statyczny), oryginalne CSS/JS bez zmian.
- `demo-boot.js` — stub warstwy AI/API (jadzia-core upstream): deterministyczne odpowiedzi **zbudowane z treści repo** (prawdziwe definicje pytań, prawdziwe 2 richtingen z prawdziwymi cenami i uzasadnieniami, prawdziwe mockupy z engine/output). Upload logo (FileReader) działa client-side.
- **Stop demo:** offerte submit → modal „Demo — deze aanvraag wordt niet verzonden." + ref DEMO-XXXX (jak w Wizard). WhatsApp/Calendly w sukcesie = prawdziwe linki.
- Banner demo na górze (jak Wizard).
- Obrazy: tylko te referowane przez kod (mockup-examples + engine output) → ≤1600px, ≤15 MB, do `public/demo/zzpackage/inspire/assets/`.
- `/lab/inspire/` = `DemoFrame` (pasek: powrót do story / All proof / Book a scan + loader) → iframe `/demo/zzpackage/inspire/` — dokładnie jak `/lab/wizard/`.

## DoD
- [ ] Pełny przepływ chatu z ORYGINALNYMI pytaniami/chipami (branche, regio, vehicle, usage, impression, cta, budget, bedrijfsnaam, logo)
- [ ] Briefing card → 2 richtingen z realnymi mockupami i cenami €149 / €399 (dane z repo)
- [ ] Offerte form z walidacją → stop demo (modal + ref)
- [ ] NL/PL/EN toggle działa
- [ ] Zero copy nieistniejącego w repo — audyt: każde string = ślad w źródle
- [ ] QA przeglądarkowe (klikany przepływ, 0 błędów konsoli) + typecheck/lint/build ✅
- [ ] Deploy + smoke live

## Ryzyka
- Warstwa AI (jadzia-core/GPT) — jeśli JS oczekuje swobodnych odpowiedzi, stub używa treściz repo (fixtures/output); brak = świadome pominięcie, nie zmyślenie.
- Mockupy w engine/output mogą być duże → pipeline resize.

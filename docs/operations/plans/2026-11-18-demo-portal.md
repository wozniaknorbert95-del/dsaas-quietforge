# Plan — DEMO 4/4: PORTAL = PORT front-page.php · 2026-11-18

**Zasada nadrzędna:** demo = wyłącznie zawartość repo (front-page.php + functions.php partial), ZERO zmyślania. Portal = **spinający hub** — jego linki prowadzą do 3 żywych replik.

## Źródło (read-only)
`<kwarantanna zzpackage>\flexgrafik-wizard-theme\front-page.php` (+ `functions.php` partial `fg_render_home_zzp_systems_hub_section`, `header.php`/`footer.php`, CSS `zzp-home-vca.css` wg enqueue) + obrazy `assets\images\homepage*/`.
Spec §H: `plans/2026-11-17-zzpackage-replica-spec.md` (hero „Van anoniem naar Premium Vakman.", spec bar, „Dezelfde Skills, Ander Respect", „Zo werkt het" 5 kroków, „De Harde Cijfers van Branding", „Configureer Jouw Uitrusting", „De FlexGrafik Garantie", „Speel Mee en Win", systems hub, footer).

## Podejście (jak rodzeństwo)
- `public/demo/zzpackage/portal/index.html` — front-page.php verbatim (PHP → statyka) + banner demo. Jeśli theme ma supervised chat/assistant (dowód `portalAssistant`) — port z repo; **brak w repo = brak w demie** (nie wymyślamy).
- **Mapowanie linków (hub → żywe demo):** `/wizard` → `../wizard/` · `/voertuigreclame-ontwerp` → `../inspire/` · gra (`app.flexgrafik.nl`) → `../bouwplaats/` · hint kuponu → `../wizard/?coupon=` (tekst oryginalny verbatim) · strony spoza demo (materialen/faq/legal) → wg wykazu w raporcie agenta.
- Ewentualny backend (formularze) → modal demo (wzorzec Wizard). Statystyki/liczniki = oryginalne wartości z PHP.
- `/lab/portal/` = `DemoFrame` (pasek: ← Back to the FlexGrafik story / ALL PROOF / Book a scan + loader) → iframe `/demo/zzpackage/portal/`.

## DoD
- [ ] Wszystkie sekcje front-page.php z oryginalnymi stringami (audyt: każdy string = ślad w PHP)
- [ ] Linki do 3 replik działają (klikane QA: portal → wizard/inspire/game)
- [ ] Banner demo; formularze → modal demo
- [ ] Obrazy ≤15 MB, 0 braków 404; 0 błędów konsoli
- [ ] typecheck/lint/build ✅ · deploy · smoke live

## Po kompletu (4/4)
Cała ścieżka klienta spinana: **Four doors → 3 narzędzia żyją i linkują się nawzajem** (gra → kupon → wizard; portal → wszystkie). Zostaje: claim „2–4 weeks" (MR-16), domain sweep, „Three walks".

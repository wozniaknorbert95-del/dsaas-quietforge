# Plan — DEMO 1/4: Wizard = PORT oryginału zzpackage.flexgrafik.nl · 2026-11-17 (v2)

**Rozkaz Dowódcy (korekta):** demo ma być **TO SAMO co było wyświetlane na zzpackage.flexgrafik.nl** — wierne odtworzenie, nie autorska wersja. Poprzedni build (zmyślony katalog „Vehicle wrap/Workwear…") = BŁĄD → usunąć.

**Spec 1:1:** [`2026-11-17-zzpackage-replica-spec.md`](2026-11-17-zzpackage-replica-spec.md) · **Assety:** `public/demo/zzpackage/` (js/, css/, data/ — oryginalne pliki) · **Źródło:** kwarantanna `Secure-Quarantine\DSaaS-2026-08-18\repo-worktrees\zzpackage.flexgrafik.nl`

## Podejście: port, nie przepisanie
Oryginalny Wizard jest **100% client-side JS** — więc demo ładuje ORYGINALNE pliki (`wizard-presets.js`, `wizard-1-3.js`, `wizard-step-2.js`, `wizard-4-7.js`, `zzp-*.css`, `product-master-table.json`, `preset-manifest.json`) i podmienia TYLKO warstwę serwerową PHP/WooCommerce na stub client-side:
1. Iniekcja danych (`WizardWooCommerceData`, `fgMasterCatalog`, `fgPresetManifest`) — z JSON-ów w `public/demo/zzpackage/data/`
2. Ceny: oryginalna formuła (`price_suggested` × qty, `Math.round`, meter €199, incl. 21% BTW, custom €49/m², kupony/bonusy gry)
3. **Stub „Afrekenen":** zamiast AJAX → WooCommerce redirect = modal `Demo — bestelling wordt niet verzonden` + ref demo (firma offline). Reszta identyczna z oryginałem.
4. Wygląd = oryginalny theme VCA Industrial (Barlow/Inter/JetBrains Mono, cyan/magenta/yellow, hazard stripes, sticky cart pill) — **bez** qf-* (to replika obcego UI, nie strona Quietforge; wrapper strony = standardowy shell /lab/)

## Kolejność prac
1. ~~Assety js/css/data do repo~~ ✅
2. Strona demo: statyczny shell `/lab/wizard/` ładujący oryginalny CSS + JS + dane (bez React — czysty HTML+JS jak oryginał)
3. Stub danych + stub „Agrekenen" + banner demo (jedyna dodana treść: „Demo — FlexGrafik offline, nic nie jest wysyłane")
4. Pipeline obrazów: 161 plików `grafik_bestand` → WebP ≤1600px → `public/demo/zzpackage/images/`
5. QA wizualne vs oryginalne screeny (`/gratka/wizard-checkout.png`, `wizard-demo.mp4` w repo dsaas-quietforge) — klatka po klatce
6. USUNĄĆ mój wcześniejszy `WizardDemo.tsx` + `wizard-catalog.ts` (zmyślony katalog) i podmienić slot w `DoorDemoPreview`

## DoD
- [ ] 9 ekranów z oryginalnymi tytułami NL i kolejnością (Stap n van 9)
- [ ] Prawdziwy katalog: 167 SKU, prawdziwe ceny (F-001 €129, OC-001 €15, MA-005 €129…)
- [ ] Sticky cart + meter €199 + incl./excl. BTW jak oryginał
- [ ] Kupony gry (?coupon=GAME10) + bonus SKUs działają
- [ ] „Afrekenen" → bezpieczny stop demo (nic nie wychodzi)
- [ ] Wygląd nieodróżnialny od oryginału (QA: screen vs screen)
- [ ] typecheck/lint/build ✅ · brak mojej copy — tylko oryginalne NL

## Ryzyka
- Obrazy (200 MB oryginałów) — pipeline WebP, bez oryginałów w repo
- `functions.php` (102KB) może zawierać reguły cenowe wykraczające poza JS — audyt stuba vs PHP przed QA

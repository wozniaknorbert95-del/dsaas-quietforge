# Handoff — Demo 1/4: Wizard = REPLIKA 1:1 zzpackage.flexgrafik.nl (2026-11-17, v2)

**Repo:** quietforge.nl · **Build:** ✅ · **Deploy:** Cloudflare Pages CI on `main`
**Korekta Dowódcy:** demo ma być TO SAMO co zzpackage.flexgrafik.nl — poprzedni autorski konfigurator = BŁĄD (usunięty).

## Cel / Goal
`/lab/wizard/` pokazuje **wierne odtworzenie oryginalnego Wizarda** — oryginalny front client-side (JS/CSS/katalog/obrazy, copy NL), z stubem warstwy PHP/WooCommerce. Jedyna ingerencja: `Afrekenen` → modal `Demo — deze bestelling wordt niet verzonden` (firma offline, nic nie wychodzi).

## Co zrobiono / What changed
- **Port oryginalnego frontu** (`public/demo/zzpackage/wizard/`): `index.html` (markup `page-wizard.php` + header/footer theme), `demo-boot.js` (odtworzenie warstwy danych PHP: `zzpWizardData`, `WizardWooCommerceData`, `fgMasterCatalog`, `fgPresetManifest` + stuby `fg_wizard_fresh_nonce`, `fg_wizard_add_to_cart`, `GET fg/v1/prices`), `zzp-style.css` (kopia style.css).
- **Oryginalne pliki bez zmian** w `public/demo/zzpackage/{js,css,data}` — m.in. `wizard-1-3.js`, `wizard-4-7.js`, `wizard-presets.js`, `wizard-step-2.js`, `zzp-*.css`, `product-master-table.json` (175/167 SKU z prawdziwymi cenami), `preset-manifest.json`.
- **Obrazy:** 347 plików / 12,3 MB WebP ≤1600px z oryginałów (200 MB źródła w kwarantannie — NIE w repo). 6 braków (chrome logo + warianty knolling) → placeholder theme.
- `/lab/wizard/` = pełnoekranowy iframe repliki (`qf-demo-frame`); kafle „Try the demo" → bez zmian.
- **Usunięte:** `WizardDemo.tsx`, `wizard-catalog.ts` (moja zmyślona wersja — sprzeczna z rozkazem).

## Weryfikacja / Verification
- typecheck ✅ · lint 0 errors ✅ · build ✅ · check-links 0 broken ✅
- **QA przeglądarka (headless Edge, pełny klikany przepływ):** Intro → kroki 1–7 (F-001 €129 → cart **€156,09 incl**, `Nog € 70,00`) → stepper `Stap n van 9` → checkout NL (formularz, 2× akkoord, guard `Wacht even! … Design Fee`) → **Afrekenen → modal DEMO** (ref DEMO-XXXX, powrót zachowuje stan) · `?coupon=GAME10` → oryginalny banner gry · `?preset=professional-flota` → `vanaf €2.499` + WhatsApp. **Konsola: 0 błędów JS.**
- Live composite: `/lab/wizard/` → iframe → „ZZPackage Configurator — FlexGrafik" + banner demo ✓

## Ograniczenia (świadome)
- GAME10 nalicza się „bij afrekenen" (jak w oryginale) = poza punktem demo-stop — w koszyku widnieje oryginalna informacja o kuponie.
- Deep-link gry `?email=&token=&lvl=` (HMAC) — tylko `?coupon=`; braki obrazów → placeholder; linki wewn. theme → `#`.

## Następny krok / Next steps
- **Demo 2/4: INSPIRE** = ten sam schemat: port `page-voertuigreclame-ontwerp.php` + `dtp-design-agent.js` (spec w `plans/2026-11-17-zzpackage-replica-spec.md` §G).
- Potem Game 3/4 (`app.flexgrafik.nl` — osobne źródło!) i Portal 4/4 (`front-page.php`, spec §H).
- Do decyzji: claim „2–4 weeks after the scan" (MR-16).

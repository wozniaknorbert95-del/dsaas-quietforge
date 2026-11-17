# SPEC — ZZPackage Wizard 1:1 Replica (port oryginalnego frontu)

**Źródło prawdy:** `C:\Users\FlexGrafik\Secure-Quarantine\DSaaS-2026-08-18\repo-worktrees\zzpackage.flexgrafik.nl\` (oryginalne repo zzpackage.flexgrafik.nl)
**Assety w tym repo:** `public/demo/zzpackage/` (js/, css/, data/ — oryginalne pliki, niezmienione)
**Zasada:** demo = PORT oryginalnego frontu (te same JS/CSS/JSON/HTML copy PL/NL), JEDYNY stub = „Afrekenen" → komunikat demo (brak WooCommerce/Mollie — firma nie działa). Zero zmian w treści, cenach, wyglądzie i krokach.

## A. PRZEPŁYW WIZARDA — 9 ekranów (JS step 0–8), copy NL verbatim
Mobile: `Stap <n> van 9`. Desktop: stepper chips + progress. Panel: eyebrow `Stap ${n} · ${name}`, tytuł, help. Nawigacja: `Vorige` / `Volgende`.

| # | Chip | Tytuł panelu (verbatim) |
|---|---|---|
| 0 | Intro | `Welkom` — hero `Van anoniem naar Premium Vakman.`, badge `4.9 Rating · 33+ ZZP'ers gecertificeerd`, 3 kroki „Zo werkt het", CTA `Start de Wizard`, presety (patrz E), spec bar (`€199 Minimale bestelling` itd.) |
| 1 | Fundament | `Kies je brandingprojecten — de basis van alles` — SKU kolejność: F-001, DF-004, DF-005, DF-006, DF-007, F-001-SOC |
| 2 | Voertuig | `Jouw bus rijdt 100+ km per dag. Dat is gratis reclame.` — typ pojazdu (Caddy/Partner, Bus L, Bus XL, Personenauto, Geen voertuig) → zakładki: `Zelf Samenstellen` / `Instapklare Sets` / `Premium Wraps` / `Magneten` |
| 3 | Werkkleding | `Kleding maakt de vakman. Letterlijk.` — Kleding + `Logo-bedrukking (HTV)` (HT-003, HT-002, HT-001, HT-102, HT-103) |
| 4 | Eerste Indruk | `Fysiek presenteren met drukwerk` — 4 grupy wizytówek (papier 1/2-zijdig, sticker bez/mét laminaat) |
| 5 | Zichtbaarheid | `Laat zien dat jij hier aan het werk bent` — `ZICHTBAARHEID OP LOCATIE` |
| 6 | Gereedschap | `Jouw gereedschap is jouw visitekaartje` — `BRANDING STICKERS & GEREEDSCHAP` |
| 7 | Premium | `De finishing touch` — `MERCHANDISE & GEAR (VOOR JOU EN JE TEAM)` |
| 8 | Checkout | `Samenvatting & Afrekenen` |

## B. LOGIKA CENOWA (dokładnie jak oryginał)
- Ceny: `price_suggested` z `product-master-table.json` × qty; suma `Math.round(total)`; **€199 minimum** (meter: Red <50% → Yellow → Cyan; podpis `Nog €X tot minimum bestelling` / `Klaar om af te rekenen!`; subtext `Minimaal bestelbedrag is €199,-`)
- Wyświetlanie: `Intl.NumberFormat('nl-NL', EUR)`, excl. BTW + `Incl. 21% BTW` (×1.21)
- Custom foil: €49/m², min 1 m², ceil do euro
- Kupony gry: `?coupon=CODE` (GAME10 = 10%), bonus SKU wg poziomu: L3 `BONUS-STICKER1`, L4 `BONUS-TSHIRT2`, L5 `BONUS-WINNER` (€0 w koszyku) + banner `Je hebt een bonus van de game!`
- Guard AOV: belettering wymaga Design Fee (DF-004) — blokada `Wacht even! Je hebt belettering gekozen maar nog geen Design Fee...`

## C. KATALOG (175 wierszy / 167 aktywnych)
`public/demo/zzpackage/data/product-master-table.json` — klucze: `sku, naam, wizard_categorie, wizard_stap, grafik_bestand, drie_kenmerken[3], vraagteken_info, price_suggested, offer_mode, product_type, fit_note, usage_hint, wizard_group, is_default, focus_badge`. Kategorie: Car Branding 91 · Clothing 21 · Eerste Indruk 18 · Tools & Gadgets 12 · Magneten 12 · Visibility 9 · Foundation 8 · Premium Extras 3. Przykłady: F-001 €129 (badge `Populairst`), OC-001 T-shirt STANDARD €15, MA-005 Magneetset compleet Caddy €129 (`is_default`), NA-WRAP-BASIC €399, BLS-SET-PRO-ZZP €219.

## D. CHECKOUT (krok 8) — formularz NL verbatim
`Geen vooruitbetaling · Levering ca. 10 werkdagen · Veilige verbinding` · **Contactgegevens**: `Bedrijfsnaam`, `Naam`, `E-mail`, `Telefoon` · **Briefing voor onze vormgevers** · **Aanlevering**: pills `Ik lever zelf bestanden aan` / `Onze vormgevers doen alles` (default) / `Combinatie` + dropzone · **Akkoord**: 2 checkboxy (`productie pas start na mijn goedkeuring...` + AV/privacy) · meter minimum.
**Przycisk `Afrekenen`** → w oryginale AJAX → WooCommerce/Mollie. **W DEMO:** modal `Demo — bestelling wordt niet verzonden` + ref demo (firma offline). Reszta identyczna.

## E. PRESETY (preset-manifest.json)
`starter-zzp` „Starter ZZP'er" od €299 (cyan) · `groeier` „De Groeier" od €799 (magenta, `Meest gekozen`) · `professional-flota` od €2499 (yellow, `quote_mode` → WhatsApp +31687286151).

## F. WYGLĄD — „VCA Industrial Premium" (zzp-design-tokens.css + zzp-buttons.css)
- Tło: `#050505`/`#070707`/`#111111`/`#1a1a1a`; tekst `#fff`/`#b8b8c0`/`#9ca3af`; bordery `#2a2a32`
- Akcenty: **cyan `#009fe3`**, **magenta `#d60075`**, **yellow `#eab308`**; success `#22c55e`
- Fonty: **Barlow** (display/przyciski, 800/900 uppercase), **Inter** (body), **JetBrains Mono** (dane)
- Rogi 0–4px (industrial sharp), hazard-stripe bar (yellow/black) nad `glass-panel wiz-shell`
- Przyciski `.btn-vca`: uppercase, 16/32px, radius 0, `border-bottom: 4px solid #0077a3`; hover yellow + translateY(-2px)
- **Sticky cart** (jedyne miejsce ceny): desktop bottom-left pill (wartość incl., `Excl. BTW:`, N producten, expand → lista + meter €199), mobile bottom bar + pasek `Stap n van 9`
- Karty opcji: obrazek, check circle, badge `Populairst` (bolt), cena + `Excl. BTW`, −/+ stepper

## G. INSPIRE (`page-voertuigreclame-ontwerp.php` + `dtp-design-agent.js`) — do Demo 2/4
Chat UI NL/PL/EN, max 5 pytań (branche, regio, vehicle.type, usage, impression, cta, budget), upload logo → briefing card → **2 richtingen**: Standard — Magneten €149 / Premium — Wrap €399 (€33/mnd, `Meest gekozen`) z uzasadnieniami → offerte form (`Vrijblijvende offerte binnen 48 uur`) → sukces `Top — we bekijken het nu!` + WhatsApp Nick / Calendly. Disclaimer: `AI-voorbeelden... geen definitief drukbestand.`

## H. PORTAL (`front-page.php`) — do Demo 4/4
Hero `Van anoniem naar Premium Vakman.` · spec bar · `Dezelfde Skills, Ander Respect` · `Zo werkt het` 5 kroków · `De Harde Cijfers van Branding` · `Speel Mee en Win` (game → `app.flexgrafik.nl`, hint kuponu `/wizard/?coupon=`) · routing: `/wizard` (money), `/voertuigreclame-ontwerp` (design), game, `/bedankt`.

## I. OBRAZY (pipeline — 161 plików z `grafik_bestand`)
Źródło: `<kwarantanna>\flexgrafik-wizard-theme\assets\images\` (327 plików, 200 MB). Wybrać 161 używanych → resize ≤1600px → WebP → `public/demo/zzpackage/images/`. **Nie wrzucać oryginałów do repo.**

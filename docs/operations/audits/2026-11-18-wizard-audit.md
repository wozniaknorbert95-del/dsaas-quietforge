# WIZARD (ZZPackage Configurator) — G0 Deep Product & Technical Audit + Definition of Excellence
Task WIZ-G0-01 · Date 2026-11-18 · Method: static deep-read of demo + original theme source (read-only subagent; runtime harness listed as verification checklist)
Targets: `public/demo/zzpackage/wizard/` (index.html, demo-boot.js, zzp-style.css) + shared `../js`, `../css`, `../data`, `../images`
Original source ref: `Secure-Quarantine\DSaaS-2026-08-18\repo-worktrees\zzpackage.flexgrafik.nl\flexgrafik-wizard-theme\` (functions.php, page-wizard.php, assets/js/wizard-*.js)

## 1. Functionality inventory
| # | Feature | Status | Evidence |
|---|---------|--------|----------|
| 1 | 9-step configurator (Intro, Fundament, Voertuig, Werkkleding, Eerste Indruk, Zichtbaarheid, Gereedschap, Premium, Checkout) | WORKS | js/wizard-1-3.js:68-77 (steps), :850-858 (router) |
| 2 | SSoT catalog: 175-row product-master-table.json → window.WizardWooCommerceData | WORKS | demo-boot.js:123-178; data/product-master-table.json (stap 0–7: 1/8/103/21/18/9/12/3 rows) |
| 3 | Progress autosave ("Voortgang wordt automatisch opgeslagen") | WORKS | wizard-1-3.js:184-189 (zzpWizardState → localStorage + sessionStorage) |
| 4 | Pricing: €199 minimum gate, custom foil €49/m² (min 1 m², ceil), Math.round totals | WORKS | wizard-1-3.js:353,895,1512; demo-boot.js:57,222-232 (mirrors PHP add_to_cart rules) |
| 5 | Step-2 vehicle engine: 4 vehicle types (bus-l/xl, caddy, ps), DIY/Sets/Wraps/Magneten, S/M/L size switch, SKU hero images | WORKS | js/wizard-step-2.js:175,217,413,450,521,567,639 |
| 6 | Lazy chunk steps 4–7 | WORKS | demo-boot.js:104 lazy_js_url → ../js/wizard-4-7.js; wizard-1-3.js:247 (load error path) |
| 7 | Presets + deep links: ?preset=, ?da_vehicle/?da_skus (Design-Agent handoff), quote-mode → WhatsApp offerte | WORKS | wizard-presets.js:164-165,661-663; wizard-1-3.js:866-905 (isQuoteModePreset/_openQuoteWhatsApp) |
| 8 | Game coupon bridge: ?coupon=CODE → sessionStorage + banner (GAME10 label) | WORKS | demo-boot.js:60-95 |
| 9 | Checkout: min-€199 guard, 2 agreement checkboxes, AOV/Design-Fee guard, fresh nonce, add-to-cart POST → DEMO STOP modal, button reset on close | WORKS (demo stop by design) | wizard-4-7.js:380-475; demo-boot.js:246-263,374-389 |
| 10 | Image pipeline: theme-asset rebase + one-extension retry + SVG placeholder fallback | WORKS | demo-boot.js:296-347 |
| 11 | Mobile CTA bar, skip-link, aria-live summary | WORKS | wizard-1-3.js:623-628,1360; index.html:48,119-122 |
| 12 | Analytics (GA4/Meta pixel hooks) | PARTIAL — no-op in demo (guarded `typeof gtag`) | wizard-1-3.js:1700-1702 |

Fidelity proof: all four wizard JS files are **byte-identical** (MD5) to theme originals; zzp-style.css == theme style.css; page-wizard.php markup reproduced 1:1 in index.html:83-125.

## 2. UI-vs-real discrepancies · dead interactions · unstubbed endpoints
- **10 × `href="#"` dead links** in wizard/index.html: header "Ontwerp je bus" + "Start de Wizard" (lines 66-78), footer "Start de Wizard", "Veelgestelde vragen", "Materialen", "Ontwerp je bus", "Algemene Voorwaarden", "Privacybeleid", brand logo (135-189). Originals were real URLs (header.php:44-58 fg_design_agent_url() + home_url('/wizard'); footer.php:52-83 /faq, /materialen, /algemene-voorwaarden, /privacybeleid).
- **Footer game link → `https://app.flexgrafik.nl`** (index.html:177) — dead production domain; portal demo correctly points to `../../bouwplaats/`. Cross-demo inconsistency.
- **`?step=N` deep links ignored**: portal catalog cards target `../wizard/?step=1..7`, but wizard-1-3.js contains zero `location.search` reads (grep verified) and page-wizard.php/functions.php never handled `$_GET['step']` → every deep link lands on step 1. Original-site bug faithfully replicated.
- JSON-LD + logo URLs assert `https://zzpackage.flexgrafik.nl/...` (index.html:196-212) on a quietforge.nl demo route. No `og:image` (index.html:24-26).
- **Unstubbed endpoints: none.** admin-ajax `fg_wizard_fresh_nonce` + `fg_wizard_add_to_cart` and REST `fg/v1/prices` all stubbed (demo-boot.js:236-289); master/preset JSON static. `../js/zzp-brief-form.js` and `../js/dtp-design-agent.js` exist but are NOT loaded on this page (correct — post-payment/design-agent flows).

## 3. JS / network errors
Static verification: every local CSS/JS/data/image reference resolves (programmatic existence check passed). Expected console: `[demo-boot] product-master-table.json load failed` only on data outage (not expected), `Master Catalog loaded…` logs (wizard-1-3.js:130,157), `Unknown preset` warn for typos (wizard-presets.js:197). Fetch shim matches relative `wp-admin/admin-ajax.php` and absolute forms (demo-boot.js:276-278). External deps at load: fonts.googleapis.com/gstatic (fallback fonts defined).
**Runtime checklist (to be executed):** serve `public\demo\zzpackage` root via `python -m http.server`, headless Edge 127.0.0.1:9222 on `/wizard/` + `/portal/`; capture: console 0 errors, network 0 non-200 (excluding intentional never-settling add-to-cart), step 1→8 walk-through + checkout → DEMO-XXXX modal, `?coupon=GAME10` banner, `?preset=` load.

## 4. Mobile / responsive + perf baseline
Viewport meta ✓; media rules: zzp-wizard.css 46, zzp-wizard-vca.css 38, components 8. Initial payload /wizard/: **CSS ≈ 339 KB** (wizard.css 129 + wizard-vca.css 147 + 6 shared ≈ 63 — both wizard sheets enqueued together is original behavior, functions.php:484-485), **JS ≈ 182 KB** (demo-boot 20 + wizard-1-3 93 + presets 34 + step-2 35; wizard-4-7 31 lazy), **data 262 KB** master JSON (cached to localStorage afterwards), eager images: `zzpackage-logo-primary.png` **146 KB** PNG + step heroes (158/162 hero images present). Total ≈ 0.9 MB before step images → LCP ≤ 2.5 s budget at risk (see P1).

## 5. Assets / components NOT to rewrite
`js/wizard-1-3.js`, `js/wizard-presets.js`, `js/wizard-step-2.js`, `js/wizard-4-7.js` (byte-identical to theme; the demo's contract is "original code runs unmodified"); `css/*` incl. zzp-wizard.css + zzp-wizard-vca.css pair; `data/product-master-table.json` (SSoT); `zzp-style.css`; demo-boot.js public contract (globals `zzpWizardData`, `WizardWooCommerceData`, `fgMasterCatalog`, `fgPresetManifest`; endpoint shapes `fg_wizard_fresh_nonce` / `fg_wizard_add_to_cart` / `fg/v1/prices`); DEMO STOP modal markup + copy.

## 6. Definition of Excellence (DoE)
| Dimension | Current | Target |
|---|---|---|
| Functionality | 12/12 core flows reachable; step deep-links ignored | 12/12 + `?step=N` honored or links de-parameterised |
| UX | Dead CTAs (10), demo-stop modal good | 0 dead CTAs; every visible CTA has a destination |
| UI fidelity | 1:1 vs theme (verified) | maintain 1:1; no re-skinning |
| Errors | 0 expected console errors | 0 errors, 0 failed requests (runtime-verified) |
| Mobile | CSS evidence good; unverified at runtime | 375 px no horizontal scroll, ≥44 px targets, mobile CTA bar reachable |
| Perf | ≈ 0.9 MB initial; 146 KB PNG logo | ≤ 400 KB initial; LCP ≤ 2.5 s mobile |
| Security | No secrets; stubs local; no external POST | keep; JSON-LD domain = demo host |
| A11y | skip-link, aria-live, aria-modal dialog | focus trap in demo modal; keyboard pass |
| Production | Static under /demo/zzpackage/wizard/ | build gate green; evidence screenshots per step |

## 7. Baseline metrics
Files: 3 in wizard/ (index 14.8 KB, demo-boot 19.8 KB, css 11.2 KB) + shared js 240 KB + css 339 KB + data 267 KB + images ≈ 350 files. SSoT rows 175; hero images 158 OK / 4 missing (shared `wizard-step2_addon_design48h_v2.webp` → BLS/BXLS/PS/CS-DESIGN-48H fall back to placeholder). Dead links 10. Unstubbed endpoints 0. JS byte-identity: 4/4 verified.

## 8. Fix priorities (root cause)
- **P0 — none blocking.** Demo stop + full configurator path are intact.
- **P1a** Dead header/footer CTAs (root cause: demo port replaced PHP `esc_url(home_url(...))` with `#` instead of demo-local targets) → repoint: "Ontwerp je bus"→`../inspire/`, "Start de Wizard"→`#zzp-wizard-app`, FAQ/Materialen/legal→flexgrafik.nl pages or hidden.
- **P1b** Footer game link to dead `app.flexgrafik.nl` (root cause: footer.php template copy) → `../../bouwplaats/` (align with portal).
- **P1c** `?step=N` deep links dead (root cause: original app never parsed the param; portal keeps emitting it) → implement param→step mapping in demo-boot (do NOT touch wizard-1-3.js) or drop params in portal cards.
- **P2a** 4 SKUs without hero image (missing `wizard-step2_addon_design48h_v2.webp`) → add one asset (or accept placeholder).
- **P2b** Perf: 146 KB logo PNG + 339 KB CSS + 262 KB JSON on critical path → compress logo to WebP, defer non-step CSS, cache-first JSON (already cached post-load).
- **P2c** No og:image; JSON-LD targets legacy domain.
- **P3** fgTrack/fbq no-ops (acceptable for demo); quote-mode WhatsApp targets live wa.me (acceptable).

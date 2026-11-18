# INSPIRE — Deep Product & Technical Audit + Definition of Excellence

**Task:** INS-G0-01 (todos/inspire.json, Linear QUI-266) · **Date:** 2026-11-18 · **Mode:** READ-ONLY audit (no code/content changes)
**Auditor:** OpenCode subagent (G0 Discovery & Audit, Enterprise Program v2)

**Scope audited**
- Demo under test: `C:\Users\FlexGrafik\FlexGrafik\github\dsaas-quietforge\public\demo\zzpackage\inspire\` (index.html, demo-boot.js, zzp-style.css, data/i18n/chat/*.json, assets/)
- Sibling context: `public\demo\zzpackage\wizard\demo-boot.js` (demo-layer pattern), `public\demo\zzpackage\js\dtp-design-agent.js` + `public\demo\zzpackage\css\*`
- ORIGINAL source (comparison): `C:\Users\FlexGrafik\Secure-Quarantine\DSaaS-2026-08-18\repo-worktrees\zzpackage.flexgrafik.nl\flexgrafik-wizard-theme\` (`page-voertuigreclame-ontwerp.php`, `assets\js\dtp-design-agent.js`, `assets\css\*`)
- Engine repo (what real generation *should* be): `C:\Users\FlexGrafik\FlexGrafik\_HOLY_ARCHIVE\2026-08-18-consolidation\01-REPOS-FLEXGRAFIK-SUSPENDED\flexgrafik-inspire\` (engine/, brain/i18n, tests/)

**Methodology (evidence-based)**
- Static: file/hash comparison vs originals, endpoint contract grep, dead-link scan, promise-vs-behaviour tracing.
- Runtime: served `public\demo\zzpackage` via `python -m http.server 8901` and drove **headless Edge 157 (CDP :9222)** through three full sessions: (1) desktop 1366×900 complete journey chat→logo→generate→offerte→demo-stop, (2) mobile 375×812 complete journey, (3) no-logo rescue path. Console/exception/network capture via CDP `Runtime`/`Log`/`Network` domains.
- Evidence artifacts (screenshots + raw JSON reports): `C:\Users\FlexGrafik\AppData\Local\Temp\opencode\audit-inspire\` (`01-initial-desktop.png` … `13-rescue-summary-no-confirm.png`, `report-desktop.json`, `report-mobile.json`, `report-rescue.json`).
- Caveat: performance numbers are localhost/headless — real CWV must be re-measured on Cloudflare Pages in G3 (INS-G3-03).

**Known complaints → verdict (root cause found for both):**
1. *"Chat works but does NOT generate graphics"* → chat and generation **both execute**, but `/generate` is a fixture stub (`demo-boot.js` `handleGenerate()`) that returns **two pre-baked ZZPackage-branded vehicle photos** (`assets/mockup-<vehicle>-*.png`) for every user — the uploaded logo, company name, phone and slogan are **never rendered into anything**. Additionally the "no logo" path dead-ends before generation. See §2.1, §3.2, §10-P0.
2. *"Front-end chaotic/overwhelming at start"* → quantified in §5: the actual product (chat) starts at **y=872px (below the fold)** and the input at **y=1251px** on 1366×900; first screen carries **4 competing CTAs + demo banner + 654 words**; the flow claims "max 5 vragen" but requires **10 interactions**. See §5, §10-P0.

---

## 1. Functionality inventory

| # | Feature | Status | Evidence |
|---|---------|--------|----------|
| 1.1 | Page loads, styles, fonts, dark theme | **works** | 37 network responses all HTTP 200; 0 console errors (`report-desktop.json`) |
| 1.2 | Demo banner + DEMO STOP modal | **works** | `inspire/index.html:44,465-473`; modal shown on offerte submit with ref `DEMO-TL88` (`report-desktop.json` stepResult `modal-state`) |
| 1.3 | Chat opening (GET `/chat/opening`) | **works** | composer-ready in 231 ms (`report-desktop.json`); opening bubble rendered |
| 1.4 | Chat Q&A flow — 1 free-text + 8 chip turns | **works** | chips executed: Installatie/elektra → Rotterdam → Caddy/Partner → Alleen zakelijk → Strak → Bellen → Tot €150 → Strikt (`report-desktop.json` `click-chips-loop`) |
| 1.5 | i18n packs NL/PL/EN (chat) | **works** | 3 packs load 200; SHA-256 identical to engine `brain\i18n\chat\*.json` (verified) |
| 1.6 | Language toggle NL/PL/EN | **partial** | switches chat locale + resets session (`dtp-design-agent.js:2023-2057`); page/marketing copy stays Dutch; several JS strings hardcoded NL (`dtp-design-agent.js:830,1477,1653-1654`) |
| 1.7 | Logo upload (paperclip + V61 dropzone) | **works** | PNG accepted, brand colours extracted, IndexedDB persisted (`report-desktop.json` `upload-logo`) |
| 1.8 | Logo colour/contrast feedback | **partial / hallucinated** | rule-based, but head is hardcoded `"Zie hem — wit bus…"` for every input (`demo-boot.js:526-551`) — claims to have seen a white bus without any photo analysis |
| 1.9 | No-logo "typo rescue" (3 typographic directions) | **broken (dead-end)** | rescue chips shown and summary reached, but generation is permanently blocked — §3.2; `report-rescue.json` + `13-rescue-summary-no-confirm.png` |
| 1.10 | Brief summary card + edit panel | **works (with data bug)** | summary reached "Stap 7 van 7 — Samenvatting"; edit panel budget options diverge from chat options — §2.5 |
| 1.11 | Confirm card ("Bevestigen → mock-ups") | **works** (with logo only) | `confirmCard: true` after upload (`report-desktop.json`) |
| 1.12 | Mockup generation (POST `/generate`) | **partial** | returns 2 images that load (1200px PNG), but content is static & user-agnostic — §2.1 |
| 1.13 | Results section (2 cards, prices, "Groeirichting" badge) | **works** | `resultsVisible: true`, 2 cards, budget note rendered (`04-results-desktop.png`) |
| 1.14 | Direction choice → offerte panel | **works** | `select-mockup` → panel visible with selection (`05-offerte-panel.png`) |
| 1.15 | Offerte form validation (email/tel/consent) | **works** | client checks at `dtp-design-agent.js:1737-1748` |
| 1.16 | Offerte submit | **demo-stop (by design)** | modal intercepts; on close the original failure path runs: `err: "Offerte aanvragen mislukt. Probeer opnieuw."`, submit re-enabled (`report-desktop.json` `close-modal-check-error`) |
| 1.17 | Session restore (sessionStorage + IndexedDB logo) | **works (static + code path)** | `dtp-design-agent.js:2093-2130`; not dynamically re-tested |
| 1.18 | Recommended products + Wizard deeplink from `/generate` | **broken (never displayed)** | `#da-wizard-link` absent in HTML; `renderRecommendations()` hides the block unconditionally (`dtp-design-agent.js:1915-1919`) — §3.3 |
| 1.19 | Header CTA "Ontwerp je bus" (`#header-design-agent-cta`) | **broken (dead button)** | `href="#"`, no JS binding anywhere — §3.1 |
| 1.20 | Sticky CTA "Start adviesgesprek" | **works (desktop appears on scroll)** | hidden (h=0) at top on desktop, visible on mobile (`report-rescue.json` geometry, `report-mobile.json`) |
| 1.21 | How-it-works / comparison / portfolio / FAQ sections | **works (static)** | render correctly; lazy images load (`01-initial-desktop.png`) |
| 1.22 | Footer links | **partial** | external links work (WhatsApp, flexgrafik.nl, game); 9 internal `href="#"` dead links — §3.1 |
| 1.23 | Analytics events (`mockup_selected`, `offerte_requested`) | **works (guarded)** | gated behind consent + `gtag` (`dtp-design-agent.js:1671-1683`) |

## 2. UI-vs-real discrepancies (promises vs behaviour)

| # | The interface promises… | Reality | Evidence |
|---|------------------------|---------|----------|
| 2.1 | "**Eerste preview met jouw logo op je bus** — binnen 30 sec" (needget box, `index.html:115`), "met jouw logo, niet nep tekst" (H1), "Jouw 06 exact leesbaar" (compare table `index.html:197`) | Generation returns **fixed ZZPackage-branded mockups** (`assets/mockup-caddy-strak.png` / `-opvallend.png`) regardless of uploaded logo, company name, phone or slogan. Nothing user-specific is ever rendered. This is the root of *"chat works but does NOT generate graphics"*. | `demo-boot.js:727-768` (`handleGenerate` returns `mockupImages(vehicle)` static files); `04-results-desktop.png` shows ZZPackage branding while session company was "Test Bedrijf BV"; contrast: engine `engine\v4\intake\quick_preview.py` + `engine\compose_ref.py` *do* compose logo+text on vehicle templates — **not wired into the demo** |
| 2.2 | "**Geen logo? Wij maken 3 lettertype-richtingen**" (needget `index.html:109`, FAQ `index.html:290-292`) | Typo-rescue chat works, but generation is **permanently blocked** for logo-less users (client gate requires a `File`) → dead-end. | §3.2; `report-rescue.json` (`confirmCard: false`, blocked message shown) |
| 2.3 | "**Advies op basis van wat je doet, waar je bus staat**" (H1 sub, compare table) | "Analysis" feedback is **hardcoded**: `"Zie hem — wit bus…"` for every vehicle/logo; the V61 dropzone always sends the message **`"Witte Caddy Ypenburg — foto + logo geüpload"`** regardless of actual vehicle/regio. Fabricated personalisation. | `demo-boot.js:526-551`; `dtp-design-agent.js:830` |
| 2.4 | "**Offerte <2u** via mail + WhatsApp + Calendly" (hero `index.html:90`, proof bar `index.html:280`, FAQ `index.html:299`) | Offerte panel says "**Vrijblijvende offerte binnen 48 uur**" (`index.html:320`). Inconsistent promise on the same page. | `index.html:90` vs `index.html:320` |
| 2.5 | Budget asked in chat: `Tot €150 / €150–€300 / €300–€600 / €600–€1000 / €1000+` | Brief **edit panel** offers different ranges: `Tot €600 / €600–€1000 / €1000–€2000 / €2000+` — two divergent option sets, and the recommendation logic (`premiumReason`/`premiumGrowth`) only recognises the pack IDs (`tot_150`, `150_300`, `300_600`, `600_1000`, `1000_plus`). Editing budget can yield wrong "Groeirichting"/reason copy. | `data/i18n/chat/nl-NL.json` `button_options['budget.range']` vs `dtp-design-agent.js:294-300` (`EDIT_CHIP_OPTIONS`); `demo-boot.js:335-353` |
| 2.6 | "**max 5 vragen**" (microcopy `index.html:120`) | Actual flow = **10 interactions** (name + 8 chips + logo upload) before the summary. | `demo-boot.js:184-197` `FLOW` (10 entries); journey logs in both reports |
| 2.7 | "2 professionele richtingen" + "Aanbevolen voor jouw voertuig" block | Recommendations block exists in HTML but is **permanently hidden**; `recommended_products` (incl. DF-004 addon) and `wizard_deeplink` from `/generate` never surface. Conversion path to Wizard is lost. | `index.html:361-364`; `dtp-design-agent.js:1915-1919`; `demo-boot.js:759-766` |
| 2.8 | GDPR consent "**Privacy**" link | Dead `href="#"` (original PHP linked the real privacy page). Legal/compliance gap on a consent checkbox. | `index.html:334` vs original `page-voertuigreclame-ontwerp.php` (`home_url('/privacybeleid')`) |
| 2.9 | Language switcher NL/PL/EN implies localised page | Only the chat is translated; all marketing copy, results UI strings ("✓ Ontwerp klaar", "Hier zijn je twee ontwerpen!", gate messages) stay Dutch. | `index.html` (static NL); `dtp-design-agent.js:54-98,1653` |

## 3. Broken interactions, dead buttons, unconnected functions

### 3.1 Dead links / buttons (9 × `href="#"`, one of them a primary CTA)
| Element | Location | Impact |
|---|---|---|
| `#header-design-agent-cta` "Ontwerp je bus" (badge "Nieuw") | `index.html:64-70` | **Dead primary CTA** — no JS binding (`grep header-design-agent-cta` in `dtp-design-agent.js` → 0 matches). Clicking scrolls to top. |
| Header logo | `index.html:52` | dead (acceptable-ish) |
| Privacy link in offerte consent | `index.html:334` | compliance gap |
| Footer: brand logo, FAQ, Materialen, Ontwerp je bus, Algemene Voorwaarden, Privacybeleid | `index.html:383,412-414,436-437` | 6 dead nav links (original theme had real pages) |

### 3.2 No-logo dead-end (P0, dynamically proven)
Path: type "ik heb geen logo" → rescue chips ("Vet & krachtig / Minimal strak / Badge / round") → pick one → summary "Stap 7 van 7" is reached and `ready_to_generate=true`, but:
- `demo-boot.js:650-651` only stores `sess.draft.logo_file = 'typo-…png'` (a string) — no `File` ever reaches the client;
- `dtp-design-agent.js:351-375` `generateReadinessGate()` hard-requires `state.logoFile` (a real File) → `reason: 'no_logo'`;
- `showComposer()` therefore never renders the confirm card and `explainReadinessBlockIfNeeded()` loops "Upload eerst je logo via 📎 om mock-ups te kunnen maken."
Result: **user without logo can never reach mockups**, directly contradicting the FAQ promise. Evidence: `report-rescue.json` (`confirmCard:false`, `blockedMsgShown:true`, `resultsHidden:true`), screenshot `13-rescue-summary-no-confirm.png`.

### 3.3 Unconnected functions / invisible output
- `renderRecommendations()` is hard-disabled (`dtp-design-agent.js:1915-1919`); `#da-wizard-link` referenced at `:13` does not exist in the DOM; `wizard_deeplink` from `/generate` (`demo-boot.js:766`) is never used. "Aanbevolen voor jouw voertuig" (`index.html:361-364`) can never appear.
- `?da_fixture=results` fixture path (`dtp-design-agent.js:1990-2008`) — dev-only, correctly double-locked.

### 3.4 Endpoint coverage (fetch/AJAX vs stubs)
`dtp-design-agent.js` uses exactly one network layer (`fetchNoCache` → `fetch`, `:386-391`; no XHR) calling 6 routes — **all stubbed** by `demo-boot.js` `handleApi()` (`:877-959`) with the WP REST proxy contract (`fg_design_agent_register_routes()`):

| Route (prefix `wp-json/fg/v1/design-agent`) | Client | Stub | Notes |
|---|---|---|---|
| GET `/chat/opening` | `:919` | `demo-boot.js:887` | OK |
| POST `/chat` (JSON) | `:930` | `:946` | OK |
| POST `/chat/turn` (multipart) | `:954` | `:908` | OK |
| GET/DELETE `/chat/<session_id>` | `:911` | `:920` | OK |
| POST `/generate` | `:1564` | `:936` | serves static fixtures (§2.1) |
| POST `/offerte-request` | `:1727` | `:881` | DEMO STOP by design; settle-on-close returns 400 `{detail:''}` → generic error text after modal close (intended, but UX could be clearer) |

No missing endpoints: nothing in the client calls a route the boot layer does not answer. The "not generating graphics" problem is **content**, not connectivity.

## 4. JavaScript / network errors (runtime verification)

Headless Edge 157.0.4341.60 (`--headless=new --remote-debugging-port=9222`) against `http://127.0.0.1:8901/inspire/index.html`, three full sessions:

| Run | Console errors/warnings | Uncaught exceptions | Failed requests | HTTP ≥400 |
|---|---|---|---|---|
| Desktop 1366×900 full journey (chat→logo→generate→offerte→modal) | **0** | **0** | **0** | **0** (37 responses) |
| Mobile 375×812 full journey | **0** | **0** | **0** | **0** |
| No-logo rescue path | **0** | **0** | **0** | **0** |

- Google Fonts (`fonts.googleapis.com` + `fonts.gstatic.com`) loaded 200 in this environment — external dependency; if blocked, page falls back (font stacks) but brand typography degrades.
- Missing-image fallback pipeline (`demo-boot.js:977-1006`) never triggered (all assets present).
- Sources: `report-desktop.json`, `report-mobile.json`, `report-rescue.json`.
- Non-blocking note: `runGenerate`'s rate-limit copy (`dtp-design-agent.js:1549-1555`) and `isStubMockup` warning (`:1644-1663`) are unreachable in the demo (stub never errors) — fine.

## 5. UX audit of the first screen ("chaotic start" quantified)

Geometry measured at load, 1366×900 (fold = 900px), `report-rescue.json` `geometry` step:

| Element | y-top | height | In first screen? |
|---|---|---|---|
| Demo banner | 0 | 34 | yes |
| Header (logo + STATUS: ONLINE + 2 CTAs) | 34 | 92 | yes |
| Hero (H1 + 3-line sub + 2 CTAs + micro) | 126 | 375 | yes |
| "Wat heb je nodig / Wat krijg je" box | 549 | 268 | partially |
| **Chat block (the actual product)** | **872** | 512 | **header only, at fold edge** |
| **Chat input (first real action)** | **1251** | 44 | **no — 1.4 viewports below fold** |

First-screen density (measured):
- **4 competing CTAs above the fold** (desktop): "Ontwerp je bus" (header), "Start de Wizard" (header), "Start gratis adviesgesprek", "Bekijk voorbeelden" — plus STATUS: ONLINE pseudo-indicator and the demo banner. Mobile 375×812 shows **4 CTAs as well** (incl. sticky "Start adviesgesprek" at y=749): `report-mobile.json`.
- **654 words** and **9 interactive elements** above the fold; page body total 3,724 chars.
- Two different product offers (Wizard vs Design Agent) compete in the header of a page whose only job is the Design Agent chat.
- Journey friction: to the first chat turn a user must (a) disambiguate 4 CTAs, (b) scroll past 1,251px of pitch content; then answer **10 questions** (claimed: "max 5"), upload a logo, confirm a card — first *result* only after ~12 steps.
- First-action time (technical): composer ready in **231 ms** (`report-desktop.json`) — the machine is fast; the *human* first action is buried under ~2.3 viewports of content.
- Mobile page length: 6,629px doc height at 375×812.

Verdict: the "chaotic/overwhelming" complaint is confirmed and quantified. Root cause is content order + competing CTAs (hero/needget/marketing sections before the tool), not rendering bugs. This is the exact target of INS-G2-01 (14-step journey, first action <10 s).

## 6. Mobile / responsive + performance baseline

**Responsive (375×812 emulation, real journey replayed):**
- No horizontal overflow (`scrollWidth 375 == innerWidth 375`) at top, chat, and results — PASS.
- Full journey works on mobile (chips → logo → confirm → 2 mockups) — PASS (`report-mobile.json`).
- Tap targets: main CTAs 44–55px high — PASS; **sub-24px targets**: NL/PL/EN toggle (22px high), "Google-reviews" link (17px), "Terug naar boven" (19px), footer "FlexGrafik" (14px) — fail ≥44px guideline.
- Mobile above-fold: banner 73px (wraps to 2 lines) + header + hero 473px; 4 CTAs visible.

**Performance baseline (localhost, headless — indicative only):**

| Metric | Measured | Budget (program) | Note |
|---|---|---|---|
| LCP (local) | 136 ms | ≤ 2,500 ms | re-measure on Pages in G3 |
| DOMContentLoaded | 128 ms | — | |
| load event | 161 ms | — | |
| Composer interactive | 225–231 ms | — | |
| Console errors | 0 | 0 critical | |
| HTML | 31.0 KB | — | |
| JS (unminified) | **132.1 KB** (`dtp-design-agent.js` 88.4 + `demo-boot.js` 43.7) | per-demo JS budget | minify candidate (P2) |
| CSS (8 files loaded) | **131.5 KB** (incl. `dtp-design-agent.css` 38.6, `zzp-home-vca.css` 30.5) | — | shared css dir also holds `zzp-wizard*.css` 276 KB — not loaded here |
| i18n packs (3 locales, up-front) | 42.2 KB | — | consider loading active locale first |
| Images | page 13 imgs; mockup PNGs 41–67 KB each (1200px wide), portfolio/howitworks webp 9–24 KB | — | good; lazy below fold |
| Total transfer (full journey) | 317 KB | — | `report-desktop.json` |
| CLS risk | results mockup `<img>` rendered **without width/height** (`dtp-design-agent.js:1874-1876`) | CLS ≤ 0.1 | layout shift at results reveal (P1) |

## 7. Components/assets NOT to rewrite (1:1 with originals — protect these)

Verified by SHA-256 byte-comparison against the Secure-Quarantine originals and the engine repo:

| Asset | Status | Hash / size |
|---|---|---|
| `public\demo\zzpackage\js\dtp-design-agent.js` | **byte-identical** to `flexgrafik-wizard-theme\assets\js\dtp-design-agent.js` | SHA-256 `8F5FD4B3…87136`, 88,411 B |
| `public\demo\zzpackage\inspire\zzp-style.css` | **byte-identical** to theme `style.css` | SHA-256 `9F8582A0…B764BE`, 11,228 B |
| `public\demo\zzpackage\css\*.css` (all 16 incl. `dtp-design-agent.css`) | 1:1 with theme `assets\css\*` (sizes match exactly) | e.g. `dtp-design-agent.css` 38,645 B |
| `public\demo\zzpackage\inspire\data\i18n\chat\{nl-NL,pl-PL,en-GB}.json` | **byte-identical** to engine `brain\i18n\chat\*` | SHA match on all 3 |
| `public\demo\zzpackage\inspire\index.html` copy blocks | verbatim from `page-voertuigreclame-ontwerp.php` (hero, needget, compare table, offers, FAQ) | diff-verified |
| Engine packs referenced by demo-boot (verbatim strings): `brain\product-ladder.json`, `brain\tier-matrix.json`, `brain\trust-pack.json`, `engine\v4\intake\agency_copy.py`, `engine\v4\recommendation\recommend.py`, `engine\v4\intake\visual_analyzer.py` | do not re-word without engine parity | `demo-boot.js:114-177` |

Rewritable demo layer (not original): `inspire\demo-boot.js` (stub layer — but keep the `fg-design-agent-api.php` request/response contract intact), `inspire\assets\*` (demo images), `inspire\index.html` chrome (banner/modal/footer) — per task scope these changes belong to G2 (INS-G2-01), not this audit.

## 8. Definition of Excellence (DoE) — INSPIRE

| Area | Current standard (measured) | Target standard (measurable) |
|---|---|---|
| **Functionality** | 18/23 features fully work; generation = static fixtures; no-logo path dead-ends; recommendations unreachable | 100% of promised features functional: logo composited into previews, no-logo path completes to mockups, recommendations or removed from promise; every visible CTA has an action |
| **UI-vs-real** | 9 documented discrepancies (§2), incl. fabricated "white bus/Ypenburg" analysis | 0 unfulfilled promises: every claim on the page backed by an executed behaviour; personalised output reflects user's logo/name/CTA; no invented facts in chat copy |
| **UX / first action** | chat input at y=1251 (desktop); 4 competing CTAs; 654 words above fold; 10 questions ("max 5" claimed) | First action ≤10 s: chat/first input above the fold at 1366×900 **and** 375×812; exactly 1 primary CTA above fold (SR-04); question count matches its claim (or claim fixed); secondary sections collapsed/accordion |
| **AI output** | canned vehicle photos, identical for all users; "Groeirichting" logic works | every preview contains user's logo + company + active CTA text (engine `compose_ref`/`quick_preview` semantics); disclaimer shown; first-pass visual QA gate (INS-G2-04) |
| **Errors** | 0 console errors / 0 exceptions / 0 failed requests in 3 full runs | maintain: 0 critical console errors, 0 unexpected failed requests per E2E run; every dead-end (no-logo, empty budget, expired session) has a recovery path; error copy matches product reality (e.g. no "aanvraag mislukt" when the user intentionally stopped at demo modal — label as "demo — niet verzonden") |
| **Mobile** | no horizontal overflow; journey works; 6 targets <24px; 4 CTAs above fold | 375/390/768/1024/1366 validated; all tap targets ≥44px; 1 CTA above fold; doc height reduced via section folding; mobile LCP ≤2.5 s on throttled 4G |
| **Performance** | LCP 136 ms local; JS 132 KB unminified; CSS 131 KB; 317 KB journey total | LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 on Cloudflare Pages (mobile throttled); JS ≤150 KB after minify (or ≤80 KB target); every `<img>` has width/height; i18n lazy per locale |
| **Security / privacy** | static demo; PII (email/phone) cached in `sessionStorage` (`daOfferte:*`); logo bytes in IndexedDB; consent checkbox present but Privacy link dead | Privacy link resolves; documented retention + delete path (AVG: 90-day, delete webhook) before any live agent; no PII persisted beyond session without consent record; headers (CSP etc.) verified on Pages |
| **A11y** | skip-link, aria-live chat, aria-pressed lang toggles, `details/summary` FAQ, screen-reader-text in table | axe/Lighthouse ≥95; focus trap in demo modal; visible focus rings on chips/composer; lang toggles ≥44px; contrast of `.da-mockup-card__badge` verified |
| **Production readiness** | demo-only; offerte stops at modal; JSON-LD points to dead WP asset URLs | readiness score ≥90/100 with 0 auto-fail (INS-G3-04); E2E commercial suite green (INS-G3-01); JSON-LD/OG valid for live domain; Commander sign-off |

## 9. Baseline metrics block (for readiness scoring)

```
INSPIRE BASELINE — 2026-11-18 (localhost :8901, headless Edge 157)
Functionality:    18/23 features full · 3 partial · 3 broken (generate content, no-logo path, recommendations/header-CTA)
UI-vs-real gaps:  9 documented (2 critical: mockup generation, no-logo dead-end)
Console errors:   0 (3 full runs)          Uncaught exceptions: 0
Failed requests:  0                        HTTP>=400: 0
LCP (local):      136 ms                   DCL / load: 128 / 161 ms
Composer-ready:   231 ms (desktop) / 225 ms (mobile)
First-action UX:  input at y=1251px (desktop, fold 900) · 4 CTAs above fold · 654 words above fold
Journey steps to result: 10 chat turns + confirm + generate (claim says "max 5 vragen")
Mobile 375:       overflow=none · journey pass · 6 tap targets <24px · doc 6629px
Payload:          HTML 31KB · JS 132KB (unmin) · CSS 131.5KB · i18n 42KB · journey total 317KB · mockup PNG 41–67KB (1200w)
Broken links:     9 × href="#" (incl. consent Privacy link + header primary CTA)
1:1 protected:    dtp-design-agent.js (SHA 8F5FD4…) · zzp-style.css (SHA 9F8582…) · 16 css files · 3 i18n packs (SHA match brain/)
Readiness (current, indicative): Functionality 12/25 · UX/Visual 8/20 · AI/Output 2/15 · Security 8/15 · Perf 8/10 · Mobile/A11y 6/10 · Maintain 4/5 = 48/100
```

## 10. Priority fixes (root-caused)

### P0 — blocks the product promise (fix before/at G2 start)
| # | Fix | Root cause | Evidence |
|---|---|---|---|
| P0-1 | **Make generation produce user-specific graphics** (logo + bedrijfsnaam + CTA on vehicle) or re-label output honestly | `demo-boot.js:727-768` `handleGenerate()` serves static `assets/mockup-<vehicle>-*.png`; engine's real composition (`engine\compose_ref.py`, `quick_preview.py`, `inspiration\generator.py`) is not wired; nothing consumes the uploaded logo bytes | §2.1, `04-results-desktop.png` |
| P0-2 | **Unblock the no-logo journey** (generate typo-based previews, or gate earlier with an alternative) | `generateReadinessGate()` requires `state.logoFile` (`dtp-design-agent.js:358`) while rescue path only sets `draft.logo_file` string (`demo-boot.js:651`); contract gap between stub and original client | §3.2, `report-rescue.json` |
| P0-3 | **De-chaos first screen**: one primary CTA (SR-04), chat/first input above the fold, fold "Wat heb je nodig" + marketing sections, align question count with claim | content order in `index.html:83-141` + hero/header CTA overload; measured y=1251px to input, 4 CTAs, 654 words, 10 vs "5" questions | §5, `report-rescue.json` geometry |
| P0-4 | **Wire or remove dead primary CTA** "Ontwerp je bus" (`#header-design-agent-cta`) | `href="#"`, zero JS binding | §3.1 |
| P0-5 | **Remove fabricated analysis copy** ("Zie hem — wit bus", "Witte Caddy Ypenburg — foto + logo geüpload") | hardcoded strings: `demo-boot.js:526-551`, `dtp-design-agent.js:830`; trust-destroying when user's bus is not white/Caddy | §2.3 |

### P1 — trust & conversion integrity
| # | Fix | Root cause |
|---|---|---|
| P1-1 | Render `recommended_products` + `wizard_deeplink` or delete the dead "Aanbevolen" block | `renderRecommendations()` hard-hides (`dtp-design-agent.js:1915-1919`); `#da-wizard-link` missing in HTML |
| P1-2 | Fix 9 dead `href="#"` links — especially consent **Privacy** link and footer legal links | static port dropped WP `home_url()` targets |
| P1-3 | Unify offerte promise ("<2u" vs "48 uur" vs "<2u" in success copy) | `index.html:90` vs `:320` vs `dtp-design-agent.js:89-90` |
| P1-4 | Single SSoT for budget chip IDs (pack `budget.range` vs `EDIT_CHIP_OPTIONS`); align `premiumReason`/`premiumGrowth` ID sets | `dtp-design-agent.js:294-305` vs `nl-NL.json`; `demo-boot.js:335-353` |
| P1-5 | Localise hardcoded NL strings in JS flows (results header, gate messages, dropzone, upload confirm) for PL/EN | `dtp-design-agent.js:54-98` partial I18N, `:830,1477,1653` |
| P1-6 | Add `width/height` to generated mockup `<img>`; reserve aspect-ratio box | `dtp-design-agent.js:1874-1876` (CLS ≤0.1 budget) |
| P1-7 | PII handling: `sessionStorage['daOfferte:*']` caches email/phone; IndexedDB stores logo bytes — document retention + delete (AVG) before live | `dtp-design-agent.js:1750-1759,856-909` |

### P2 — polish / production hygiene
| # | Fix | Root cause |
|---|---|---|
| P2-1 | Minify/serve production JS (132 KB unminified) and drop unused CSS surface for this page | raw theme assets reused 1:1 |
| P2-2 | Fix JSON-LD logo URL (`zzpackage.flexgrafik.nl/wp-content/themes/…` — dead WP path) and add OG image per repo standard | `index.html:444-460` |
| P2-3 | Demo-modal close currently surfaces "Offerte aanvragen mislukt" — replace with explicit "demo — niet verzonden" success-ish state | `demo-boot.js:867-875` settles via failure path by design |
| P2-4 | Load i18n for active locale first (42 KB up-front for 3 packs) | `demo-boot.js:72-83` |
| P2-5 | Sub-24px targets (lang toggles 22px, footer links) → ≥44px | `dtp-design-agent.css`/`zzp-chrome.css` sizing |
| P2-6 | Session-expiry copy promises "max 2 uur" server TTL — demo uses per-tab sessionStorage; align wording in demo context | `dtp-design-agent.js:69-71` |

---
*Audit artifacts: `C:\Users\FlexGrafik\AppData\Local\Temp\opencode\audit-inspire\` (13 screenshots + `report-desktop.json` / `report-mobile.json` / `report-rescue.json`). No repo files modified except this report.*
*Next: INS-G2-01 (journey redesign, uses §5 + DoE) · INS-G2-03/04 (generation lifecycle + quality gate, uses §2.1) · INS-G3-03 (CWV on Pages).*

# PORTAL (ZZPackage home / front-page) — G0 Deep Product & Technical Audit + Definition of Excellence
Task POR-G0-01 · Date 2026-11-18 · Method: static deep-read + programmatic link/image audit (read-only subagent; runtime harness listed as verification checklist)
Targets: `public/demo/zzpackage/portal/` (index.html 47.7 KB, zzp-style.css) + shared `../css`, `../images`
Original source ref: `flexgrafik-wizard-theme\front-page.php` (30 KB) + footer.php/header.php

## 1. Functionality inventory (static page; zero JS beyond sticky-header handler)
| # | Section / feature | Status | Evidence |
|---|-------------------|--------|----------|
| 1 | Hero + primary CTA "Start de Wizard" → `../wizard/` | WORKS | index.html:93-95 (link resolves) |
| 2 | Design Agent promo (P2-11) → `../inspire/` | WORKS | index.html:115-129 (target exists) |
| 3 | Spec bar (33+ bedrijfswagens · 10 werkdagen · €199 · 5,0) | WORKS (static) | index.html:134-152 |
| 4 | Status Inspectie voor/na comparison | WORKS (static) | index.html:157-191 |
| 5 | Protocol 5-step carousel | WORKS (static; swipe = CSS) | index.html:204-247 |
| 6 | ROI panels (SITE-03 compliant — unverified claims removed, comments :143,282,292) | WORKS (static) | index.html:269-307 |
| 7 | Hardware catalog: 7 module cards → `../wizard/?step=1..7` | PARTIAL — page loads, step param dead (see §2) | index.html:321-362 |
| 8 | Trust: 3 panels + Google-reviews carousel (6 cards) + badges (iDEAL/KvK/Rotterdam/10 dagen) | WORKS (static) | index.html:387-514 |
| 9 | Game section → `../../bouwplaats/` + coupon hint `../wizard/?coupon=WINCODE123` | WORKS (coupon falls back to raw-code label in wizard demo-boot) | index.html:522-548 |
| 10 | ZZP Systems Hub blog (2 articles + "Alle artikelen") | BROKEN — all `href="#"` | index.html:578-606 |
| 11 | Footer nav + legal + JSON-LD | PARTIAL — 4 nav + 2 legal dead (`#`) | index.html:648-678 |

Business-action assessment (Wizard-only funnel, €199 min): primary action "Start de Wizard" is unambiguous — repeated 4× (hero, protocol, catalog, footer) + 7 catalog deep links + 2× free "Ontwerp je bus" (inspire lead magnet) + game engagement + WhatsApp. Ladder is coherent; gaps: catalog deep links land on wrong step (P1), blog hub promises content that doesn't exist (P1), no in-hero contact route (footer-only WhatsApp) — acceptable per Wizard-only strategy.

## 2. UI-vs-real discrepancies · dead interactions · unstubbed endpoints
- **7 × `../wizard/?step=N` deep links are functionally dead** (all land on wizard step 1): wizard-1-3.js has no query-param step handler (grep: zero `location.search` reads); original PHP never read `$_GET['step']` either (only page-voertuigreclame-ontwerp.php emitted it). UI claims "configure this category", reality = generic start.
- **13 × `href="#"` dead links**: 2 blog titles, "Lees artikel" ×2, "Alle artikelen", footer brand logo, FAQ, Materialen, Algemene Voorwaarden, Privacybeleid (index.html:578-678). Banner claims "de site werkt volledig" — overstated.
- **Unstubbed endpoints: none** — portal is fully static (no forms, no fetch); its only script is the sticky-header handler (index.html:705-717).
- No `og:image` (og:title/desc/type only, index.html:22-24); JSON-LD asserts legacy `zzpackage.flexgrafik.nl` URLs (:684-700).
- Image naming fragility: `../images/ap_002.png` lowercase vs SKU AP-002 (exists on disk, but case-fragile under Linux deploys); hero visual uses `home-hero-na-pakket-mobile.webp` on desktop too (:107).

## 3. JS / network errors
Zero external JS → zero JS error surface. External requests at load: Google Fonts only. Programmatic audit: **all 18 image sources + 7 stylesheet links resolve**; all internal page links resolve (portal ↔ wizard ↔ inspire ↔ bouwplaats cross-links verified).
**Runtime checklist (to be executed):** headless Edge on `/portal/` at 1440px + 375px: console clean, network clean, carousel swipe, coupon-hint link `../wizard/?coupon=WINCODE123` → wizard banner, screenshots to `%TEMP%\opencode\audit-portal\`.

## 4. Link audit (all internal links resolve)
Internal OK: `../wizard/` (+7 × `?step=N`), `../inspire/`, `../../bouwplaats/`, 7 CSS, `zzp-style.css`, all images. External: flexgrafik.nl ×3, wa.me, share.google (reviews), Google Fonts. Dead: 13 × `#`. Back-to-top `#page` OK.

## 5. Mobile / responsive + perf baseline
Viewport meta ✓; zzp-home-vca.css 14 @media rules + components 8; swipe carousels (`home-swipe-carousel` CSS scroll-snap — verify swipe at runtime); review track horizontal scroll. Payload: HTML 47.7 KB + CSS 93 KB + eager images ≈ 461 KB (`zzpackage-logo-primary.png` **146 KB PNG**, hero webp 178 KB, 4 module heroes 29/53/15/40 KB) + fonts ≈ **0.6 MB initial**; lazy below fold (steps images, game promo 26 KB, iDEAL 109 KB PNG).

## 6. Assets / components NOT to rewrite
`../css/zzp-home-vca.css` (carousel/review/scroll-snap behavior), `../css/*` shared layer, `../images/**`, review-card markup (HOME-TRUST-01 mirror of flexgrafik JSON), JSON-LD block, SITE-03 comment markers (audit trail of claim removals — keep), protocol/ROI copy (canon-approved).

## 7. Definition of Excellence (DoE)
| Dimension | Current | Target |
|---|---|---|
| Functionality | 9/11 sections fully functional; blog hub + step links broken | 11/11 — no dead destination anywhere |
| Business action | Clear wizard-only CTA ladder | every catalog card lands on its step; blog hidden until real |
| UX | Banner overstates ("werkt volledig") | copy matches reality (demo-accurate banner) |
| UI fidelity | 1:1 vs front-page.php (verified section order) | maintain 1:1 |
| Errors | 0 JS; 0 broken assets | 0 console, 0 404 (runtime-verified) |
| Mobile | 14 @media rules; swipe unverified | 375 px pass + carousel swipe evidence |
| Perf | ≈ 0.6 MB initial; 146 KB + 109 KB PNGs | ≤ 300 KB initial; WebP logos; LCP ≤ 2.5 s |
| Security | Static, no forms, no secrets | keep; JSON-LD = demo host |
| A11y | skip-link, aria labels on carousels/reviews | heading order + contrast audit pass |
| Production | Static under /demo/zzpackage/portal/ | build gate + OG image for route |

## 8. Baseline metrics
Files: 2 (index 47.7 KB, css 11.2 KB) + shared css 93 KB. Sections 11 · CTAs wizard 7+4 · dead links 13 · images 18/18 resolve · external deps 2 (fonts + share.google) · og:image 0 · JSON-LD 1 (Organization) · @media 22 (home-vca+components) · eager image weight 461 KB.

## 9. Fix priorities (root cause)
- **P0 — none.** Primary conversion path (→ wizard) fully functional.
- **P1a** `?step=1..7` deep links land on step 1 (root cause: parameter never implemented in wizard app; portal keeps advertising it) → implement param handling in wizard **demo-boot.js** (no original-JS edits) or rewrite cards to `../wizard/` + in-page anchor.
- **P1b** 13 dead `#` links incl. entire blog hub (root cause: front-page.php emitted `#` placeholders for unbuilt WP routes) → hide blog hub in demo or link flexgrafik.nl blog; repoint legal/FAQ/Materialen to flexgrafik.nl or remove from demo footer.
- **P1c** Banner claim "de site werkt volledig" vs dead links (root cause: demo-chrome copy written before link audit) → adjust banner copy.
- **P2a** No og:image for route (repo guardrail #8) → add OG image via scripts/generate-og.mjs pattern.
- **P2b** Oversized PNGs: logo 146 KB, iDEAL 109 KB (root cause: original theme assets unoptimised) → WebP + lazy.
- **P2c** JSON-LD/OG claim legacy domain on quietforge.nl route.
- **P3** `ap_002.png` case-fragile filename; desktop hero uses mobile-named asset (content check with Dowódca).

## 10. Cross-demo findings (from sibling audits)
- **Shared bug:** `?step=N` deep links dead (wizard + portal) — one fix in wizard demo-boot.js serves both.
- **Shared bug:** dead `#` footer links across wizard/portal (10 + 13) — one footer strategy serves both.
- Naming drift GAME: "Bouw je Imperium" vs "Bouwplaats Chaos" (L4 decision).

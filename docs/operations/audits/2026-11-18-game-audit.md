# GAME (Bouw je Imperium / Bouwplaats Chaos) — G0 Deep Product & Technical Audit + Definition of Excellence
Task GAM-G0-01 · Date 2026-11-18 · Method: static deep-read of demo build + original `app.flexgrafik.nl` source + repo's own test/Lighthouse artifacts (read-only subagent; runtime play listed as verification checklist)
Targets: `public/demo/bouwplaats/` (index.html 8.4 KB, demo-boot.js 14.5 KB, assets/, sw.js, manifest.json, spelinstructie.html, spelreglement-winnaars.html)
Original source ref: `Secure-Quarantine\...\app.flexgrafik.nl\src\` (GameContainer.tsx, GameHUD.tsx, config/levels.ts, engine/physics.ts)

## 1. Functionality inventory
| # | Feature | Status | Evidence |
|---|---------|--------|----------|
| 1 | Complete production bundle (React 19 + Vite + Canvas engine) | WORKS | assets/index-CsBjo9Q_.js 193 KB + heavy-app-xM6nLHG8.js 275 KB + vendor 3.9 KB + engine-adapter chunk 2.1 KB; all 34 bundle-referenced assets exist (programmatic check) |
| 2 | API layer — 5 endpoints stubbed per fg-game-api.php v1.3 contract | WORKS | demo-boot.js:100-131: GET /start-game nonce, GET /leaderboard (fixtures 890/420/420 + `flexgrafik_leaderboard_my_scores` merged, 'Gast (Bouwer)' excluded), POST /leaderboard (DEMO STOP + `{id, rank}` 201), POST /leads (DEMO STOP + `{status:'ok'}` 201), POST /game-token (deterministic 64-hex token, demo-boot.js:137-150) |
| 3 | Game→Wizard reward bridge (utm, ?coupon=GAME10, score/lvl/brand/email/token) | WORKS | URL-constructor patch demo-boot.js:239-252 covers wizardBridge.ts:31-61 (all builders use single-arg `new URL(fullString)`); maps to `../zzpackage/wizard/` which handles ?coupon= |
| 4 | Absolute-href rewrite at click time (/spelinstructie.html, /spelreglement-winnaars.html, /?view=ranglijst) | WORKS | demo-boot.js:257-270; target files exist and are already demo-adapted (spelinstructie.html:511 → `../zzpackage/wizard/…`, :527 → `index.html?view=ranglijst`; App.tsx:173-179 handles `?view=ranglijst`) |
| 5 | PWA (manifest + SW) | NEUTRALISED BY DESIGN | sw register → inert stub (demo-boot.js:277-301); sw.js absolute-path cache cannot run under demo subpath |
| 6 | Demo banner height → `--demo-banner-h` (fullscreen 100dvh layout) | WORKS | demo-boot.js:307-318; index.html:118-121 |

## 2. UI-vs-real discrepancies · dead interactions · unstubbed endpoints
- **Unstubbed endpoints: none.** Remaining external calls: Google Fonts and `challenges.cloudflare.com/turnstile/v0/api.js` (heavy-app bundle) — see soft-lock risk below.
- **Turnstile sitekey baked into demo bundle** (`0x4AAAAAADMBQ0-S9VoqOC_k`, found in index-CsBjo9Q_.js). EntryGate submit is `disabled` without a token (EntryGate.tsx:313, validate :96-101). If quietforge.nl is NOT in that sitekey's hostname allowlist, the widget errors → registration path blocked. **Mitigation present:** "SPELEN ALS GAST" (entry-gate-guest) and post-game "OVERSLAAN & VERDER" bypass buttons (EntryGate.tsx:315-323). Registration is the only flow with a runtime dependency on a third party.
- og/canonical/twitter metadata point to dead `https://app.flexgrafik.nl/...` (index.html:12-26) — replica-fidelity artifact on a quietforge.nl route.
- Dead files in demo: `scripts/analytics-pixel.js`, `scripts/analytics-gtag.js` (zero references), `.htaccess` (Apache-only; CF Pages ignores), `sw.js` (inert by design).
- Naming inconsistency: `<title>` "Bouw je Imperium" (index.html:6) vs demo modal "Bouwplaats Chaos" (index.html:138).

## 3. JS / network errors
Static: all asset paths resolve, incl. `assets/ikony-gry/*` (rebuilt relative in bundle — verified context `assets/ikony-gry/${e}.webp`), audio `bgm_loop.mp3/.ogg`, `slang_sprite.mp3` (BGM-LICENSE.md present). Bundle contains zero absolute `/assets/…` strings (Vite rebase verified). Expected console: none on load; demo-boot swallows storage errors. Service-worker registration promise resolves via stub (no unhandled rejection).
**Runtime checklist (to be executed):** headless Edge walk: registration (Turnstile widget success/error), guest entry, full run L1→L5 incl. boss, game-over → "Score opslaan" → DEMO modal + `Score opgeslagen!` snackbar, ranglijst with fixture+local rows, wizard handoff link → ../zzpackage/wizard/?coupon=GAME10 banner, pause (ESC + button + tab blur), restart, mute, spelinstructie links, `?view=ranglijst`. Capture console + network + screenshots to `%TEMP%\opencode\audit-game\`.

## 4. Gameplay completeness (source + test evidence)
- **Completion path:** 5 levels — Klusser 500, Reputatie Opbouwen 1200, Professionalisering 2200, Expansie 3200, Belasting-Eindbaas 4200 (levels.ts:51,189,397,618,816; monotonic, `levelsMinScore.test.ts`). `levelProgress=(score−prevMin)/span` (physics.ts:291-299) → ≥1.0 → LEVEL_FINISH_SEQUENCE (eased deceleration + autopilot slide + micro-hang fix physics.ts:90-143) → LEVEL_CHALLENGE (Balance/Default/TapMash overlays + BossFight at progress 0.8, physics.ts:400-403) → next level.
- **Game over:** energy ≤ 0 → −1 life / 10 s ("ENERGIE OP"), lives ≤ 0 → GAME_OVER (physics.ts:606-630) → NewGameOverOverlay with score, reward tier (currentLevelId SSoT since v1.0.2), restart (`RESTART_GAME`, GameContainer.tsx:612) with iOS transitionend backup (NewGameOverOverlay.tsx:119).
- **Pause/restart:** ESC toggle + PauseOverlay + auto-pause on tab blur (GameContainer.tsx:193-223); e2e `mute-pause-buttons.spec.ts`, `game-over-restart.spec.ts`.
- **Score correctness:** checkpoint-based, monotonic minScore bands, reward-tier single source of truth (CHANGELOG 1.0.2 fixes), `physics.stats.test.ts`, `levelsMinScore.test.ts`.
- **Input:** Space/ArrowUp jump + tap/pointer (InputManager.ts:30-76); keyboard on choice/boss overlays; focus trap (useFocusTrap.ts).
- **Audio:** WebAudio synth + BGM loop, mute toggle, iOS lazy-init + hint banner (GameContainer.tsx:151-191).
- **Mobile:** safe-area insets (index.html:61-67), `touch-action:none`, mobile playfield split (gameLayout.ts), e2e mobile-viewport / player-visibility-mobile / mobile-pwa-audit / topbar-cookie-mobile.
- **Soft-lock guards:** forceSafetyCleanUp in finish sequence (physics.ts:93), challenge-dispatch ref guard F10 (GameContainer.tsx:310-321), tutorial auto-dismiss on CHOICE (CHANGELOG 1.0.1), GameErrorBoundary + ErrorBoundary with "Probeer Opnieuw".
- **Evidence base:** 31 Playwright specs (e2e/) incl. diamond-smoke, level-challenge-smoke, 5 pickup regressions, security-leaderboard — game is completable and regression-guarded. Residual runtime risks: Turnstile (registration only) and challenge/boss dispatch timing (covered by e2e).

## 5. Mobile / responsive + perf baseline
Repo's own Lighthouse mobile (2026-06-05, Vite preview, `lighthouse-mobile.json`): **Perf 0.70 · A11y 0.95 · BP 0.96 · LCP 7 465 ms (score 0.04) · FCP 2 807 ms · TBT 25 ms · CLS 0 · TTI 7 546 ms**. Repo budget (`lighthouse-budget.json`): prod perf ≥ 55, LCP ≤ 8 200 ms, CLS ≤ 0.05, bundle 136 KB gzip baseline + 50 KB tolerance. **DSaaS program budget LCP ≤ 2.5 s: FAILS by ~3×.** Payload: JS 472 KB + CSS 58.6 KB + demo-boot 14.5 KB + preloaded bg_bouwplaats.webp 202 KB (+ sprite/platforms/menu webps lazy).

## 6. Assets / components NOT to rewrite
`assets/**` built bundle incl. hashed chunk names and `__vite__mapDeps` wiring (engine-adapter ↔ heavy-app ↔ index); `sprite-player-main.webp`, `platforms/platform-L*.webp`, `bg/*` city layers, `menu/reward-*.webp`, `ikony-gry/*` (referenced via constants.ts:913 template); `audio/*`; `spelinstructie.html` + `spelreglement-winnaars.html` (already demo-adapted — treat as content, not code); `sw.js` + `manifest.json` (inert/relative); `demo-boot.js` endpoint contract + DEMO STOP copy; demo modal markup.

## 7. Definition of Excellence (DoE)
| Dimension | Current | Target |
|---|---|---|
| Functionality | Full 5-level run + boss + rewards + wizard bridge reachable | same + runtime evidence video of full run |
| Gameplay | Completable per e2e; soft-lock guards present | 0 soft-locks in scripted full-run + random-input soak |
| UX | Demo modal + banner honest; naming drift (Imperium/Chaos) | consistent product naming; one modal per submit (already) |
| Errors | 0 expected console errors | 0 errors, 0 unexpected failed requests (Turnstile aside) |
| Mobile | Safe-area + split playfield; e2e-verified | 375 px + iPhone-class viewport screenshots pass |
| Perf | LCP 7.5 s mobile | LCP ≤ 2.5 s (or explicit Dowódca-approved budget exception) |
| Security | No secrets; stubs local; Turnstile token external-only | Turnstile allowlist confirmed or guest-first |
| A11y | A11y 0.95; focus traps; aria announcements | ≥ 0.95 maintained; keyboard-only full run |
| Production | Static demo; SW neutralised | build gate green; demo-stop evidence per POST |

## 8. Baseline metrics
90 files / 2.8 MB total. JS 472 KB · CSS 58.6 KB · audio 870 KB · backgrounds ~350 KB · icons 24 · e2e specs 31 · unit tests incl. CollisionSystem/PhysicsEngine/SpawnManager. Fixture leaderboard rows 3; rewards GAME10/STICKER1/TSHIRT2/WINNER (levels.ts wizardReward; mainMenuCopy PROMO_CODES). Dead files 3 (2 analytics scripts + .htaccess). Unstubbed endpoints 0. Referenced assets missing 0.

## 9. Fix priorities (root cause)
- **P0** — none blocking play (guest path bypasses registration). **P0-verify:** Turnstile sitekey `0x4AAAAAADMBQ0-S9VoqOC_k` hostname allowlist must include the demo host, else registration dead-ends (root cause: prod-baked env `VITE_TURNSTILE_SITE_KEY` in demo bundle). If not allowlisted → P0 fix: force guest path or mock token in demo-boot.
- **P1a** LCP 7.5 s vs 2.5 s budget (root cause: 472 KB JS + 202 KB image on critical path, LCP element behind React boot despite lcp-shell) → code-split/lazy heavy-app, preload LCP image only, defer fonts.
- **P1b** Metadata canonical/OG/Twitter → dead app.flexgrafik.nl (root cause: replica metadata) → point to quietforge.nl demo route or add demo-canonical override.
- **P2a** Product naming drift "Bouw je Imperium" vs "Bouwplaats Chaos" (demo modal) — pick one (L4 naming decision).
- **P2b** Remove/quarantine dead `scripts/analytics-*.js` (root cause: leftover from prod build pipeline).
- **P3** `.htaccess` + sw.js retained as inert artifacts — document as "do not deploy expectations".

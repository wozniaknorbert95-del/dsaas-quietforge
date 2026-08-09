# Handoff — Facebook Live Completion (2026-07-01)

**Repo:** services.flexgrafik.nl · **Scope:** Live FlexGrafik Facebook page only (no code deploy)

## Cel / Goal

Execute the Facebook Live Completion plan: bring the live FlexGrafik page to a credible NL ZZP relaunch state using `docs/strategy/facebook/` v2.0 canon — profile copy, Post #1 publish + pin, live QA.

## Co zrobiono / What changed (live Facebook)

### ✅ Completed on-platform

| Item | Status | Notes |
|------|--------|-------|
| Short bio (NL) | ✅ Live | FB 255-char limit; truncated safe NL copy with wizard + flexgrafik.nl links |
| Post #1 — *Wij zijn terug — en anders* | ✅ Published | Native page composer; full NL text from `content-themes.md` |
| Post #1 media | ✅ Link preview | Wizard OG card (`Start je Branding Wizard — ZZPackage`); file upload blocked in browser agent |
| Post #1 pinned | ✅ Live | Visible in **Wyróżnione** section on page timeline |
| Website links in intro | ✅ Live | `zzpackage.flexgrafik.nl/wizard/` + `flexgrafik.nl` show under page name |
| Safe claims only | ✅ Verified | No erkapremium, no Quietforge/B2B language in bio or Post #1 |

### ⚠️ Partial / blocked

| Item | Status | Notes |
|------|--------|-------|
| Long About (`profile-copy.md` § About) | ❌ Not pasted | Prezentacja tab empty; Szczegóły has ratings/hours only |
| Categories | ❌ Still primary *Reklama/marketing* | Full set visible in editor: Reklama/marketing · Usługi lokalne · Usługi poligraficzne; canon wants Drukkerij / Grafisch ontwerper |
| Page languages | ❌ Still Angielski + Polish | Dane osobowe not updated to Nederlands-only |
| CTA button (*Nu bestellen* → wizard) | ❌ Not set | MBS composer CTA options limited to message/call; page-level CTA not configured |
| Cover photo | ❌ Old EN marketing cover | Still shows legacy EN collage |
| Jadzia COI test post | ⚠️ Not confirmed deleted | Not visible at top of feed after relaunch; verify in Zarządzaj postami |
| Graph API automation | ❌ Blocked | `FB_ACCESS_TOKEN` on VPS expired 2026-06-30 (OAuth 190/463) |

## Pliki / Files

| File | Action |
|------|--------|
| `docs/operations/scripts/fb_live_completion.py` | new — Graph API audit/update helper (needs token refresh) |
| `docs/operations/handoffs/2026-07-01-facebook-live-completion.md` | new — this handoff |
| `.tmp-fb-page-audit.py` | deleted — temp audit script |

## Live QA (2026-07-01)

**Page:** https://www.facebook.com/people/FlexGrafik/61568401273877/

| Check | Result |
|-------|--------|
| Bio NL (not EN *Your Graphics, Our Passion*) | ✅ Pass |
| Wizard URL in intro | ✅ Pass |
| flexgrafik.nl in intro | ✅ Pass |
| Post #1 NL text | ✅ Pass |
| Post #1 pinned | ✅ Pass (Wyróżnione) |
| Post #1 CTA link | ✅ Pass (wizard URL in post + link card) |
| No Quietforge / B2B leakage | ✅ Pass |
| Category aligned to canon | ❌ Fail — Reklama/marketing primary |
| Languages Nederlands-only | ❌ Fail |
| Cover NL/ZZP branding | ❌ Fail — EN legacy |
| Page CTA button | ❌ Fail — not configured |

## Asset readiness (Posts #2–#10)

| Asset | Status |
|-------|--------|
| Post #1 visual | ✅ Wizard OG link preview (interim; canon prefers workshop/team photo) |
| Cover photo (NL ZZP) | ❌ Missing — needs real wrap/workshop shot |
| Montage / install proof | ❌ Missing |
| Wizard screenshot | ✅ Available (`public/gratka/wizard-checkout.png` on quietforge host) |
| Chat screenshot | ❌ Missing |
| Game screenshot | ✅ Available (`public/gratka/lead-magnet-gameplay.png`) |
| Magnets product photo | ❌ Missing |
| Founder/team photo | ❌ Missing |

## Technical notes

- **Browser agent:** `cursor-ide-browser` MCP — logged-in session works; `browser_fill` often stale on FB; use `browser_cdp` + `Runtime.evaluate` for Lexical editors and save clicks.
- **File upload:** CDP filesystem file-input commands denied — cannot attach local images via automation; link-preview path used for Post #1.
- **Graph API:** Refresh `FB_ACCESS_TOKEN` on VPS jadzia-core, then run `fb_live_completion.py update-profile` + `publish-post1` for batch profile fixes.

## Następny krok / Next steps

**Single most sensible Facebook-only task:** Finish profile metadata in one browser pass (or after token refresh):

1. **Informacje → Kategoria** — set primary to *Drukarnia* / *Grafik* (FB PL labels for Drukkerij / Grafisch ontwerper); remove *Reklama/marketing* as primary if FB allows.
2. **Informacje → Dane osobowe** — remove English + Polish; keep Nederlands only.
3. **Informacje → Prezentacja / Szczegóły** — paste long About from `profile-copy.md`.
4. **Ustawienia → CTA** — *Nu bestellen* / Shop now → `https://zzpackage.flexgrafik.nl/wizard/`.
5. **Cover photo** — upload NL ZZP visual (van wrap or workshop; no Quietforge).
6. **Post #2** — only after montage/install photo is ready (publish gate in `content-themes.md`).

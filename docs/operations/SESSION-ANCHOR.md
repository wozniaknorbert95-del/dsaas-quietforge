# SESSION-ANCHOR — Live Session Pointer

**Updated:** 2026-11-17 · **Status:** DEPLOYED · Four doors → demo previews LIVE (następnie: 4 żywe demo)

**Live production:** `b4b54ba` on `main` · Cloudflare Pages CI (MIG-30)

**Live:** https://quietforge.nl/

**Current handoff:** [`handoffs/2026-11-17-demo-wizard.md`](handoffs/2026-11-17-demo-wizard.md) — Demo 1/4 (Wizard) LIVE

**Plan (next — kolejność P1→P4, 1 plan = 1 sesja):**
1. ✅ [`plans/2026-11-17-demo-wizard.md`](plans/2026-11-17-demo-wizard.md) — żywy konfigurator — **LIVE**
2. ⏭ [`plans/2026-11-17-demo-inspire.md`](plans/2026-11-17-demo-inspire.md) — żywy intake (brief → kierunek → mockup → offerte DEMO)
3. [`plans/2026-11-17-demo-game.md`](plans/2026-11-17-demo-game.md) — grywalna gra (5 aktów → kupon → handoff do Wizard)
4. [`plans/2026-11-17-demo-portal.md`](plans/2026-11-17-demo-portal.md) — klikalny portal + guided chooser (hub na drzwi)

**SSoT:** `src/content/lab-demos.ts` (copy demo) + `src/components/demo/*` (dema) + `src/lib/demo/*` (logika frontu)

## CO

Four doors na `/results/flexgrafik/` ma klikalne screeny → strony demo pod `/lab/` (opisowe). Dowódca: docelowo **żywe, działające demo** narzędzia przy każdym kafelku (pełna logika frontu, bezpieczny stop „zamów/wyślij" = komunikat DEMO — firma nie funkcjonuje). Screeny kafelków przygotowuje Dowódca (podmiana PNG).

## NASTĘPNY KROK

1. Sesja: Demo 3/4 — GAME (**w toku** — port app.flexgrafik.nl, plan `plans/2026-11-17-demo-game.md`). ✅ Demo 1/4 (Wizard) + 2/4 (INSPIRE = repliki 1:1) LIVE — `handoffs/2026-11-17-demo-{wizard,inspire}.md`.
2. Claim do decyzji: „2–4 weeks after the scan" (MR-16) — zostawić / złagodzić.
3. Domain sweep (osobno): resztki `quietforge.flexgrafik.nl` w docs/SVG/GA4/vercel.json.

---

# Prior pointer — SMB Clarity W2 (2026-09-16)

**Updated:** 2026-09-16 · **Status:** DEPLOYED · SMB Clarity W1+W2 LIVE

**Commit:** `03de011` on `main`

**Deployment:** `dpl_DzAg7xJYtQQVRMsNeZB9FZn8jePf` · project `flexgrafik-services` · Production

**Live:** https://quietforge.flexgrafik.nl/

**Current handoff:** [`handoffs/2026-09-16-smb-clarity-w2-polish.md`](handoffs/2026-09-16-smb-clarity-w2-polish.md)

**Commit:** `03de011` on `main`

**Deployment:** `dpl_DzAg7xJYtQQVRMsNeZB9FZn8jePf` · project `flexgrafik-services` · Production

**Live:** https://quietforge.flexgrafik.nl/

**Current handoff:** [`handoffs/2026-09-16-smb-clarity-w2-polish.md`](handoffs/2026-09-16-smb-clarity-w2-polish.md)

**Prior:** [`handoffs/2026-09-16-smb-clarity-w1.md`](handoffs/2026-09-16-smb-clarity-w1.md) · Lab `dpl_rxjATdSR5mzj31kj9b7WmroWFV1q`

**Audit source:** [`../audits/2026-09-16/smb-clarity-external-audit.md`](../audits/2026-09-16/smb-clarity-external-audit.md)

## GitHub profile execution (2026-09-06)

- G0 inventory confirmed 22 repositories: 6 public and 16 private after cleanup.
- Profile repository rewritten and pushed as `1b644bf`; `SECURITY.md`, `CODEOWNERS`, topics and description added.
- Profile visual layer added and pushed as `efbceac`: accessible QuietForge system-map SVG in the README.
- `portfolio` rewritten as `PUBLIC PROOF CANDIDATE - HOLD`, pushed as `13309bd`; Next.js updated to `16.3.4`, `npm audit` clean, build passed.
- `quietforge-proof` published as the first public `DEMO` proof; `npm test` PASS and Secret Scanning `0`.
- `dsaas-platform-main-proposed` and `zzpackage-proposed` made private staging repositories.
- `jadzia` made private after GitHub Secret Scanning reported one open `google_api_key` alert in historical commit `919ad1d...`.
- No repositories are approved for pinning yet. `Flex-vcms` remains HOLD because of internal operational references and historical exposure documentation.
- Account display name/bio/website updated through GitHub API after `user` scope authorization.
- Browser walkthrough completed: LinkedIn added, public email hidden, Achievements hidden,
  jobs profile off, private contributions off, and pins set to `dsaas-quietforge` + `quietforge-proof`.

**Next GitHub gate:** Commander revokes/rotates the exposed Google key, then complete G1 account security review and G2 history/IP clearance before any pinning.

## GitHub profile closure (2026-09-06)

- Live Chrome walkthrough completed on `github.com/settings/profile` and the public profile.
- Profile settings: LinkedIn shown; public email, achievements, private contribution count,
  local time and jobs profile hidden/off.
- Profile pins: `dsaas-quietforge` and `quietforge-proof`.
- `todo.json` updated to v2.1.0 with `phase-github-profile` and five promotion tasks.
- Build/typecheck verified after the documentation/todo updates; no production deploy made.

**Profile audit:** [`plans/2026-09-06-github-profile-polish-plan.md`](plans/2026-09-06-github-profile-polish-plan.md)
**Completed:** Profile README v2 copy hierarchy, `Current focus` and CTA order pushed as `ecbb343`.
**Next focused task:** prepare the first sanitized proof candidate; no additional graphics before proof approval.

## Builder's Lab implementation (2026-09-05)

- Added canonical `/lab/` Builder's Lab route for the owner-operated FlexGrafik reference business and build laboratory.
- Added nine-stage build timeline, public test bench, private-reference states, system connection path, dSaaS platform chapter and ownership/handover wording.

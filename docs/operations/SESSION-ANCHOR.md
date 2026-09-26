# SESSION-ANCHOR — Live Session Pointer

**Updated:** 2026-09-26 · **Status:** DEPLOYED · Chrome last-mile (sticky hide + footer microcopy)

**Live production:** `47b6c45` / `dpl_4RdKJYtwhyw2kLWcDFSoNUWnSsku`

**Live:** https://quietforge.flexgrafik.nl/

**Current handoff:** [`handoffs/2026-09-26-chrome-last-mile.md`](handoffs/2026-09-26-chrome-last-mile.md)

**Plan (next):** [`plans/2026-09-26-chrome-polish.md`](plans/2026-09-26-chrome-polish.md) — S1 cookie vs sticky

**Prior:** [`handoffs/2026-09-26-footer-calm.md`](handoffs/2026-09-26-footer-calm.md) · `dpl_4a6mpeDDu3MTGqBf8wGLkzb1VG8V`

**SSoT:** `StickyCta.tsx` + `navigation.ts` footer lists + `Footer.tsx`

## CO

Session 0 shipped: mobile sticky nie blokuje footera. Stopka 11 linków, Scan sample (PDF). Home density = plan S1–S5, nie footer.

## NASTĘPNY KROK

1. S1 cookie vs sticky (first visit @390).
2. LinkedIn PARKED. Hours counter 0.

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

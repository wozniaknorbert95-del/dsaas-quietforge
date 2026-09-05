# Builder's Lab - Implementation Plan

**Date:** 2026-09-05
**Scope:** quietforge.flexgrafik.nl only
**GitHub profile work:** deferred until this plan is shipped and verified

## Executive decision

Build one canonical route:

```text
/lab/
```

Working title:

> Builder's Lab - What I built in a live owner-operated business

Hero direction:

> I built this before I offered it.

The page proves implementation capability: problem -> system -> connected workflow -> controlled operation. It is not a client case study, a repository catalogue, a free-code offer or a replacement for verified QuietForge client proof.

## Specialist staff conclusion

### Strategy and IA

- `/lab/` is the correct route.
- `/proof/` remains the client-proof, methodology and reference-program surface.
- `/about/` remains the founder page, with a bridge to `/lab/`.
- The main header does not gain another item. Keep Systems, Approach, Security, Proof, Pricing and the primary scan CTA.
- `/lab/` is linked from About, Proof, footer and, later, the GitHub profile.
- Do not redirect `/results/owner-ecosystem/` until `/lab/` has matching or better evidence coverage.

### UX and UI

- Use a narrative timeline, not a grid of repositories.
- Desktop: stage rail and detail panel.
- Mobile: accessible vertical accordion, one open stage at a time.
- Group live demos by user journey: Discover, Configure, Play, Design, Operate.
- Keep the current QuietForge language: dark-first, sharp corners, borders, amber accent, controlled density, no decorative gradients.
- Use one primary CTA per section and preserve the existing Automation Scan funnel.

### Proof and content

- Use two separate concepts: `FlexGrafik business` and `FlexGrafik lab`.
- `FlexGrafik` is an owner-operated reference business and build laboratory, not an external client case.
- Canonical proof tiers remain `PROVEN`, `DEMO`, `PLANNED`.
- Add evidence context separately: observable public surface, lab measurement, illustrative example, private reference, architecture only.
- Every number must have source, date, environment, owner and review date.
- Every public link needs a fallback or an honest private/unverified state.

### Technical and SEO

- Use a server-rendered App Router page with one small client component for timeline interaction.
- Store page data in a dedicated `src/content/lab.ts`, not in `systems-catalog.ts` or `ECOSYSTEM_REPOS`.
- Add metadata, canonical, OG image, JSON-LD and sitemap entry.
- Do not fetch external demos during render and do not expose live health checks as proof.
- Use existing Consent Mode v2 analytics with Lab-specific events.

### Governance and commercial boundary

- Public platform wording remains `LAB / TENANT-READY CORE (POC)` until the required platform evidence is approved.
- Public BKG wording must describe architecture and scope, not universal production readiness.
- HITL wording applies to sensitive write, publish and release paths, not every read-only operation.
- Public repository visibility does not grant a licence or imply free reuse.
- Client-specific implementation, reusable QuietForge framework and dSaaS platform core must remain separate in public copy.

## Page architecture

### 1. Hero and honesty gate

Content:

- `// BUILDER'S LAB`
- `I built this before I offered it.`
- One short lead explaining the owner-operated reference business.
- Primary: `Book an Automation Scan`.
- Secondary: `Visit the FlexGrafik reference business`.
- Status panel:
  - `OWNER-OPERATED REFERENCE BUSINESS`
  - `BUILD LABORATORY`
  - `NOT AN EXTERNAL CLIENT CASE`
  - `PUBLIC LIVE SURFACES`

The status panel must appear before technical detail and adjacent to claims about what is live.

### 2. What the lab proves

Three buyer-first statements:

- Complete implementation: a business path can be taken from entry to action.
- Connected systems: portal, game, design intake, Wizard, payment and operations are connected patterns, not isolated screenshots.
- Governed delivery: approval boundaries, testing, security checks, documentation and handover are part of the build.

Do not claim client ROI, market proof, revenue, conversion rate or external customer success.

### 3. Build timeline

Nine milestones, each using the same structure:

```text
Problem
Built
Observable business effect
Test it
Evidence
Status
What was learned
What is not proven
Tenant / ownership boundary
Last verified
```

Recommended sequence:

| # | Milestone | Public evidence | Initial classification |
|---:|---|---|---|
| 01 | FlexGrafik Portal | `https://flexgrafik.nl/` | Observable public surface; qualification path partial |
| 02 | ZZPackage Commerce Surface | `https://zzpackage.flexgrafik.nl/` | Observable public surface |
| 03 | Wizard Cash Engine | `https://zzpackage.flexgrafik.nl/wizard/` | Lab proof; 9 UI screens, 7 business stages |
| 04 | Bouwplaats Chaos Lead Game | `https://app.flexgrafik.nl/` | Lab proof; public game and handoff pattern |
| 05 | FlexGrafik INSPIRE / Design Intake | `https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/` | Partial supervised path; not print-ready output |
| 06 | Jadzia Operations Command Layer | URL to confirm | Private/demo evidence until verified |
| 07 | Agent OS UI / Mission Control | `https://os.flexgrafik.nl/` is auth-gated | Private/demo evidence; not a public anonymous demo |
| 08 | dSaaS Platform Core | Architecture or approved demo only | LAB / TENANT-READY CORE (POC) |
| 09 | QuietForge Tenant | `https://quietforge.flexgrafik.nl/` | Active test tenant and commercial implementation surface |

FlexGrafik as the future second platform tenant must be shown as a planned chapter only until the tenant rollout is actually approved and evidenced.

### 4. Live test bench

Group links by user journey:

- Discover: FlexGrafik portal.
- Configure and buy: ZZPackage and Wizard.
- Play and qualify: app/game.
- Design: INSPIRE.
- Operate: Jadzia and Mission Control with access caveats.

Each card contains:

- what to try in 30-60 seconds;
- proof/status label;
- tenant label;
- last verified date;
- public link or explicit `Private reference` state;
- screenshot/walkthrough fallback;
- privacy/data note.

Known current conditions:

- `os.flexgrafik.nl` is access-gated and must not be presented as an anonymous public demo;
- `os-api.flexgrafik.nl/api/v1/health` must not be promoted while it returns an unhealthy response;
- exact public URLs for Jadzia, Agent OS UI repository and other repositories require confirmation before linking.

### 5. System connections

Show one simple path:

```text
Portal -> Game / Design Assistant -> Wizard -> Payment -> Operations -> Governance -> Tenant Platform
```

Desktop may use an interactive diagram. Mobile gets a vertical text flow. Technical names are progressive disclosure, not the opening message.

### 6. Current platform chapter

Explain at a high level:

- Business Knowledge Graph as the canonical operational truth;
- model proposes, policy evaluates, ledger records;
- human stop for sensitive actions;
- tenant-scoped boundaries;
- difference between platform core and tenant implementation.

Required qualifiers:

- `LAB`;
- `TENANT-READY CORE (POC)`;
- `ARCHITECTURE ONLY` where no public behaviour is demonstrated.

Never use `production-ready` or a security-certification implication without a separate approved evidence record.

### 7. Ownership and handover

Use concise public wording:

> Public repository visibility does not grant a licence or imply free reuse.

> A client receives an agreed client repository, access, documentation and handover. The contract defines which parts are client-specific and which reusable framework remains with QuietForge.

### 8. Final CTA

- Primary: `Book an Automation Scan`.
- Secondary: `Visit the FlexGrafik reference business`.
- No `Get the repo`, `Buy this system`, `Clone it` or free-code CTA.

## Content source of truth

Create a separate Lab manifest with these fields:

- `milestoneId`, sequence, canonical name and public label;
- role: reference business, lab, tenant, platform or internal operation;
- tenant and ownership boundary;
- repository key, canonical URL and visibility;
- public URL, proof route and auth requirement;
- readiness and proof tier;
- evidence class;
- claim text and source file;
- metric value, unit, environment, method and date;
- screenshots, videos and redaction status;
- consent status and data boundary;
- reusable pattern and tenant-specific parts;
- handover/licence treatment;
- limitations, forbidden claims and next review date.

## Canon changes before implementation

This is a hard dependency. The current R7 wording says `Zero FlexGrafik market claims` and only permits a paused lab note on About. Before `/lab/` is built, change the canon to:

> FlexGrafik may be shown as an owner-operated reference business and live build laboratory. It is not an external client case, does not create client-result claims and does not replace verified customer proof.

Required documentation updates:

- `docs/canon/site-map.md`: add `/lab/`, change R7, separate business status from lab status, define entry points.
- `docs/strategy/conversion-pipeline.md`: add `/lab/` as L1 reference proof.
- `docs/canons/strategy-rules.md`: update route/IA rule if required by the chosen canonical map.
- `docs/canons/marketing-rules.md`: only change if a new enforceable proof rule is needed.
- `.agents/skills/strategy-check/SKILL.md` and/or proof skill: sync any changed hard rule.
- `docs/operations/SESSION-ANCHOR.md`: record the new canon decision.

Do not edit the historical `docs/strategy/site-map.md` as if it were the active source. Add a superseded pointer only if needed.

## Implementation sessions

The repository rule is one component per session, maximum three sections, with a build gate after each implementation session.

### Session 0 - decisions and registry

No UI code.

- Approve `/lab/`.
- Approve R7 exception wording.
- Confirm tenant wording and public URL inventory.
- Create the evidence registry.
- Confirm consent/redaction boundaries.

Gate: Commander approval and registry complete.

### Session 1 - route shell and honesty gate

Planned surfaces:

- `src/app/lab/page.tsx`;
- `src/content/lab.ts`;
- hero;
- status/ownership panel.

Gate: typecheck, build, metadata, no unsupported claims.

### Session 2 - interactive timeline

Planned component:

- `src/components/lab/LabTimeline.tsx`.

Requirements:

- SSR summary remains available without JavaScript;
- keyboard navigation;
- `aria-controls`, `aria-expanded`, `aria-current`;
- deep-link anchors;
- mobile accordion;
- reduced motion.

Gate: keyboard and mobile interaction, typecheck, build.

### Session 3 - test bench and evidence states

Planned component scope:

- `LabEvidenceBench`;
- live demo cards;
- public/private/unverified/fallback states;
- system connection flow.

Maximum: three page sections in this session.

Gate: every link and fallback state verified; no auth-gated or unhealthy endpoint presented as public proof.

### Session 4 - platform chapter and ownership

Planned scope:

- platform chapter;
- BKG/policy/HITL/tenant boundary wording;
- ownership and handover panel;
- final CTA.

Gate: governance/proof review and commercial/IP wording review.

### Session 5 - route integration and discoverability

Planned changes:

- About bridge;
- Proof bridge;
- footer link;
- canonical metadata;
- OG image;
- sitemap;
- analytics events;
- navigation/link audits.

The main header remains unchanged.

Gate: route appears exactly once in sitemap, canonical and OG are correct, all entry points resolve.

### Session 6 - full verification

Required checks:

```text
npm run typecheck
npm run lint
npm run build
npm run audit:navigation
npm run audit:menu-footer
npm run audit:links
npm run lighthouse:ci
```

Additional manual checks:

- 375px and desktop layout;
- keyboard timeline and evidence interaction;
- console errors = 0;
- network 5xx = 0 for local page resources;
- one `h1`;
- canonical, OG and JSON-LD in generated HTML;
- `/lab/` in sitemap exactly once;
- no `[FILL:]` placeholders;
- all live links show expected access condition;
- every public claim has an evidence owner and review date.

## Review gates

| Gate | Scope | Pass condition |
|---|---|---|
| G0 | Canon | Route, FlexGrafik exception and tenant wording approved |
| G1 | Inventory | Every repo, URL, visibility and owner confirmed |
| G2 | Evidence | Every claim has source, status and qualifier |
| G3 | Boundary | QuietForge, FlexGrafik, platform and client ownership separated |
| G4 | Security | No PII, secrets, private config or unapproved screenshots |
| G5 | IP/legal | Ownership, licence and handover wording approved |
| G6 | Copy | Buyer-first Problem -> System -> Effect and one primary CTA |
| G7 | Release | Build, typecheck, links, metadata, sitemap and mobile pass |
| G8 | Post-launch | Links and claims have owner, review date and quarterly check |

## Explicitly deferred

- GitHub profile README rewrite.
- GitHub repository rename or visibility changes.
- Publishing a public dSaaS platform repository.
- Redirecting `/results/owner-ecosystem/` before evidence parity.
- Adding `/lab/` to the main header.
- Presenting Jadzia or Mission Control as anonymous public demos before URL/status verification.

The GitHub plan starts only after G7 passes for the website.

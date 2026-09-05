---
status: "[ACTIVE]"
title: "GitHub and Portfolio Materials Audit"
owner: "Norbert Wozniak"
updated: "2026-09-05"
classification: "Audit and remediation plan"
---

# GitHub and Portfolio Materials Audit

## Executive decision

QuietForge should present **implementation systems**, not a catalogue of ready-made repositories.

FlexGrafik is the first owner-operated reference tenant and laboratory. It is evidence that the architecture has been built and run in a real business context, but it is not an external client case and must not be presented as one.

GitHub is the technical evidence layer: it proves engineering discipline, selected reference implementations and delivery transparency. It is not the product catalogue, not the place where every internal asset must be public, and not an automatic promise that a buyer receives the whole repository for free.

## Scope and evidence date

Audited on 2026-09-05:

- QuietForge canonical identity, site map, marketing rules and platform boundary.
- Live `https://quietforge.flexgrafik.nl/` routes, especially `/systems/`, system spokes, `/about/`, `/proof/`, `/security/`, `/pricing/` and `/book-a-scan/`.
- Public GitHub profile `wozniaknorbert95-del` and its public repository list.
- Local portfolio content in `src/content/systems-catalog.ts`, `ecosystem.ts`, `proof.ts` and `readiness.ts`.
- User-provided reference-tenant repository list.

This is a planning audit. No production code, GitHub repository or live deployment was changed.

## Findings

### P0: identity and public inventory do not match

The current GitHub profile says `Architect of autonomous operating systems (Company Brains)` and links a free scan for five companies. The current QuietForge site positions the business as a system builder / conversion systems architect, sells a €690 Automation Scan, and offers a limited reference programme. The GitHub profile also links `/contact`, which currently returns 404.

The public GitHub profile currently exposes eight repositories, including `flexgrafik-app`, `jadzia`, `Flex-vcms`, `dsaas-quietforge`, the profile repository and two `-proposed` repositories. Direct public URLs checked for `zzpackage`, `agent-os-ui`, `flexgrafik-nl` and `flexgrafik-inspire` returned 404. This may mean private repositories, renamed repositories, another owner or missing publication, but it is not safe to link or sell them as public evidence until confirmed.

### P0: one-to-one mapping between nine systems and repositories is false

The nine `/systems/` entries are commercial implementation patterns. They do not map one-to-one to nine repositories:

| System | Current reference shape | Audit status |
|---|---|---|
| Quote & Order Engine | `zzpackage` / Wizard | Lab proof; public repository URL unresolved |
| Inbox Triage | Jadzia / inbox process evidence | No dedicated repository declared in the system registry |
| Lead Scout | `app.flexgrafik.nl`; possible public successor `flexgrafik-app` | Identity and proof link need confirmation |
| Owner Cockpit | Jadzia + Mission Control | Public `agent-os-ui` URL unresolved |
| Publishing Gate | `Flex-vcms` | Public repo exists; README and status need professionalization |
| Build & Release Flow | Agent OS + Jadzia delivery method | Not a standalone public product repository |
| Company Brain | `flexgrafik-meta` / knowledge architecture | New platform offer; no direct public repo proof |
| AI Security Audit | QuietForge security process and reports | Service, not a reusable product repository |
| Custom AI Agent | Scoped Agent OS / Jadzia implementation | Custom delivery pattern, not a generic downloadable agent |

The older eight-repository canon includes `flex-vcms`, `flexgrafik-meta` and `agent-os`, while the user-provided tenant list includes `flexgrafik-inspire` and does not use the same keys. Both lists cannot be treated as the same inventory.

### P1: system pages have examples, but not enough evidence paths

The spoke template already contains a useful structure: TL;DR, cost of inaction, composite example, feature gallery, flow, delivery list and FAQ. Most examples are explicitly illustrative, which is correct.

What is missing is a visible evidence contract for every spoke:

- reference implementation or explicit `no public repository` label;
- live demo, screenshot or deliberate walkthrough;
- exact proof status: lab, pilot, new on platform or client-verified;
- what is reusable, what is tenant-specific and what is built during implementation;
- a direct route to the relevant proof artefact.

Without that layer, a buyer can read a convincing system description but cannot tell whether it is running, a demo, a method or a future build.

### P1: commercial data has a technical inconsistency

The system spoke JSON-LD currently publishes an Offer price of `0`, while the page says `Scan first - then a fixed price` and the site sells a €690 scan. This should be corrected before further promotion. A zero price can be interpreted as a free product or an incorrect commercial claim by search engines and users.

### P1: claims need one evidence ledger

The content contains useful real signals, including the Wizard flow, 142-message test run, VCMS scan and Agent OS gates. It also contains composite examples, market research and estimates. These must be separated in a single registry so that:

- lab measurements are not mistaken for client outcomes;
- illustrative companies are never mistaken for named clients;
- `NEW ON THE PLATFORM` systems are not described as proven;
- external research is sourced or removed from sales copy;
- every public number has an owner, date, source and expiry/review date.

### P1: repository READMEs are not a professional product surface

The public `flexgrafik-app` README describes an ADHD accountability assistant, while the portfolio describes Lead Scout. The public `Flex-vcms` README is partly Polish, contains typos and mixes internal development language with sales positioning. The public `jadzia` description is focused on deployment and rollback, while the portfolio uses Jadzia as an operations command layer. These may all be valid internal views, but their public roles are not currently explicit.

### P2: legacy documentation increases navigation and decision noise

The active canon is `/systems`, `/proof`, `/approach`, `/security` and `/book-a-scan`. Older `results/solutions` documents and runbooks remain in the repository and contain historical URLs and older terminology. They must not be deleted casually, but they need a clear `SUPERSEDED` pointer or archive treatment so agents and future edits do not use them as current truth.

## Target operating model

### QuietForge

QuietForge is the commercial implementation studio and operating model:

1. Automation Scan identifies the highest-value business leak.
2. A fixed-scope system is designed around the buyer's process.
3. The system is implemented in the buyer's tenant and repository.
4. Security, tests, approval gates, documentation and handover are delivered.
5. Optional care keeps the system useful after launch.

### FlexGrafik

FlexGrafik is Client 1 / the first reference tenant, owned and operated by Norbert. It is the lab in which the patterns were developed and exercised. Public language should say `owner-operated lab`, `reference tenant` or `heritage system`, never `client case` or `market proof` unless a separate customer verifies the result.

### GitHub

GitHub has three audiences and should be organised accordingly:

- **Buyer:** selected proof, ownership model, security and handover clarity.
- **Technical evaluator:** architecture, README, tests, status, deployment boundaries and evidence.
- **Operator:** private tenant configuration, secrets, internal prompts, client data and reusable platform code.

The profile should therefore point to a curated map, not expose every repository.

## Repository visibility and ownership policy

Recommended default until a contract says otherwise:

| Asset type | Visibility | Commercial treatment |
|---|---|---|
| Public proof / sanitized reference | Public | Readable example; no promise of free reuse |
| QuietForge platform and internal governance | Private | Reusable internal IP; exposed only through proof and contracts |
| FlexGrafik tenant implementation | Private or selectively public | Reference tenant; remove secrets, PII and commercial internals |
| Client implementation | Private client-owned repository | Client receives agreed code, access and handover as part of the build |
| Reusable framework or template | Public only by deliberate decision | MIT/Apache or commercial licence chosen per asset |

The recommended offer is **not** “the repo for free”. It is:

- paid scan and implementation;
- client repository and access from day one;
- client-specific code and documentation transferred as agreed;
- QuietForge reusable framework, know-how and generic templates retained unless the contract explicitly assigns them;
- no open-source licence implied by source visibility.

This is a commercial/IP decision and should be written into the proposal and contract. A lawyer should review the final Dutch/EU wording.

## Remediation plan

### Phase 0: freeze and decide

- Stop adding new systems or repository links until the inventory is authoritative.
- Confirm the canonical GitHub owner, repository names, visibility and branch for every reference asset.
- Decide whether `flexgrafik-inspire` is a separate system, a feature of Quote & Order, or an internal project.
- Decide whether `flexgrafik-app` is the renamed `app.flexgrafik.nl` repository.

### Phase 1: create the truth registry

Create one internal registry with one row per repository and one row per sellable system. Required fields:

- canonical repository URL and current name;
- old names and domain/app URLs;
- QuietForge role, FlexGrafik role or client role;
- system(s) supported;
- visibility and data classification;
- status: lab proof, pilot, new on platform, client-verified or planned;
- proof assets and live demo URLs;
- reusable template boundary;
- ownership and licence treatment;
- last verification date and evidence owner.

This registry becomes the source for GitHub links, `/systems` evidence blocks and future case studies.

### Phase 2: professionalise GitHub

- Rewrite the profile README around `System builder for small businesses` and the QuietForge tenant model.
- Remove the dead `/contact` link and replace the outdated free-scan promise with the current scan/reference offer.
- Pin only verified, relevant repositories.
- Rename or rewrite repository descriptions in English.
- Add a consistent README contract: purpose, status, reference tenant, demo, evidence, architecture, security, setup, ownership and licence.
- Mark internal, proposed and archived repositories clearly. Do not present `-proposed` repositories as production assets.
- Add security policy, `.env.example`, secret scanning and dependency checks where appropriate.

### Phase 3: repair the portfolio evidence layer

For each of the nine spokes, add an evidence block with:

- `What exists today`;
- `Reference implementation` or `No public repository`;
- `See it` link to a real demo, screenshot, flow or report;
- `Status` with the canonical vocabulary;
- `What gets adapted for your company`;
- `What is not included or not yet proven`.

Keep composite examples, but label them as illustrative next to the example itself. Do not create nine fake case studies from one tenant.

### Phase 4: correct commercial and technical metadata

- Fix system JSON-LD Offer pricing so it does not publish `0`.
- Add explicit `sourceRepo`, `proofType`, `proofUrl` and `handoverModel` fields to the system registry.
- Replace missing repository links with honest private-reference labels.
- Audit all old `/results`, `/solutions`, `/book-discovery` and `/contact` links.
- Keep redirects and archive pointers, but ensure active docs point only to current routes.

### Phase 5: proof and sales readiness gate

Do not call a system `ready to sell` until it has:

- a defined buyer problem and scope;
- a working or deliberately labelled reference;
- an implementation checklist;
- security and data boundary notes;
- handover and ownership wording;
- a price model or scan-first qualification rule;
- an evidence owner and review date.

## Acceptance criteria

The cleanup is complete when a buyer can answer these questions without guessing:

1. What problem does this system solve?
2. Is it proven in the lab, new on the platform or client-verified?
3. Where can I see it working?
4. Which repository or reference supports the claim?
5. What will be adapted for my company?
6. Who owns the repository, code, data and reusable framework?
7. What do I buy first and what happens after the scan?

## Required Commander decisions before implementation

1. Confirm the canonical list of reference repositories and their actual GitHub URLs.
2. Confirm that FlexGrafik is labelled as `owner-operated lab / reference tenant`, not a client case.
3. Approve the default ownership model: client repo from day one, QuietForge framework retained.
4. Approve whether any repository will be deliberately open-sourced and under which licence.
5. Approve whether all nine system pages remain public now, or whether unproven systems are marked as `NEW ON THE PLATFORM` until their evidence packs exist.

## Session addendum: Builder's Lab proposal

The live FlexGrafik assets are stronger proof than the current QuietForge site makes visible. Confirmed public test surfaces include:

- `https://flexgrafik.nl/` - public reference business and conversion portal;
- `https://zzpackage.flexgrafik.nl/` - live commerce and quote flow;
- `https://zzpackage.flexgrafik.nl/wizard/` - nine-step configurator with Mollie handoff;
- `https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/` - FlexGrafik INSPIRE design assistant;
- `https://app.flexgrafik.nl/` - public game / lead entry point.

These should be exposed through a dedicated **Builder's Lab** page rather than mixed into the commercial system catalogue.

### Active business versus laboratory wording

The live FlexGrafik properties still show products, prices, reviews and purchase paths. Therefore `LAB: PAUSED` is too ambiguous if orders or enquiries remain open. Use two separate labels:

- **FlexGrafik business:** an independent owner-operated reference business with public customer-facing products;
- **FlexGrafik lab:** the environment in which the systems and platform patterns were developed.

QuietForge may link to the business and invite people to test it, but must not convert FlexGrafik sales, reviews or operational claims into QuietForge client results without an explicit evidence and consent record.

### Recommended route and role

Recommended route: `/lab/`.

Recommended title: `Builder's Lab - What I built in a live owner-operated business`.

The page has one job: show that Norbert can take a business problem, build a complete working system, connect the parts and finish the delivery. It is proof of build capability, not a client case study and not a list of free products.

Keep it out of the five-link main header for now. Link it from `/about/`, `/proof/`, the footer and the GitHub profile. The main commercial path remains Systems -> proof -> Automation Scan.

### Recommended timeline

Use the user's actual build sequence, with each milestone containing `Problem`, `Built`, `Business effect`, `Test it`, `Repository`, `Status` and `What was learned`:

| Sequence | Milestone | Public proof | Safe business effect |
|---|---|---|---|
| 01 | FlexGrafik portal and supervised assistant | `flexgrafik.nl` | Visitors get a clearer path from trust to the right next action |
| 02 | ZZPackage and Wizard | live ZZPackage and `/wizard/` | Customers configure, see prices and continue without a manual quote thread |
| 03 | FlexGrafik INSPIRE / Design Agent | vehicle design route | A visitor can submit a logo and vehicle context and receive a guided design direction |
| 04 | Lead game | `app.flexgrafik.nl` and the game page | Attention can become a registered, tracked handoff into the Wizard |
| 05 | Jadzia | public proof only after exact URL and status are confirmed | Operational proposals, queues and approval boundaries become explicit |
| 06 | Agent OS UI / Mission Control | public URL or deliberate screenshots | Tasks, approvals, history and cost become inspectable |
| 07 | dSaaS platform core | architecture explanation and verified public demo only | The reusable platform boundary is separated from one business tenant |
| 08 | QuietForge tenant | `quietforge.flexgrafik.nl` | Tenant 1 exercises the platform as the commercial implementation business |
| 09 | FlexGrafik tenant | planned second tenant | Tenant 2 brings the reference business onto the same governed platform |

The distinction must be explicit: FlexGrafik was the historical business laboratory; in the dSaaS platform rollout, QuietForge is Tenant 1 and FlexGrafik is Tenant 2.

### Page anatomy

1. Hero: `I built this before I offered it.`
2. Honest status panel: owner-operated reference tenant, not external client proof.
3. Interactive timeline from portal to dSaaS.
4. Live test bench grouped by visitor journey: discover, configure, play, design and operate.
5. System map: portal -> game/design assistant -> Wizard -> payment -> operations -> governance -> tenant platform.
6. Per-milestone business effects using observable outcomes, not invented revenue claims.
7. Evidence drawer with screenshots, walkthroughs and verified repository links.
8. Current platform chapter: BKG, policy decision chain, human-stop and tenant isolation, with `POC` or `TENANT-READY CORE` labels wherever production readiness is not complete.
9. Final CTA: `Book an Automation Scan`; secondary link `Visit the FlexGrafik reference business`.

### Canon conflict to resolve

The current site-map R7 says `Zero FlexGrafik market claims` and keeps FlexGrafik only as a paused lab note on `/about/#lab`. A `/lab/` page with live links is compatible only if the rule is rewritten to:

> FlexGrafik may be shown as an owner-operated reference tenant and live build laboratory. It is not an external client case, does not create client-result claims and does not replace verified customer proof.

This canon decision must happen before the page is implemented. The `/lab/` route also requires a route metadata entry, OG image, sitemap entry and handoff.

### GitHub changes required for the Lab

- Rewrite the profile README as the index to QuietForge, the Builder's Lab and the dSaaS tenant model.
- Pin only repositories whose URL, role and visibility are confirmed.
- Add a standard README section to every linked repository: `Role`, `Status`, `Try it`, `Reference tenant`, `What it proves`, `Data boundary`, `License`.
- Use separate labels for `FlexGrafik reference implementation`, `QuietForge tenant`, `dSaaS platform core` and `client delivery template`.
- Link the Lab page from the profile README instead of dumping a raw repository list.
- Do not link a repository as public proof when it is private, renamed, a proposed fork or not sanitized.

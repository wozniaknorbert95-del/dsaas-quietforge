# GitHub Profile and Repository Operating Plan

**Date:** 2026-09-06  
**Scope:** `wozniaknorbert95-del` GitHub account and repository portfolio  
**Prerequisite:** QuietForge Builder's Lab deployed, post-deploy smoke approved, and public wording accepted

## Executive verdict

The GitHub profile is **not ready for promotion yet**.

The problem is not the amount of code. The problem is that the public account currently mixes:

- Norbert's identity;
- QuietForge's commercial implementation work;
- FlexGrafik's owner-operated reference business;
- private or reusable platform IP;
- proposed repository patches;
- old portfolio language;
- repository names that cannot currently be verified publicly.

GitHub must become a curated technical evidence layer, not a public dump of every project and not a catalogue of free products.

The order is mandatory:

```text
Inventory -> account security -> secret/IP clearance -> visibility decisions
-> README/security baseline -> profile rewrite -> pins -> public promotion
```

## Professional benchmark audit (2026-09-06)

There is no exact public GitHub equivalent of a solo **Conversion Systems Architect for
SMBs**. The correct benchmark is therefore a small set of adjacent, high-signal
builders rather than generic AI influencer profiles:

| Profile | What is working | Adopt for Norbert | Do not copy |
|---|---|---|---|
| [Simon Willison](https://github.com/simonw) | Self-updating profile README, current releases, blog/TIL trail and a small set of canonical pinned tools | Make current work and evidence easy to verify; maintain a visible proof trail | His scale, follower count or open-source volume |
| [Hamel Husain](https://github.com/hamelsmu) | Clear independent-consultant identity, one operating theme (evals), teaching/writing and relevant pinned work | Explain the method behind delivery: evaluation, failure analysis, safety and measurement | Broad ML authority that is not yet Norbert's claim |
| [Jason Liu](https://github.com/jxnl) | Consulting plus one flagship open-source product, concise profile README, external knowledge hub and curated pins | Select one flagship proof asset and connect GitHub to QuietForge/Lab | A public product-download model for private QuietForge IP |
| [Matt Van Horn](https://github.com/mvanhorn) | Very short founder positioning, explicit current builds and proof through shipped agent tooling | Keep the profile current and outcome-led; show what is being built now | Star counts and claims that are not independently verified |

[Harrison Chase](https://github.com/hwchase17) is a useful negative control: major
agent-platform impact does not automatically produce a strong personal profile
README. GitHub can show technical history, but it must still explain the person,
the work and the next action.

### Benchmark-derived target state

After G0-G7, the account should have:

- one clear identity: Norbert Wozniak, Conversion Systems Architect, QuietForge;
- one primary destination: QuietForge, with Builder's Lab as the technical proof layer;
- one curated proof chain: role -> system -> evidence -> boundary -> next action;
- three or four verified pins, not a public dump of all repositories;
- at least one sanitized, reproducible technical proof with setup, test/build result and
  a walkthrough or live fallback;
- a visible maintenance signal: verified date, release/changelog or dated evidence note;
- explicit separation between technical proof, owner-operated reference and commercial
  client outcome;
- no invented OSS, client, autonomy, ROI or traction claims.

This is a credibility target, not a follower or star target.

## Audit findings and plan amendments

### P0 - Acceptance gate correction

The original final gate says `G0-G5` are complete while the promotion work and buyer,
technical and truth tests live in `G6-G7`. Promotion must require **G0-G7**, including
the pin review and acceptance review. This is a plan defect, not an optional improvement.

### P0 - Public profile baseline

The live account still exposes the exact risks this plan identifies: the profile README
uses autonomous-systems wording, offers a free scan, links `/contact`, and names
unresolved repositories. The profile repository is also MIT-licensed while the public
proof and tenant repositories have not yet received a deliberate licence/IP decision.
G5 must replace the live copy, not merely append new sections.

### P1 - Proof must be runnable or inspectable

The README contract is strong, but a list of claims is not a proof. Every selected public
proof repository must include one of the following before pinning:

- a clean local quickstart with a deterministic test/build command; or
- a sanitized walkthrough with diagrams, fixtures, screenshots and a live fallback.

If neither is possible, the repository remains private and the profile links to the
Builder's Lab explanation instead.

### P1 - Add a maintenance signal

The plan needs a lightweight maintenance policy: update the profile's `Current work`
and each public proof repository's `last verified` field after a meaningful release, and
review the complete profile at least monthly during the first quarter. Do not use a
contribution heatmap or statistics widget as evidence.

### P1 - Add an evidence ladder

The profile must keep the existing proof tiers only: `PROVEN`, `DEMO` and `PLANNED`.
The evidence context is then made explicit without creating a fourth proof tier:

- `PROVEN` - reproducible technical evidence or a measured owner-operated result;
- `OWNER-OPERATED REFERENCE` - Norbert's own business/build laboratory, never an
  external client case;
- `DEMO` - deliberate fixture or walkthrough;
- `PLANNED` - future work with no public proof yet.

The existing repository statuses remain the source of truth; this distinction only makes
the profile-level reading order and evidence context explicit.

### P2 - Keep the positioning narrow

The source identity document describes Company Brains, multi-agent orchestration and
AI-assisted engineering. Those are capabilities and method. The public GitHub headline
must remain **Conversion Systems Architect** / **system builder for small businesses**,
with AI and autonomy explained only where evidence and proof boundaries support them.

## Target operating model

### Norbert

Founder, decision owner and **Conversion Systems Architect**.

Public translation:

> System builder for small businesses.

### QuietForge

Commercial implementation studio:

- Automation Scan;
- fixed-scope system implementation;
- client repository and handover;
- optional care;
- human approval and engineering discipline.

### FlexGrafik

Independent owner-operated reference business and build laboratory.

It may prove:

- that systems were built;
- that public business surfaces work;
- that multiple workflows were connected;
- that the builder finishes complex implementation work.

It does not prove external client outcomes, QuietForge ROI or market traction.

### Platform core

Reusable internal platform/IP layer. Default visibility: private.

The platform core is not automatically a public product, a downloadable repository or an open-source project.

### Client tenant

The client owns the agreed client repository and data from day one. Generic QuietForge framework, reusable templates and platform core remain separate unless a contract explicitly assigns them.

## Current public account snapshot

The account currently exposes eight public repositories:

- `dsaas-quietforge`;
- `wozniaknorbert95-del` profile repository;
- `dsaas-platform-main-proposed`;
- `zzpackage-proposed`;
- `portfolio`;
- `jadzia`;
- `Flex-vcms`;
- `flexgrafik-app`.

The following names are confirmed private and must not be treated as public canonical repositories:

- `dsaas-platform-main` - confirmed private;
- `zzpackage` - confirmed private;
- `agent-os-ui` - confirmed private;
- `flexgrafik-nl` - confirmed private;
- `flexgrafik-inspire` - confirmed private.

Live URLs and GitHub repositories are separate inventory items. A working application URL does not prove that its source repository is public or belongs to this account.

### G0 verification (2026-09-06)

The live account inventory was checked with GitHub CLI:

- account owner: `wozniaknorbert95-del`;
- total repositories: 21;
- public repositories before G3 cleanup: 8;
- private repositories before G3 cleanup: 13;
- default branches vary between `main` and `master` and must be recorded per repository;
- `dsaas-platform-main`, `zzpackage`, `agent-os-ui`, `flexgrafik-nl` and
  `flexgrafik-inspire` are confirmed private, not unresolved public canonicals;
- `dsaas-platform-main-proposed` and `zzpackage-proposed` were public staging repositories
  before G3 and are now private; they must not be presented as production canonicals;
- the profile repository was rewritten and pushed as commit `1b644bf`;
- both `*-proposed` repositories were made private during G3, and `jadzia` was made private
  after GitHub Secret Scanning reported an open Google API key alert; the account now has
  5 public and 16 private repositories;
- GitHub display name, bio and website fields were updated after the `user` scope was
  authorized: `Norbert Wozniak | QuietForge`, QuietForge bio and website.

## Repository taxonomy

### Public profile index

Repository: `wozniaknorbert95-del`

Role: profile README only.

Visibility: public.

Required state:

- current QuietForge positioning;
- link to `https://quietforge.flexgrafik.nl/`;
- link to `/lab/`;
- link to `/proof/`;
- link to `/book-a-scan/`;
- curated repository map;
- explicit proof boundaries;
- no dead `/contact` link;
- no “free scan” standard offer;
- no links to 404 canonical repos.

### Public proof repository

Role: sanitized code, fixtures, diagrams or documentation that proves a limited technical capability.

Visibility: public only after sanitization and README/security gate.

Candidate: `portfolio`.

Possible candidate: `Flex-vcms`, only after README, endpoint and internal-host cleanup.

### Private QuietForge tenant

Candidate: `dsaas-quietforge`.

Role: active tenant site, content, intake, tenant config and operational binding.

Default visibility: private or public only after a full tenant/IP/history review.

Do not pin it merely because it is the current website repository.

### Private operations core

Candidate: `jadzia`.

Role: operations command layer, deployment/test/rollback and internal runtime patterns.

Default visibility: private.

Public proof should be a sanitized walkthrough or deliberate proof repository, not the operational core.

### FlexGrafik tenant repositories

Candidates:

- `flexgrafik-app`;
- canonical `zzpackage` if found;
- canonical `flexgrafik-inspire` if found;
- canonical `flexgrafik-nl` if found.

Default visibility: private or selectively public after mapping and sanitization.

### Proposed/archive repositories

Repositories:

- `dsaas-platform-main-proposed`;
- `zzpackage-proposed`.

Default action: private staging or archive.

They must never be pinned or presented as canonical production repositories.

## Recommended profile architecture

### Profile identity fields

Recommended display name:

> Norbert Wozniak | QuietForge

Recommended bio direction:

> Conversion Systems Architect building governed company operating systems for small businesses. QuietForge: scan, build, handover.

Website:

`https://quietforge.flexgrafik.nl/`

The profile should lead to the Builder's Lab before it leads to source code.

### Profile README sections

1. `Norbert Wozniak — Conversion Systems Architect`.
2. `What I build`: company operating systems for quotes, orders, inbox and reporting.
3. `Start here`: QuietForge, Builder's Lab, Proof, Automation Scan.
4. `How to read this GitHub`: evidence layer, not free product catalogue.
5. `Curated repository map`: only verified repositories.
6. `Proof boundaries`: lab, demo, client-verified and planned.
7. `Ownership and handover`: public visibility is not a licence.
8. `Security and delivery`: review, scans, approval gates, documentation.
9. `Maintainer`: Norbert, last inventory review, next review.

### Profile CTA hierarchy

Primary:

`Visit QuietForge` -> `https://quietforge.flexgrafik.nl/`

Evidence:

`Explore the Builder's Lab` -> `https://quietforge.flexgrafik.nl/lab/`

Commercial:

`Book an Automation Scan` -> `https://quietforge.flexgrafik.nl/book-a-scan/`

No `/contact`, no free-scan default promise, no raw list of unresolved repositories.

## Pin strategy

Maximum: three or four pinned repositories.

Initial recommended set after gates:

1. `portfolio` — public proof index, after cleanup.
2. `Flex-vcms` — sanitized governance proof, after README/security gate.
3. `dsaas-quietforge` — only if tenant/IP/security review passes; otherwise omit.
4. One confirmed public reference repository, only after URL and role are verified.

Do not pin:

- `dsaas-platform-main-proposed`;
- `zzpackage-proposed`;
- unresolved repositories;
- `jadzia` before private/public decision;
- `flexgrafik-app` before its identity is reconciled with Lead Scout;
- `portfolio` before it stops using stale AI Systems Architect framing.

## Repository README contract

Every visible repository must distinguish:

### Identity

- repository role: `PROFILE INDEX`, `PUBLIC PROOF`, `PRIVATE TENANT`, `PRIVATE CORE`, `PROPOSED` or `ARCHIVE`;
- purpose;
- non-goal;
- canonical URL and branch;
- owner and tenant/context;
- visibility.

### Truth and proof

- public status: `PROVEN IN THE LAB`, `OWNER-OPERATED REFERENCE`, `NEW ON THE PLATFORM`, `LIVE AT CLIENT`, `DEMO` or `PLANNED` as appropriate;
- readiness: `LIVE`, `PARTIAL`, `PLANNED`;
- proof tier: `PROVEN`, `DEMO`, `PLANNED`;
- evidence class;
- what it proves;
- what it does not prove;
- live demo, screenshot, walkthrough or explicit `No public repository`;
- last verified date, evidence owner and review due date.

### Engineering

- architecture and dependencies;
- data boundary;
- security policy;
- secret handling;
- tests, build and run instructions;
- deployment boundary;
- rollback/release policy;
- known limitations.

### Commercial/IP

- ownership of code and data;
- reusable QuietForge framework boundary;
- client handover boundary;
- explicit SPDX licence or `No open-source licence`;
- statement: `Public repository visibility does not grant a licence or imply free reuse.`

## Security baseline

For every repository that remains public:

- full history secret scan;
- secret rotation for every historical exposure;
- `.env.example` only, with no production values;
- `SECURITY.md` with disclosure path;
- `CODEOWNERS`;
- Dependabot or equivalent dependency updates;
- CodeQL or documented alternative where appropriate;
- Gitleaks/push protection;
- minimum GitHub Action permissions;
- pinned action versions, not `@latest` for release-critical steps;
- no PII, client records, internal hostnames, local paths, tokens or tenant exports;
- no unredacted operational screenshots.

For private tenant/core repositories, additionally verify:

- branch protection;
- required pull request review;
- production environment approval;
- separate secrets and environments per tenant;
- backup and rollback;
- access review and offboarding;
- no cross-tenant credentials or shared storage.

## Licence and IP policy

Default commercial model:

- client receives the agreed client repository, access, documentation and handover;
- client-specific code belongs to the client as defined by contract;
- reusable QuietForge framework and generic templates remain with QuietForge unless assigned;
- dSaaS platform core remains private unless deliberately open-sourced;
- third-party dependencies retain their own licence obligations;
- public source visibility never implies free commercial reuse.

Special caution:

- `dsaas-platform-main-proposed` and `zzpackage-proposed` contain MIT licensing in their history. Their history and authorship must be reviewed before reusing code commercially.
- `flexgrafik-app` claims MIT in README but must be checked for a real top-level licence file.
- Absence of a licence is not a free-use licence, but it is also not a substitute for a written proprietary ownership notice.

## Implementation phases

### G0 - Inventory freeze

Create a private registry with:

- canonical repo URL and owner;
- old names and live app/domain URLs;
- role and tenant;
- visibility;
- branch and release source;
- systems supported;
- proof status/readiness/tier;
- public demo and fallback;
- data class;
- licence/IP;
- deployment target;
- evidence owner and review date.

The previously unresolved names were checked in G0 and are confirmed private:

- `dsaas-platform-main`;
- `zzpackage`;
- `flexgrafik-nl`;
- `flexgrafik-inspire`;
- `agent-os-ui`.

### G1 - Account containment

- verify 2FA/passkeys and recovery codes;
- audit personal access tokens, OAuth apps, SSH keys and GitHub Apps;
- confirm backup administrator/owner path;
- review organization/team membership if an organization will be created;
- enable commit email privacy where appropriate.

### G2 - History, secrets and IP

- scan every branch, tag, release and Actions artifact;
- rotate every exposed credential, even if later deleted;
- review tenant config, prompts, internal docs and client data;
- classify background IP, tenant IP, client deliverables and third-party IP;
- make a legal/licence decision before opening or transferring any repository.

### G3 - Visibility decisions

Recommended first decisions:

| Repository | First decision |
|---|---|
| Profile repo | Public, rewrite README |
| `portfolio` | Public proof, rewrite README |
| `Flex-vcms` | Hold public until sanitized README/security gate |
| `dsaas-quietforge` | Hold public/pin until tenant/IP review |
| `jadzia` | Made private after open secret alert; sanitized proof only later |
| `flexgrafik-app` | Hold until Lead Scout identity is confirmed |
| `*-proposed` | Private staging or archive, never pin |
| unresolved repos | No public link until URL confirmation |

### G3/G4 execution status (2026-09-06)

- Profile repository: public, README/security baseline complete, pushed as `1b644bf`.
- `portfolio`: public proof candidate, README/security baseline complete, dependency audit
  clean after Next.js `16.3.4` update, build passed; remains `HOLD` and is not pinned.
- `dsaas-platform-main-proposed`: changed to private staging.
- `zzpackage-proposed`: changed to private staging.
- `Flex-vcms`, `flexgrafik-app` and `dsaas-quietforge`: remain public but are not approved
  for pinning until their individual history/IP review passes.
- `jadzia`: private after one open `google_api_key` Secret Scanning alert; the key must be
  revoked/rotated before the alert can be closed. Commander explicitly deferred rotation;
  `jadzia` remains excluded from all public proof and pinning.
- Public repository descriptions and topics were normalized for `dsaas-quietforge`,
  `Flex-vcms` and `flexgrafik-app`.

### G4 - Repository baseline

For each approved public repo:

- README contract;
- English description and topics;
- `SECURITY.md`;
- `CODEOWNERS`;
- licence/proprietary notice;
- secret/dependency/security automation;
- clean setup or explicit docs-only state;
- release/changelog policy;
- last verified/review due fields.
- one reproducible quickstart or inspectable sanitized walkthrough;
- one visible maintenance signal after meaningful changes.

### G5 - Profile rewrite

- update display name, bio and website;
- replace README around QuietForge and Builder's Lab;
- remove `/contact`, free-scan and unresolved repo links;
- link `/lab/` as primary technical proof;
- present only curated repositories;
- include ownership/licensing boundary.
- replace autonomous/free-scan/contact language with the approved QuietForge CTA path;
- add a short `Current work` or `Last verified` signal without vanity statistics.
- account display name, bio and website updated through GitHub API after `user` scope authorization.

### G6 - Pin and promote

- pin only 3–4 verified repositories;
- verify each pinned README and link manually;
- use GitHub topics consistently;
- update QuietForge `/lab/` only with confirmed repository links;
- announce the profile only after G7.

### G7 - Acceptance review

Buyer test:

- understands who Norbert is;
- understands QuietForge's offer;
- sees `/lab/` before source code;
- knows the first commercial step;
- does not assume free code.

Technical test:

- can identify role, status, evidence and boundaries of every pinned repo;
- can run or understand the setup;
- sees security, ownership and licence information;
- cannot access tenant data or private runtime through public links.

Truth test:

- no dead links;
- no stale prices;
- no unsupported autonomy/client/ROI claims;
- no `LIVE AT CLIENT` without client evidence;
- no proposed repo presented as canonical.

## Required Commander decisions

1. Confirm the canonical GitHub owner and whether an organization should be created.
2. Confirm the canonical URLs for the unresolved repositories.
3. Approve visibility for `dsaas-quietforge`, `jadzia`, `Flex-vcms` and `flexgrafik-app`.
4. Approve whether `*-proposed` repositories become private staging or archives.
5. Approve whether any repository is genuinely open source and under which licence.
6. Approve the client ownership/handover model for future deployments.
7. Approve the initial pinned set.
8. Approve whether GitHub Actions may deploy production or whether production requires protected manual approval.

## Final acceptance gate

GitHub promotion is allowed only when:

- G0–G7 are complete;
- profile README has no dead links or outdated offer;
- selected pinned repos pass README/security/licence review;
- at least one selected proof path is reproducible or inspectable without exposing tenant data;
- public repo history has no unresolved secret/IP blocker;
- profile links to `/lab/` and `/book-a-scan/`;
- proposed/unresolved repos are not presented as canonical;
- `git status` is clean for every changed repository;
- the Commander approves public promotion.

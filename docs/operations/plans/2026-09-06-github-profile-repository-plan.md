# GitHub Profile and Repository Operating Plan

**Date:** 2026-09-06  
**Scope:** `wozniaknorbert95-del` GitHub account and repository portfolio  
**Prerequisite:** QuietForge Builder's Lab deployed and verified

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

The following names cannot currently be treated as public canonical repositories under the account without confirmation:

- `dsaas-platform-main`;
- `zzpackage`;
- `agent-os-ui`;
- `flexgrafik-nl`;
- `flexgrafik-inspire`.

Live URLs and GitHub repositories are separate inventory items. A working application URL does not prove that its source repository is public or belongs to this account.

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

- `dsaas-platform-main-proposed` and `zzpackage-proposed` currently expose MIT licensing. Their history and authorship must be reviewed before changing visibility or reusing code commercially.
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

Blocked until canonical URLs are confirmed for:

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
| `jadzia` | Private or sanitized proof fork |
| `flexgrafik-app` | Hold until Lead Scout identity is confirmed |
| `*-proposed` | Private staging or archive, never pin |
| unresolved repos | No public link until URL confirmation |

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

### G5 - Profile rewrite

- update display name, bio and website;
- replace README around QuietForge and Builder's Lab;
- remove `/contact`, free-scan and unresolved repo links;
- link `/lab/` as primary technical proof;
- present only curated repositories;
- include ownership/licensing boundary.

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

- G0–G5 are complete;
- profile README has no dead links or outdated offer;
- selected pinned repos pass README/security/licence review;
- public repo history has no unresolved secret/IP blocker;
- profile links to `/lab/` and `/book-a-scan/`;
- proposed/unresolved repos are not presented as canonical;
- `git status` is clean for every changed repository;
- the Commander approves public promotion.

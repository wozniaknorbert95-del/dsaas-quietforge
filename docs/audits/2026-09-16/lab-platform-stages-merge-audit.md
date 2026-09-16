---
status: "[ACTIVE — AWAITING COMMANDER GO]"
title: "Lab timeline audit — merge stages 07–09 into one platform project"
owner: "Norbert Wozniak"
auditor: "Cloud Agent (vibe-init 2026-09-16)"
updated: "2026-09-16"
classification: "L4 — site audit / content IA"
route: "https://quietforge.flexgrafik.nl/lab/"
anchors:
  - "#stage-06 (Jadzia — not the defect)"
  - "#stage-07 Agent OS UI / Mission Control"
  - "#stage-08 Tenant Platform Core"
  - "#stage-09 QuietForge Tenant"
---

# Lab audit — three platform stages → one project

## Verdict

**P0 content IA defect.** Timeline stages `07` + `08` + `09` narrate **one** internal platform build as **three** separate projects. That contradicts Commander intent, business-plan platform language, and the Lab’s single job (prove implementation capability — not sell a multi-product platform catalogue).

**Recommended fix:** keep FlexGrafik surface stages `01–06`, collapse `07–09` into **one** milestone `07` (“I built the governed platform”), keep the existing Platform chapter as progressive disclosure, do not invent a public SaaS product.

**No code shipped in this session** (vibe-init). Implementation waits on Commander GO.

---

## Anchor clarification

Live URL cited by Commander: `/lab/#stage-06`.

| Hash | Current milestone | Relation to complaint |
|------|-------------------|------------------------|
| `#stage-06` | Jadzia Operations Command Layer | FlexGrafik **operate** stage — keep |
| `#stage-07` | Agent OS UI / Mission Control | Part of the defect cluster |
| `#stage-08` | Tenant Platform Core | Part of the defect cluster |
| `#stage-09` | QuietForge Tenant | Part of the defect cluster |

Dutch browser translation of `07–09` matches the pasted titles (“Zarządzaj pracą / Wyodrębnij platformę / Wdrażaj biznes…”). The complaint targets that **triplet**, not Jadzia.

---

## Current AS-IS (SSoT)

Source: `src/content/lab.ts` → `LAB_MILESTONES` + `LAB_PLATFORM_FACTS` · UI: `LabTimeline`, `LabEvidenceBench`, `LabPlatformChapter` · JSON-LD `numberOfItems: 9`.

```text
01 Portal → 02 Commerce → 03 Wizard → 04 Game → 05 INSPIRE → 06 Jadzia
07 Mission Control → 08 Tenant Platform Core → 09 QuietForge Tenant
(+ separate “Platform chapter” section repeating BKG / policy / ledger / tenant boundary)
```

### Why this reads wrong to an expert buyer

1. **Three rows look like three products.** Lab job = “I can finish a connected system.” Three `NEW ON THE PLATFORM` rows feel like a roadmap pitch.
2. **Mission Control is a surface, not a project.** It is the HITL cockpit for the engineering brain — same delivery story as the platform governance layer, not a sibling product to “Tenant Platform Core.”
3. **QuietForge as stage 09 invents a second narrative.** QuietForge is Tenant 1 / commercial site consuming the platform — not a third build after “extract the platform.” Site already *is* QuietForge.
4. **Duplicate education.** Stage 08 + Platform chapter + connections step “Tenant Platform” teach the same idea three times (MR-06 / one job per section risk).
5. **Canon conflict (report, follow higher layer):**
   - `docs/canon/business-plan.md` §1/§4: platform = internal engine; public language = **“one integrated platform”**; **not named as a product** until demand; never “DSAAS”.
   - `docs/canon/site-map.md` R7: censors `DSAAS`, agents-as-product; allows “one integrated platform”.
   - Lab plan (2026-09-05) intentionally shipped nine stages — that plan is now superseded by Commander correction.

---

## What `dsaas-platform-main` actually is (expert extract)

### Access status this session

| Probe | Result |
|-------|--------|
| `platform.lock.json` | Points to `wozniaknorbert95-del/dsaas-platform-main` @ `kanon/0.3.0` / commit `7292b283…` |
| `gh` / `git ls-remote` | **404 / Not Found** for this agent token (private or out of scope) |
| `dsaas-platform-main-proposed` | Also unresolved |

**MISSING for deeper repo archaeology:** Commander unlock (clone/read access) or paste of platform README / architecture index. Plan below does **not** require source dump to ship the Lab copy fix.

### Expert facts available without cloning

From `docs/architecture/platform-boundary.md`, `tenant-config/`, `platform.lock.json`, `PlatformGrowthClient.ts`, business-plan:

| Layer | Owns | Public wording |
|-------|------|----------------|
| **Platform core** (`dsaas-platform-main`) | Decision/policy evaluation, lifecycle + evidence ledgers, virtual-employee runtimes, durable execution, Kokpit/Maszynownia/KODA contracts, reusable Growth OS templates | “one integrated platform” / governed tenant platform — **not** a named SaaS SKU |
| **QuietForge tenant** (`dsaas-quietforge`) | Site, copy, intake, brand, goals, KPI, env bindings; `tenant-config/` + `platform.lock.json` | Commercial implementation business · Tenant 1 · `active-test` |
| **Growth projection** | Read-only `PlatformGrowthClient` → `/api/v1/tenants/quietforge/growth-os`; refuses cross-tenant; no synthetic fallback | Connection may be `unavailable` in this env — honest |
| **Mission Control** (`agent-os-ui`) | Queue, approvals, history, cost for Agent OS HITL | Access-gated reference surface — **component of governance**, not a separate Lab “product stage” |
| **Release lock** | `kanon/0.3.0` | Use only as internal version honesty if needed; do not market as product version |

**Safe public claim (aligned with proof rules):** *I extracted a governed, tenant-scoped platform core from one working business, with human stops on sensitive paths. QuietForge runs as Tenant 1. This is not multi-tenant SaaS sold as a product.*

**Unsafe claims to avoid:** production-ready multi-tenant SaaS, DSAAS product name, anonymous Mission Control demo, client ROI from platform, FlexGrafik already live as Tenant 2.

---

## Diagnosis (ICP lens)

| | |
|--|--|
| **Audience / ICP** | NL SMB owner evaluating “can this architect finish a connected system?” + light investor/tech bridge via Lab |
| **Funnel stage** | Proof / trust (post-awareness, pre-Scan) |
| **Desired behaviour** | Understand one build arc → trust delivery discipline → Book Automation Scan |
| **Current signal** | Timeline length + three platform rows → architecture tourism, not one finished project |
| **Hypothesis** | Collapsing `07–09` into one milestone raises Scan CTR / time-on-Lab for ICP-1 and reduces “is this a SaaS pitch?” bounce |

---

## Recommended repair plan (after GO)

### Scope lock (one session = one module)

**In:** Lab content IA for platform cluster + syncing dependents.  
**Out:** Home rewrite, new platform product page, GitHub profile pins, connecting live platform URL, Mission Control public demo.

### Target story (7 stages)

```text
01 Portal
02 Commerce
03 Wizard
04 Game
05 INSPIRE
06 Jadzia (operate the reference business)
07 Governed tenant platform   ← single project: Mission Control surface + platform core + QuietForge as Tenant 1
```

Optional later (not this fix): planned “FlexGrafik as Tenant 2” stays in Platform chapter / ownership copy only — never a ninth timeline stage until evidenced.

### A. Content (`src/content/lab.ts`) — primary

1. **Delete** milestones `mission-control` (07), `platform` (08), `quietforge` (09) as separate `LAB_MILESTONES` entries.
2. **Add** one milestone, e.g. `id: 'platform-build'`, `sequence: '07'`:
   - **Title (draft):** `Governed tenant platform`
   - **Eyebrow:** `Build the platform` / `One platform project`
   - **Status:** `NEW ON THE PLATFORM` or `PROVEN IN THE LAB` only if Commander confirms which proof tier
   - **readiness:** `TENANT-READY CORE (POC)`
   - **proofTier:** `DEMO` or `PLANNED` (architecture + private refs) — do not upgrade without evidence
   - **problem:** Patterns built for one business needed a governed, reusable boundary before serving more than one tenant context.
   - **built:** One platform project: tenant-scoped knowledge/policy/ledger direction, human stop on sensitive paths, and an access-gated Mission Control surface for supervised agent work — with QuietForge running as Tenant 1.
   - **effect:** The reusable platform boundary can be discussed separately from brand-specific FlexGrafik surfaces, without pretending this is a public multi-tenant SaaS.
   - **learned:** A platform is one governed system with surfaces and tenants — not three sibling products.
   - **notProven:** No universal production readiness, certification, anonymous Mission Control demo, or client-scale multi-tenant SaaS.
   - **ownership:** Platform core governed by QuietForge; QuietForge site = Tenant 1; FlexGrafik remains reference business / planned Tenant 2.
   - **links:** `#platform` (architecture chapter) + QuietForge home; Mission Control stays private/fallback.
3. **Tighten** `LAB_PAGE.timelineTitle` / `platformLead` to “one platform project extracted from one working business.”
4. **Keep** `LAB_PLATFORM_FACTS` (BKG / propose→policy→ledger / human stop / tenant boundary) — that is the right depth for the chapter, not the timeline.
5. **Connections:** shorten last step to a single “Platform” node (already close); avoid re-listing Mission Control as a separate hop unless Commander wants it nested under Governance.

### B. Page / JSON-LD (`src/app/lab/page.tsx`)

- `numberOfItems: 7`
- ItemList names match the seven milestones
- Metadata description: “connected surfaces → one governed platform”, not “nine stages”

### C. Evidence bench

- One card for the merged platform project (architecture chapter + QuietForge link)
- Do **not** show three private/architecture cards that re-split the story

### D. Deep links / analytics

- `#stage-07` → new merged milestone
- `#stage-08` / `#stage-09` → **redirect behaviour:** on hash match, select merged `07` (or strip); document in handoff
- Events: `lab_timeline_select` with `milestone_id: platform-build`

### E. Canon / docs (same session as code)

| Doc | Change |
|-----|--------|
| `docs/operations/plans/2026-09-05-builder-lab-implementation-plan.md` | Note superseded: 9 → 7 stages; 07–09 collapsed |
| `docs/canon/site-map.md` (if Lab stage count documented) | Sync count |
| `SESSION-ANCHOR.md` | Point to this audit + GO decision |
| Handoff | Mandatory |

### F. Verification gate

- `npm run typecheck` · `npm run build` · `npm run audit:lab` (if present)
- Manual: `/lab/#stage-07` shows merged card; `#stage-08`/`#stage-09` do not orphan
- Grep: no leftover “Extract the platform” / “Deploy the implementation business” as separate stage titles
- Proof-check: no DSAAS product naming; proof tiers honest

### G. Explicit non-goals

- Do not open Mission Control to anonymous public
- Do not link private `dsaas-platform-main` as public proof
- Do not present QuietForge as “built after the platform” chronologically as a separate product launch
- Do not rename Lab into a platform marketing site

---

## Draft milestone copy (EN — for GO edit)

> **07 · Build the platform**  
> **Governed tenant platform**  
> Tenant: Platform core · QuietForge Tenant 1  
> Status: NEW ON THE PLATFORM · TENANT-READY CORE (POC) · ARCHITECTURE + PRIVATE REFERENCE  
>
> **Problem:** One working business proved the patterns; reusing them without a governed boundary would copy chaos into the next tenant.  
> **Built:** One platform project — policy and evidence boundaries, human stops on sensitive paths, and an access-gated Mission Control surface — with QuietForge exercising Tenant 1 on the commercial site.  
> **Observable effect:** Visitors can see that implementation and platform governance are the same discipline: inspectable work, approval before consequence, clear ownership.  
> **Learned:** Surfaces and tenants are chapters of one build, not three products.  
> **Not proven:** Public multi-tenant SaaS, certification, or anonymous Mission Control.  
> **Ownership:** Reusable core stays with QuietForge; client work remains contract-scoped.

---

## Decisions required from Commander (before implement)

1. **GO / NO-GO** on merge `07+08+09` → single `07`.
2. **Proof tier** for the merged card: `DEMO` vs `PLANNED` vs keep mixed language in chapter only.
3. **Hash policy** for old `#stage-08` / `#stage-09` (map to `07` vs 404-style ignore).
4. **Optional:** grant read access to `dsaas-platform-main` for a follow-up evidence pass (sanitized capability list) — not blocking for copy merge.
5. Confirm Mission Control remains **private reference** only.

---

## Measurement plan (post-ship)

| Signal | Where | Continue if | Stop if |
|--------|-------|-------------|---------|
| `lab_timeline_select` on `platform-build` | GA4 | ≥ prior engagement on any of old 07–09 | Near-zero selects after 2 weeks of traffic |
| `cta_book_map_click` from `lab_*` | GA4 | Stable or ↑ vs pre-merge baseline | Sharp drop + qualitative “where is the platform?” confusion |
| Qualitative | Commander review | Buyer reads one project story | Buyer still asks “is Mission Control a separate product?” |

Owner: Commander · Timebox: review within one content cycle after deploy · Next human decision: GO to implement.

---

## Files that will change on GO (preview)

| File | Role |
|------|------|
| `src/content/lab.ts` | Collapse milestones + copy |
| `src/app/lab/page.tsx` | JSON-LD count/names |
| `src/components/lab/LabTimeline.tsx` | Optional hash alias for 08/09 |
| Docs: this audit, plan note, SESSION-ANCHOR, handoff | Canon sync |

No `layout.tsx` / `globals.css` / `next.config.ts` expected → **not risky** for vibe-init classification.

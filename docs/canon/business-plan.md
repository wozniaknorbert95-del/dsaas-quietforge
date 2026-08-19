---
status: ACTIVE
title: QuietForge business plan v1.1
owner: Norbert Wozniak
updated: 2026-08-19
supersedes: Desktop draft v1.0 (August 2026)
---

# Business plan — QuietForge v1.1

**Norbert · System builder for small businesses**  
Rotterdam, NL · staff-corrected after 2026-08-18 repo consolidation

## 1. Summary

QuietForge is a one-person practice, strengthened by AI agents and external code review. It implements **company operating systems** for firms of 1–15 people (NL/PL): quotes → orders → inbox → owner reports — with human approval gates and no lock-in.

**Brand currency:** hours, stress and money given back — measured from the first implementation. A public counter starts at **zero** until a client verifies numbers.

**Internal engine:** DSaaS platform (`dsaas-platform-main`) plus this tenant (`dsaas-quietforge`). Two active repositories. FlexGrafik is a **paused lab**, not a market proof. The platform is an internal tool until a third paying client asks for it as a product. It is **not named as a product on the public site**.

**Revenue:** implementations + monthly maintenance (MRR). First 90 days = proof phase (up to 3 reference implementations), then market prices.

## 2. Positioning (locked from identity)

> Norbert — budowniczy systemów operacyjnych dla małych firm. Szybkość AI, dyscyplina inżyniera, waluta: zaoszczędzone godziny, nerwy i pieniądze.

- **Category:** procesautomatisering / systeembouwer voor het MKB.
- **ICP-1:** Owner, 1–15 people, NL, e-commerce/services; 8+ h/week of manual work; no IT department.
- **ICP-2 (phase 2):** E-commerce/web agencies 5–25 people (white-label). Not this sprint.
- **Anti-ICP:** equity-for-MVP, “do everything, I’ll pay somehow”, full AI autonomy without oversight, no budget for maintenance.
- **Not:** programmer for hire, agency, “AI builder”.
- **FlexGrafik:** lab and architecture heritage. **Never** “live proof” on the public site.

## 3. Public pricing (site canon)

| Offer | Public price | Note |
|-------|--------------|------|
| Automation Scan | **€690** | 90 min; report is theirs; credited toward implementation |
| Implementation | **from €2 500** | Fixed scope, 2–4 weeks, 1–3 modules |
| Maintenance | **from €300 / month** | Monthly cancellable |

Reference implementations (max 3, months 1–3) may be €0–1 500 **in exchange for** a named case with numbers. That discount is not the public site price.

**Superseded:** Automation Map €290. Do not use it on site or LinkedIn.

## 4. Platform vs tenant

| Layer | Repo | Public language |
|-------|------|-----------------|
| Runtime, graph, OPA, NOOA, ledgers | `dsaas-platform-main` | “one integrated platform” — never “DSAAS” |
| Brand, site, intake, tenant config | `dsaas-quietforge` | QuietForge |

DSAAS as a sellable product: only after **3 paying clients ask**. Timebox platform work to 1 day/week during proof phase.

## 5. Four phases

**Phase 0 · Foundation (weeks 1–2)**  
Security checklist as standard · contract/DPA · KvK with accountant · remove live-proof claims · hours counter sheet at 0 · this canon in repo.

**Phase 1 · Proof (months 1–3)**  
20 owner conversations (learn vocabulary — not a pitch deck) · **3 reference implementations** · each ends with hours/month, € value, named quote. Platform work only for those three.

*KPI: 3 cases with metrics · ≥ 100 h/month given back across clients.*

**STOP-RULE:** 0 reference implementations after 6 weeks of phase 1 → review offer/niche. Do not “one more silent month”. That is the FlexGrafik pattern.

**Phase 2 · Sales (months 4–6)**  
Market prices live · 2 implementations/month · MRR 2–3 retainers · public counter on the site.

**Phase 3 · Platform (month 7+)**  
Offer the platform only if demand is confirmed.

## 6. Tool-first (this sprint)

- Site rebuild ships as code; **production deploy is a Commander action**.
- LinkedIn: **profile repair only**. Live posting cadence is **PARKED** until explicit unlock.
- Test publishes → delete. No TT/FB/blog cadence.

## 7. Value metric

Public counter: summed client hours and euro given back.

- Start: **0** (honest). Methodology page required before the number moves.
- Publish a number only when `verified=true` by the client.
- 3-month target (hypothesis, not a claim): ≥ 300 h and ≥ €12 000 given back.

## 8. Open Commander decisions

- [ ] KvK: suspend vs deregister (accountant)
- [ ] First 3 reference firms from Norbert’s network
- [ ] Own domain (`.com` / `.nl`) — deferred; host stays `quietforge.flexgrafik.nl` this sprint
- [ ] Publish the hours counter from implementation #1 (recommendation: yes, after verification)

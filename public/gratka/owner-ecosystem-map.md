# Owner ecosystem map — 8 repos, 1 system (1 page)

> Forward this to a partner, developer or accountant. Shows the **live stack** behind Quietforge — patterns you can get scaled to your business. No fabricated metrics.

---

## What this is

Norbert runs a real multi-repo ecosystem before selling automation to clients. This is not a slide deck — it is the architecture that powers case studies 01–04 on quietforge.flexgrafik.nl.

**Framing:** owner ecosystem proof · not a product catalog for ZZP branding.

---

## Layers (top → bottom)

### Governance
| Module | Role |
|---|---|
| **flexgrafik-meta** | Constitution — global rules, agent hierarchy, master plan |
| **WorkFlow** | Program office — backlog, strategy, daily ops entry |

### Products
| Module | Role |
|---|---|
| **zzpackage.flexgrafik.nl** | 7-step wizard · open pricing · order form — configure calmly or delegate to designers |

### Orchestration & supervision
| Module | Role |
|---|---|
| **Flex-VCMS** | Ecosystem orchestrator — `vcms-scan.js`, `repos.yaml`, conflict detection, SSoT registry, session handoffs. **Supervises all repos.** |

### Applications
| Module | Role |
|---|---|
| **flexgrafik.nl** | Brand portal + chat assistant — routes visitors to wizard & game |
| **app.flexgrafik.nl** | Lead magnet game — coupons & leads → wizard |
| **jadzia-core** | Operations command layer · orders · proposals · human approval |

### AI execution
| Module | Role |
|---|---|
| **Agent OS** | LangGraph: Planner → Coder → Tester → Reviewer → Summarizer. Hybrid VPS + local runner. HITL before deploy. |
| **Agent OS UI** | Mission Control dashboard — task create, health, approval gates |

### Client-facing & back-office
| Module | Role |
|---|---|
| **quietforge.flexgrafik.nl** | Quietforge B2B — Automation Map, case studies, client delivery |
| **Inbox Killer** | Live inbox agent — classify → approve. Strongest process proof. |

---

## Typical flow (simplified)

```
Visitor → flexgrafik.nl (assistant) → wizard or game → governed operational handoff
       → Agent OS builds & tests changes → VCMS scan (conflicts: 0 target)
       → human approves deploy · Inbox Killer handles email ops in parallel

B2B path: quietforge.flexgrafik.nl → paid Automation Map → same 5-phase workflow
```

---

## What we do NOT claim

- No fabricated MRR, conversion rates or hours saved
- No promise that every module is production-perfect — status is honest per repo
- Not legal or tax advice (see advisory case study for qualification-only assistant)

---

## Related case studies

| Case | Maps to |
|---|---|
| 01 Inbox Killer | Back-office layer |
| 02 Orchestrator | Agent OS + jadzia + VCMS |
| 03 Sales Funnel | zzpackage wizard pattern |
| 04 Advisory | Client engagement (anonymised) |

---

## Next step

Want this level of structure for your business? Book a paid **Automation Map** — we score which layers you need first (often simpler than the full stack).

**Book:** quietforge.flexgrafik.nl/book-discovery/

---
*Norbert — Conversion Systems Architect · Quietforge · quietforge@flexgrafik.nl*

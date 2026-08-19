# Evidence — Build & Release Flow

Public slug: `/systems/build-release-flow/`  
Status: `NEW ON THE PLATFORM`  
Asset: `/systems/build-release-flow.svg` (clean). Lab original `/gratka/audit-log.svg` names VCMS / Agent OS / HITL — not used on the spoke.

| Feature (client) | Internal source | Client phrasing on page | Asset |
|------------------|-----------------|-------------------------|-------|
| Five specialist steps | `agent-os-case-study.ts` `agentOsPipelineNodes` | Plan → change → test → review → close | new SVG |
| One module per session | Coder node “target module only” | A small diff | — |
| Test report | Tester node | Pass/fail, not a speech | new SVG |
| Human review pause | Reviewer node | Yes/no. Production stays yours. | new SVG |
| Secret scan | platform gitleaks / security `#secrets` | A report, not a leaked key | new SVG |
| Queue + cost tab | Mission Control mention in case | What this change cost | — |
| Session handoff | Summarizer node | Next person can continue | — |
| No auto-deploy | after-items / Zasada 11 internally | You still press the last button | new SVG |

Public copy: specialist steps, not “agents” as a product. HITL → human approval.

Composite: Meridian Parts — not a real client.

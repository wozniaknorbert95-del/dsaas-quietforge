---
status: ACTIVE
title: QuietForge objection handling
owner: Norbert Wozniak
updated: 2026-08-19
source: Desktop/aktualizacja quietforge/kim jestem.txt §§3–4
---

# Objections — answer with process, not adjectives

Programmers will frame AI-assisted builders as amateurs. Do not argue “my code is good”. Show the gate list.

**Forbidden in public copy:** vibe coding, post-coding.

**Allowed label:** AI-assisted engineering.

## What the market cites (context, not homepage copy)

Industry reports (CMU and follow-on scans) show a pattern: agent-written code can look functional while remaining unsafe (secrets, auth, unmaintainable apps). Named incidents (exposed keys, open apps, production deletes) are used to scare buyers.

QuietForge does not win that debate with slogans. It wins with a visible process.

## Objection → process → one sentence

| Buyer fear (planted) | Process already in the practice | One-sentence reply |
|----------------------|---------------------------------|--------------------|
| Dirty, unmaintainable code | Independent programmer review + README + handover | Every build gets an external review and documentation — any engineer can take over. |
| Exposed keys and data | Secret scans (Gitleaks) + server-side auth + no secrets in client code | Zero secrets in client code, scans before every deploy — I can show the report. |
| Builds and disappears | Contract + client-owned repo from day 1 + handover policy | The code lives in YOUR repo from day one. I am replaceable by design. |
| AI deletes production | Human approval gates + snapshot / rollback | Nothing goes live without human approval — the agent proposes, you click. |
| Cannot debug when it breaks | Logging + monitoring + maintenance retainer | Everything is logged, and I stay on maintenance — I earn when it works. |
| Vulnerable dependencies | Dependency CVE scan before deploy | Dependencies are scanned before every change. |

## Checklist that must stay true

1. Secrets stay out of the repo; Gitleaks is a gate.
2. Server-side auth on every database / API.
3. Dependency scan before each change.

If a gate is missing, do not claim it on the site.

## Rule

Objections are beaten by **artefacts** (review notes, scan reports, DPA, client repo), not by confidence.

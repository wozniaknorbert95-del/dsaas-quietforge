# Scan Delivery Runbook — Automation Scan (€690)

Internal SOP for delivering the paid Automation Scan. This is an **operations** document —
nothing here names tools in public copy (MR-11). The public page is `/approach/`.

**Updated:** 2026-08-30 · **Owner:** Norbert · **Cost ceiling:** €276/scan (60% margin)

---

## 1. What the client buys

A **written decision basis**, not 90 minutes:

- Pre-work analysis before the session (site, stack, volumes, quote path).
- One 60–90 minute live session.
- A written report within 2–3 working days.
- Fee credited toward a build. Report stays theirs either way.

Non-negotiables (the "100% calm" promise):
- Fixed price, fixed timeline, written before booking.
- No upselling inside the session. The report is the deliverable.
- "Do not automate" is a valid, successful outcome — say it when it is true.
- Client data stays EU; everything delivered is logged and revocable.

---

## 2. Process

### Phase 0 — Intake (before booking)
- Check the client fits ICP: 1–20 person NL service business, owner = bottleneck.
- Confirm the price and the credited fee in writing.
- Collect access to: site, analytics (if any), a sample of the quote path, inbox setup.
- No full admin access at this stage. Minimal, revocable access only.

### Phase 1 — Pre-work (Day 0, ~1.5–2 h)
Checklist:
- [ ] Site review: what does a visitor see, where is the CTA, what converts.
- [ ] Quote/order path: fetch 3–5 real examples, note steps and handoffs.
- [ ] Volume estimation: calls/messages/quotes per week (ask client for rough counts).
- [ ] Stack inventory: what tools are in use, what is disconnected.
- [ ] Load all docs into the analysis library (NotebookLM, grounded citations).
- [ ] Prepare the session agenda with 5–6 measured questions — no "tell me about your business".

### Phase 2 — Live session (Day 1–2, 60–90 min)
- Record with client consent (transcription tool, auto-delete after report).
- Use a shared screen walk: inbox → quoting → reporting, as-is.
- Capture numbers in a table live: hours/week per leak, volumes, wait times.
- Ask the owner: "What do you do on Sunday evenings?" — surface the emotional leaks.
- End with the three biggest leaks stated aloud and confirmed by the client.

### Phase 3 — Analysis + report (Day 2–4)
1. Draft the report from the transcript + pre-work notes.
2. Score maturity on 5 dimensions (tools, processes, data, automation, people).
3. Build the opportunity matrix (impact × effort × risk).
4. Quantify payback: hours × €80/h (conservative, state the assumption).
5. Validate every number against the transcript — no invented metrics.
6. Human review pass: read it as if you were the client. Kill any filler.
7. Render to PDF (Gamma or md-to-pdf), filename `automation-scan-<client>.pdf`.

### Phase 4 — Delivery + follow-up
- Send the PDF with a 1-paragraph cover note (no sales pitch).
- Book a 20-minute "read-through" call — optional, offered, not pushed.
- If the recommendation is build: present the scope + price as a separate step.
- If the recommendation is "do not automate": say it plainly, keep the relationship.

---

## 3. Cost budget (max €276/scan)

Typical spend is **€100–140/scan** at 1–3 scans/week — safely under the ceiling.

| Item | Cost | When |
|---|---|---|
| Session transcription | €0 | every scan (Fathom free tier) |
| Client-doc analysis library | ~€5 | every scan (NotebookLM/Gemini) |
| Report drafting assistant | ~€20 | every scan (Claude Pro, prompt = report template) |
| PDF render | ~€20 | every scan (Gamma Pro / md-to-pdf) |
| Diagrams | €0 | every scan (Napkin AI free) |
| **Core subtotal** | **~€45** | |
| Task-mining on real data | ~$99/mo | only when client gives log/CSV exports (ProcessMind) — amortized across scans that month |
| Industry expert call | €50–150 | ~50% of scans (Clarity/Topmate/Talkspresso) when domain depth matters |
| **Worst case** | **~€265** | within the €276 ceiling |

Gate: if a scan would exceed the ceiling, drop the expert call or the mining tier first —
never cut the human review or the transcript.

---

## 4. Report template

Structure (public page promises exactly this):

1. **Executive summary** — three leaks, combined €/year, top recommendation.
2. **How the scan ran** — session + pre-work, what was measured.
3. **Scored maturity** — 5 dimensions, 1–5, with what we saw.
4. **Opportunity matrix** — every candidate scored impact × effort × risk.
5. **Quantified payback** — hours × €80/h, the math shown line by line.
6. **30/60/90 roadmap** — what, who, how long.
7. **Go / no-go** — clear recommendation, including "do not automate".
8. **What you keep** — the document + diagrams, regardless of next steps.

Example deliverable: `public/artefacts/automation-map-sample.md` (rendered to PDF) —
illustration-only, fictional numbers, same structure.

---

## 5. Benchmarks (sourced, safe to cite as context)

| Metric | Source | Year |
|---|---|---|
| ~11 h/week on admin; owners spend 2× more time on admin than selling | Amex SME Barometer, UK | 2025 |
| Median ~15 h/month admin burden | KfW Focus No. 495, DE | 2025 |
| ~€81–83/h average NL freelancer rate | Knab | 2025 |

Sanity check: 11 h/wk × €80/h ≈ €46K/year → ~66× the scan price. Use as framing only,
never as a guaranteed outcome for a specific client (MR-14).

---

## 6. Zero-AI-slop gate (before every delivery)

- [ ] No `[FILL:]`, brackets, or placeholder text left in the report.
- [ ] Every number traceable to the transcript, pre-work notes, or a cited benchmark.
- [ ] No invented testimonials, logos, or client results.
- [ ] No tool names in the report that the client cannot verify or benefit from.
- [ ] Human voice: first person, concrete, no marketing boilerplate.
- [ ] Read-aloud pass: any sentence that sounds like generated filler → rewrite.

---

## 7. Definition of done

- [ ] Report PDF delivered within 2–3 working days.
- [ ] Cost logged and under €276.
- [ ] Zero-AI-slop gate passed.
- [ ] Read-through call offered.
- [ ] If build follows: separate scope + fixed price, credited fee applied.

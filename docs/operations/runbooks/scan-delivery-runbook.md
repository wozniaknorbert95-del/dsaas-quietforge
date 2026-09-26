# Scan Delivery Runbook — Hours Engine Scan (€149 / €290 / €490)

Internal SOP for delivering Offer A. Public pages: `/approach/` and `/book-a-scan/`.
SSoT: `src/content/scan.ts` + tenant `oferty-v1.md` v1.1.

**Updated:** 2026-09-26 · **Owner:** Norbert · **Split:** 60% spent on this client's files and report / 40% operator time.

Operator ceiling (40% of net): Hours €59.60 · Both-lanes €116.00 · Decision €196.00.

---

## 1. What the client buys

Depth of evidence, not a workshop:

- Hours (€149): one host + **one** owner export (mailbox **or** quotes).
- Both-lanes (€290): one host + **both** exports.
- Decision (€490): Both-lanes + a short GO / PARK / NO call.

The engine is measurement from files. A live workshop is not the product.

Non-negotiables:

- Ranking only of **measured hours**. Waiting time never × €40. Crawl never prints euro.
- Every number carries a label: Measured hours / Waiting time / You stated / Website hypothesis / Not enough data.
- Math: hours/week × €40/h unless the owner declared another rate in writing.
- Do **not** write “pays back in weeks” (needs a build price).
- “Do not automate” is a successful scan. The report stays theirs.
- Paid SKU credited toward Offer B if a build starts within 30 days.
- Owner-only files. No staff inboxes. No live mailbox login. Raw files out of git.

---

## 2. Process

### Phase 0 — Intake (before payment link)

- Fit: 1–20 person NL service business, owner = bottleneck.
- Confirm SKU, net price, VAT, credit 30 days, and what they must send.
- Collect: one hostname. Do **not** ask for live Outlook/Gmail login.

### Phase 1 — Export instructions (after payment)

- Send the export recipe (Outlook/Gmail → file, or quote spreadsheet).
- Require the time window in writing (example: last 30 days).
- Hours: one file. Both-lanes / Decision: mailbox **and** quotes.

### Phase 2 — Measure (after complete export)

- Parse the owner file(s) into the input table (`lane`, `case_id`, `activity`, `timestamp`, `duration_minutes` if present).
- Crawl **one** host only (self-host). Label site findings as Website hypothesis.
- Rank **only** MEASURED hours. PARK lines with insufficient data.

### Phase 3 — Report (typically within 5 working days of a complete export)

1. Draft with labels on every number.
2. Human review: kill filler; no invented metrics.
3. Decision SKU only: propose GO / PARK / NO, then a short confirmation call. Numbers said on the call = You stated.
4. Render PDF. Filename `hours-engine-<client>.pdf`.
5. Delete raw exports after the owner accepts the report or abandons the scan.

### Phase 4 — Delivery

- Send the PDF with a 1-paragraph cover note (no pitch).
- If GO and they want a build: separate Offer B scope + price. Apply the credited SKU fee.
- If NO: say it plainly. Keep the relationship.

---

## 3. Cost budget (40% operator, per SKU)

Spend the other 60% on **this** client's files and report — not platform R&D, not another tenant.

| SKU | Net | 60% on this client | 40% operator ceiling |
|---|---:|---:|---:|
| Hours | €149 | €89.40 | €59.60 |
| Both-lanes | €290 | €174.00 | €116.00 |
| Decision | €490 | €294.00 | €196.00 |

Never cut the human review gate to save money.

---

## 4. Report template

Match the public sample (`public/artefacts/automation-map-sample.md`):

1. Executive summary — sources used, which lines ranked.
2. How the scan ran — SKU, files, window. Never “measured in session”.
3. Evidence labels used.
4. Findings table with labels. Ranking = measured hours only.
5. Website hypotheses (no euro).
6. What we would NOT automate.
7. What you keep. GO on a line is not start of build.

---

## 5. Benchmarks (sourced, context only)

| Metric | Source | Year |
|---|---|---|
| ~11 h/week on admin; owners spend 2× more time on admin than selling | Amex SME Barometer, UK | 2025 |
| Median ~15 h/month admin burden | KfW Focus No. 495, DE | 2025 |
| ~€81–83/h average NL freelancer rate | Knab | 2025 |

Cite as industry context. Never multiply a benchmark by €40 (or €80) and call it this client's result. Scan rate = €40/h or OWNER_DECLARED.

---

## 6. Zero-AI-slop gate (before every delivery)

- [ ] No `[FILL:]`, brackets, or placeholder text left in the report.
- [ ] Every number has an evidence label.
- [ ] No euro from crawl or from waiting time.
- [ ] No payback-in-weeks.
- [ ] No invented testimonials, logos, or client results.
- [ ] Human voice: first person, concrete, no marketing boilerplate.

---

## 7. Definition of done

- [ ] Report PDF delivered typically within 5 working days of a complete export.
- [ ] Operator cost under the 40% ceiling for that SKU.
- [ ] Zero-AI-slop gate passed.
- [ ] Raw files deleted after accept or abandon.
- [ ] If build follows: separate scope + fixed price, credited SKU fee applied.

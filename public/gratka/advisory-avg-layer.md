# AVG & data-processing layer — advisory engagement (1 page)

> **Not legal advice.** This sheet explains what we agree *before* work touching personal data begins. Forward to your compliance officer or accountant.

---

## When this applies

Any system that collects, stores or processes **personal data** on behalf of an advisory firm — including a lead-qualifying assistant, enquiry forms or a content engine with author metadata — requires a clear data-processing agreement **before go-live**.

---

## What we agree (verwerkersovereenkomst / AVG)

| Topic | Our standard position |
|---|---|
| **Roles** | Client = data controller. Norbert / Quietforge = data processor for the systems built. |
| **Purpose** | Lead qualification, enquiry routing, content workflow — limited to agreed scope. |
| **Data collected** | Enquiry type, contact details, topic summary — **not** tax records, financial filings or client dossiers. |
| **Retention** | Defined per data type; deletion procedure documented in handover. |
| **Sub-processors** | Disclosed upfront (hosting, email, AI API if used). EU preference enforced. |
| **Breach notification** | Processor notifies controller without undue delay if a breach is detected. |
| **End of engagement** | Data export offered; access revoked; deletion per agreed schedule. |

---

## Technical controls (mirrors production standards)

### Access
- Dedicated **service accounts** with minimum permissions
- **No passwords** shared over WhatsApp, email or chat
- Access **revoked cleanly** after handover — client can remove in their own admin panel

### Data location
- Hosting and databases **within the EU**
- Provider settings configured to **prevent training on client data** where technically available

### AI assistant — qualification only
- Collects **only what is needed** to route an enquiry
- **Cannot access** client financial records or tax filings
- **Cannot provide** tax, legal or financial advice — hard guardrails in system design
- **Human-in-the-loop** during rollout; production behaviour agreed in UAT

### Oversight
- **Logs on request** — who did what, when
- **Human approval** before any AI-generated content publishes
- **Audit-friendly** — documentation suitable for internal review, not a substitute for legal counsel

---

## What this sheet is NOT

- **Not legal advice** — final wording of any verwerkersovereenkomst is agreed between parties; client's own counsel reviews where required.
- **Not a guarantee of regulatory outcome** — compliance is a shared responsibility; we document and implement agreed controls.
- **Not a promise of launch date** — this engagement is **in delivery**; go-live follows phased sign-off.

---

## Checklist before processing live data

- [ ] Scope document signed — assistant boundaries explicit (qualification only)
- [ ] Verwerkersovereenkomst signed
- [ ] Sub-processors listed and accepted
- [ ] Service accounts created with scoped permissions
- [ ] Test environment validated — no live client data in test
- [ ] UAT sign-off on assistant guardrails and content approval flow
- [ ] Handover README includes retention and deletion procedure

---

## Next step

Want the same rigour applied to your firm? Book a paid **Hours Engine Scan** — we identify what data your first system will touch and what agreements you need before a single line of code hits production.

**Book:** quietforge.flexgrafik.nl/book-discovery/

---
*Norbert — Conversion Systems Architect · Quietforge · quietforge@flexgrafik.nl*

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'systems');
const files = [
  'quote-order-engine-flow.svg',
  'inbox-triage-flow.svg',
  'lead-scout-flow.svg',
  'owner-cockpit-flow.svg',
  'publishing-gate-flow.svg',
  'build-release-flow.svg',
];

const log = [];
for (const f of files) {
  const fp = path.join(dir, f);
  let t = fs.readFileSync(fp, 'utf8');
  const before = t;
  // Replace any corrupted dash (control chars or U+FFFD) with a real em dash
  t = t.replace(/[\x14\uFFFD]/g, '—');
  // Owner cockpit: wrong apostrophe used as arrow
  if (f === 'owner-cockpit-flow.svg') {
    t = t.replace(/Propose \u2019 you click\./, 'Propose \u2192 you click.');
  }
  // Publishing gate: backticks used as separators
  if (f === 'publishing-gate-flow.svg') {
    t = t.replace(/price ` site ` PDF/, 'price \u00b7 site \u00b7 PDF');
  }
  if (t !== before) {
    fs.writeFileSync(fp, t, 'utf8');
    const damaged = (t.match(/[\x14\uFFFD]/g) || []).length;
    const emdash = (t.match(/—/g) || []).length;
    log.push(`${f}: fixed, em-dashes=${emdash}, remaining-damage=${damaged}`);
  } else {
    log.push(`${f}: unchanged`);
  }
}
console.log(log.join('\n'));

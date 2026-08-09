#!/usr/bin/env node
/**
 * Download prod mockup PNGs from a prior PASS gate-e2e-report (no generate).
 * Usage: node scripts/fetch-prod-mockups-from-report.mjs [report-path]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'docs/operations/media/inspire-screens');
const reportPath = process.argv[2] || join(OUT, 'gate-e2e-report-pass.json');

if (!existsSync(reportPath)) {
  console.error('Missing report:', reportPath);
  process.exit(1);
}

const report = JSON.parse(readFileSync(reportPath, 'utf8'));
const srcs = report.mockupSrcs || [];
if (srcs.length < 2) {
  console.error('Report has fewer than 2 mockupSrcs');
  process.exit(1);
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${dest}: ${res.status}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const std = join(OUT, 'prod-mockup-standard.png');
const prem = join(OUT, 'prod-mockup-premium.png');
await download(srcs[0], std);
await download(srcs[1], prem);
console.log('OK', std, prem);

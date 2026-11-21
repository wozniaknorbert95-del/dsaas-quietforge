/**
 * Record Inbox Killer / Jadzia COI classification demo → inbox-killer-demo.mp4
 * Usage: node scripts/record-inbox-killer-demo.mjs
 *
 * **Commander prerequisite:** Jadzia inbox UI reachable at JADZIA_INBOX_URL
 * (staging with test mailbox — no real client PII). Defaults to placeholder
 * tour using services proof screens when inbox URL is unset.
 *
 * Env:
 *   JADZIA_INBOX_URL — live inbox UI (required for real capture)
 *   JADZIA_INBOX_USER / JADZIA_INBOX_PASS — optional basic auth
 */
import {
  launchRecordingBrowser,
  finalizeRecording,
  acceptCookiesIfPresent,
  pause,
  OUT_DIR,
} from './lib/video-record.mjs';
import { join } from 'node:path';

const INBOX_URL = process.env.JADZIA_INBOX_URL ?? '';
const SITE = 'https://quietforge.nl';

async function recordLiveInbox(page) {
  await page.goto(INBOX_URL, { waitUntil: 'networkidle', timeout: 90_000 });
  await pause(page, 3000);
  await acceptCookiesIfPresent(page);

  // 0:00–0:10 — inbox overview
  await pause(page, 4000);

  // 0:10–0:22 — connect / account (scroll if OAuth visible)
  await page.mouse.wheel(0, 400);
  await pause(page, 3000);

  // 0:22–0:40 — lanes scroll
  for (let i = 0; i < 3; i += 1) {
    await page.mouse.wheel(0, 500);
    await pause(page, 2500);
  }

  // 0:40–0:52 — draft / approval gate (click first lane card if present)
  const lane = page.locator('[data-lane], .lane, article, [class*="lane"]').first();
  if (await lane.count()) {
    await lane.click().catch(() => {});
    await pause(page, 3000);
  }

  // 0:52–0:60 — HITL hold
  await pause(page, 4000);
}

/** Fallback when JADZIA_INBOX_URL unset — proof screen tour for Commander re-record. */
async function recordProofFallback(page) {
  console.warn(
    'JADZIA_INBOX_URL not set — recording proof-screen fallback. Re-run with live inbox URL.',
  );
  await page.goto(`${SITE}/results/inbox-killer/`, {
    waitUntil: 'networkidle',
    timeout: 90_000,
  });
  await pause(page, 3000);
  await page.goto(`${SITE}/gratka/inbox-lanes.png`, { waitUntil: 'load', timeout: 30_000 });
  await pause(page, 5000);
  await page.goto(join(SITE, '/gratka/inbox-killer-flow.svg'), {
    waitUntil: 'load',
    timeout: 30_000,
  });
  await pause(page, 5000);
}

async function main() {
  console.log('Recording inbox-killer demo…');
  const { browser, context, page } = await launchRecordingBrowser();
  try {
    if (INBOX_URL) {
      await recordLiveInbox(page);
    } else {
      await recordProofFallback(page);
    }
  } finally {
    const result = await finalizeRecording(context, browser, 'inbox-killer-demo.mp4');
    if (!result.ready) {
      console.error(
        'MP4 not ready — set JADZIA_INBOX_URL for production capture or convert webm manually.',
      );
      process.exit(1);
    }
    if (!INBOX_URL) {
      console.warn(
        'Fallback capture only — Commander must re-record with JADZIA_INBOX_URL before ready:true.',
      );
      process.exit(2);
    }
    console.log('✓ inbox-killer-demo.mp4 ready');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

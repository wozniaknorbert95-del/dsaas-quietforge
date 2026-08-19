import { redirect } from 'next/navigation';

/** Legacy hub — 301 in next.config.ts; this file avoids prerender of old nav asserts. */
export default function SolutionsLegacyRedirect() {
  redirect('/systems/');
}

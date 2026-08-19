import { redirect } from 'next/navigation';

/** Legacy booking URL — next.config 301 + this stub. Form lives in BookDiscoveryForm. */
export default function BookDiscoveryLegacyRedirect() {
  redirect('/book-a-scan/');
}

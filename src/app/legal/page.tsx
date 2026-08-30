import type { Metadata } from 'next';
import { EMAIL, CREATOR } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Legal & Privacy',
  description:
    'Privacy policy, cookie policy, DPA, terms of service and GDPR compliance for Quietforge.',
  openGraph: {
    title: 'Legal & Privacy',
    description: 'Privacy policy, cookie policy, DPA and GDPR compliance.',
    images: [
      {
        url: '/og/legal.svg',
        width: 1200,
        height: 630,
        alt: 'Legal & Privacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal & Privacy',
    description: 'Privacy policy, cookie policy, DPA and GDPR compliance.',
    images: ['/og/legal.svg'],
  },
};

export default function LegalPage() {
  return (
    <main className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[var(--qf-text)]">Legal & Privacy</h1>

        <div className="mt-10 space-y-10">
          <section id="company">
            <h2 className="text-xl font-semibold text-[var(--qf-text)]">Company</h2>
            <div className="mt-4 space-y-3 text-[var(--qf-text-dim)]">
              <p>
                <strong className="text-[var(--qf-text)]">Quietforge</strong> is the
                conversion-systems practice of {CREATOR}, operating from Rotterdam, the
                Netherlands.
              </p>
              <p>
                KVK: 89057554 · Email: <a href={`mailto:${EMAIL}`} className="text-[var(--qf-accent)] hover:underline">{EMAIL}</a>
              </p>
              <p>
                Value-added tax (VAT/BTW) details are provided on issued invoices, as
                required by Dutch law. Services are delivered to clients in the EU.
              </p>
            </div>
          </section>

          <section id="privacy">
            <h2 className="text-xl font-semibold text-[var(--qf-text)]">
              Privacy Policy
            </h2>
            <div className="mt-4 space-y-3 text-[var(--qf-text-dim)]">
              <p>
                Quietforge respects your privacy. This policy explains how we collect,
                use, and protect your personal data.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Data we collect:</strong>{' '}
                Name, email address, and business information provided through the scan
                request form or the WhatsApp discovery chat.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">How we use it:</strong>{' '}
                To respond to inquiries, schedule and deliver the Automation Scan, send
                the written report, and — only with your agreement — follow up about
                implementation. We never sell your data.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Legal basis:</strong>{' '}
                Consent (form submission), performance of the paid service (scan booking),
                and legitimate interest for follow-up on an enquiry you initiated. You may
                withdraw consent at any time.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">WhatsApp discovery chat:</strong>{' '}
                By starting a chat you explicitly opt in to qualification questions.
                Messages are retained for up to 90 days for follow-up. You may request
                deletion at any time via {EMAIL}.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Retention:</strong>{' '}
                Scan requests are kept for up to 12 months after the enquiry, then
                deleted unless a paid engagement starts. Delivered project documentation
                is retained for the duration of any maintenance agreement.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Your rights:</strong>{' '}
                Under GDPR/AVG you have the right to access, correct, export, or delete
                your data. Contact us at {EMAIL}.
              </p>
            </div>
          </section>

          <section id="cookies">
            <h2 className="text-xl font-semibold text-[var(--qf-text)]">
              Cookie Policy
            </h2>
            <div className="mt-4 space-y-3 text-[var(--qf-text-dim)]">
              <p>
                This site uses only anonymous visitor statistics (Google Analytics 4) to
                understand which pages help small businesses. No advertising cookies and
                no cross-site tracking are used.
              </p>
              <p>
                Analytics are disabled by default and are enabled only after you accept
                the consent banner. You can withdraw or change your choice at any time by
                clearing the site&apos;s storage in your browser settings.
              </p>
              <p>
                A strictly necessary local-storage flag remembers your consent choice. It
                contains no personal data.
              </p>
            </div>
          </section>

          <section id="dpa">
            <h2 className="text-xl font-semibold text-[var(--qf-text)]">
              Data Processing Agreement (DPA)
            </h2>
            <div className="mt-4 space-y-3 text-[var(--qf-text-dim)]">
              <p>
                Where Quietforge processes personal data on behalf of a client business,
                the following applies and is deemed accepted upon delivery of the
                engagement:
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Scope:</strong> Quietforge acts
                as a data processor only for the client-specific data handled inside the
                delivered systems (e.g. inbox, orders, leads). The client remains the data
                controller.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Sub-processors:</strong> hosting
                (Vercel), email transport, and the messaging channel used for delivery.
                Each is bound by its own GDPR-compliant terms; a list is available on
                request.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Security:</strong> processing is
                protected by the controls published on the{' '}
                <a href="/security/" className="text-[var(--qf-accent)] hover:underline">
                  Security
                </a>{' '}
                page — server-side auth, secret scans, dependency scans, logging and
                rollback.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Data export & deletion:</strong>{' '}
                client data can be exported in a readable format and deleted on request.
                The client&apos;s repository and documentation remain theirs from day one.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--qf-text)]">
              Terms of Service
            </h2>
            <div className="mt-4 space-y-3 text-[var(--qf-text-dim)]">
              <p>
                By using our services, you agree to these terms. Services are provided as
                described on our website. No guarantees of specific business outcomes are
                made.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Payment:</strong> The Automation
                Scan (€690) is paid upfront. Build fees are invoiced 50% at kickoff and the
                final 50% only after the system runs in your production. Care plans are
                billed monthly in advance.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Scan credit:</strong> The scan
                fee is credited toward any implementation started within 30 days of the
                session.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Cancellation:</strong>{' '}
                Monthly care plans can be cancelled anytime with 7 days notice. You retain
                all your data, your repository and your documentation.
              </p>
              <p>
                <strong className="text-[var(--qf-text)]">Liability:</strong>{' '}
                Quietforge liability is limited to the amount paid for services in the
                preceding 12 months.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--qf-text)]">Contact</h2>
            <p className="mt-4 text-[var(--qf-text-dim)]">
              For any legal or privacy questions, contact us at{' '}
              <a
                href={`mailto:${EMAIL}`}
                className="text-[var(--qf-accent)] hover:underline"
              >
                {EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

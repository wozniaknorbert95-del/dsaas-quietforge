import { Metadata } from 'next';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-[var(--qf-sp-6)] text-center">
      <span className="mb-4 text-[var(--qf-fs-xs)] uppercase tracking-[0.18em] text-[var(--qf-accent)]">
        <span className="text-[var(--qf-text-faint)]">{'// '}</span>404
      </span>
      <h1 className="mb-4 text-[var(--qf-fs-3xl)] text-[var(--qf-text)]">Page not found</h1>
      <p className="mb-8 max-w-md text-[var(--qf-text-dim)]">
        This page does not exist (anymore).
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href={ROUTES.systems} variant="secondary">
          See the systems
        </Button>
        <Button href={ROUTES.bookAScan} variant="secondary">
          Book a scan
        </Button>
      </div>
    </div>
  );
}

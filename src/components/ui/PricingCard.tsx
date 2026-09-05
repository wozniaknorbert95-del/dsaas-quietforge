import { cn } from '@/lib/utils';
import Button from './Button';
import { CTAS } from '@/content/conversion-copy';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

export default function PricingCard({
  name,
  price,
  period,
  features,
  ctaLabel = `${CTAS.bookAutomationMap} →`,
  ctaHref = '/book-a-scan/',
  highlighted = false,
  badge,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[var(--qf-radius)] border bg-[var(--qf-bg-raised)] p-6 h-full',
        highlighted ? 'border-[var(--qf-accent)]' : 'border-[var(--qf-border)]',
        className
      )}
    >
      {badge && (
        <span className="mb-2 inline-block w-fit text-[var(--qf-fs-xs)] uppercase tracking-[0.08em] text-[var(--qf-bg)] bg-[var(--qf-accent)] px-2 py-0.5 rounded-[var(--qf-radius)]">
          {badge}
        </span>
      )}
      <span className="text-[var(--qf-fs-xs)] uppercase tracking-[0.1em] text-[var(--qf-text-dim)]">
        {name}
      </span>
      <div className="my-2 text-[var(--qf-fs-2xl)] text-[var(--qf-text)]">
        {price}
        {period && (
          <span className="text-[var(--qf-fs-sm)] text-[var(--qf-text-faint)]">{period}</span>
        )}
      </div>
      <ul className="mb-6 flex-1 list-none space-y-2 p-0">
        {features.map((feature) => (
          <li key={feature} className="relative pl-6 text-[var(--qf-text-dim)] text-sm">
            <span className="absolute left-0 text-[var(--qf-ok)]">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <Button href={ctaHref} variant={highlighted ? 'primary' : 'secondary'} className="w-full justify-center">
        {ctaLabel}
      </Button>
    </div>
  );
}

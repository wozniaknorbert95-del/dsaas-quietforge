import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'spearhead';
  hover?: boolean;
  interactive?: boolean;
}

export default function Card({
  children,
  className,
  variant = 'default',
  hover = false,
  interactive = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] p-6 transition-colors duration-[var(--qf-transition)]',
        variant === 'accent' && 'border-[var(--qf-accent)]',
        variant === 'spearhead' &&
          'border-[var(--qf-accent)] shadow-[0_0_0_1px_var(--qf-accent-glow),0_0_40px_var(--qf-accent-glow)]',
        hover && 'hover:border-[var(--qf-border-bright)]',
        interactive && 'cursor-pointer hover:border-[var(--qf-border-bright)]',
        className
      )}
    >
      {children}
    </div>
  );
}

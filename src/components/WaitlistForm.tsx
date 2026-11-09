'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'not_ready'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, referrer: window.location.href }),
      });

      if (res.ok) {
        setStatus('success');
        return;
      }

      setStatus(res.status === 503 ? 'not_ready' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-ok)] bg-[var(--qf-bg-inset)] px-4 py-3 text-sm text-[var(--qf-ok)]">
        Thank you! We will contact you when modernization opens.
      </p>
    );
  }

  if (status === 'not_ready') {
    return (
      <p className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-sm text-[var(--qf-text-dim)]">
        Sign-up is not connected yet — nothing was sent or stored. Please check back soon.
      </p>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full">
        <p className="rounded-[var(--qf-radius)] border border-[var(--qf-error)] bg-[var(--qf-bg-inset)] px-4 py-3 text-sm text-[var(--qf-error)] mb-3">
          Could not sign up right now. Please try again.
        </p>
        <Button type="button" variant="secondary" onClick={() => setStatus('idle')}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <form
      className="mt-4 flex flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="your@email.com"
        required
        disabled={status === 'submitting'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg)] px-4 py-3 text-sm text-[var(--qf-text)] placeholder:text-[var(--qf-text-faint)] focus:border-[var(--qf-accent)] focus:outline-none disabled:opacity-50"
      />
      <Button type="submit" variant="primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Notify Me'}
      </Button>
    </form>
  );
}
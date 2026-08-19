'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { EMAIL } from '@/lib/constants';

const PAIN_OPTIONS = [
  'Drowning in email',
  'Outdated site',
  'Manual quotes',
  'Few leads',
  'Not sure',
];

const BUDGET_OPTIONS = [
  'Not sure yet',
  'Under €1,200',
  '€1,200–€3,500',
  '€3,500+',
];

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function BookDiscoveryForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    url: '',
    pains: [] as string[],
    budget: 'Not sure yet',
    availability: '',
    other: '',
    website: '',
  });

  const handlePainToggle = (pain: string) => {
    setFormData((prev) => ({
      ...prev,
      pains: prev.pains.includes(pain)
        ? prev.pains.filter((p) => p !== pain)
        : [...prev.pains, pain],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    trackEvent('intake_submit', { location: 'book_discovery_form' });

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, referrer: window.location.href }),
      });

      if (res.ok) {
        setStatus('success');
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setErrorMessage(data.error ?? 'send_failed');
      setStatus('error');
    } catch {
      setErrorMessage('network_error');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-[var(--qf-radius)] border border-[var(--qf-ok)] bg-[var(--qf-bg-raised)] p-8 max-w-2xl">
        <h3 className="text-[var(--qf-fs-lg)] font-bold text-[var(--qf-ok)] mb-2">
          Request received.
        </h3>
        <p className="text-[var(--qf-text-dim)]">
          Thank you — if the fit is right, I will send a payment link and available session times
          within 24 hours.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-[var(--qf-radius)] border border-[var(--qf-error)] bg-[var(--qf-bg-raised)] p-8 max-w-2xl">
        <h3 className="text-[var(--qf-fs-lg)] font-bold text-[var(--qf-error)] mb-2">
          Something went wrong.
        </h3>
        <p className="text-[var(--qf-text-dim)] mb-4">
          Your request could not be sent right now. Please try again, or email me directly at{' '}
          <a
            href={`mailto:${EMAIL}?subject=Automation%20Map%20request`}
            className="text-[var(--qf-accent)] hover:underline"
          >
            {EMAIL}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setStatus('idle');
            setErrorMessage('');
          }}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label htmlFor="bdf-name" className="block text-sm font-semibold text-[var(--qf-text)] mb-2">
          Name
        </label>
        <input
          id="bdf-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-[var(--qf-text)] placeholder:text-[var(--qf-text-faint)] focus:border-[var(--qf-accent)] focus:outline-none"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="bdf-company" className="block text-sm font-semibold text-[var(--qf-text)] mb-2">
          Business name
        </label>
        <input
          id="bdf-company"
          type="text"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-[var(--qf-text)] placeholder:text-[var(--qf-text-faint)] focus:border-[var(--qf-accent)] focus:outline-none"
          placeholder="Company or brand name"
        />
      </div>

      <div>
        <label htmlFor="bdf-email" className="block text-sm font-semibold text-[var(--qf-text)] mb-2">
          Email
        </label>
        <input
          id="bdf-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-[var(--qf-text)] placeholder:text-[var(--qf-text-faint)] focus:border-[var(--qf-accent)] focus:outline-none"
          placeholder="hello@example.com"
        />
      </div>

      <div>
        <label htmlFor="bdf-url" className="block text-sm font-semibold text-[var(--qf-text)] mb-2">
          Website / link
        </label>
        <input
          id="bdf-url"
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-[var(--qf-text)] placeholder:text-[var(--qf-text-faint)] focus:border-[var(--qf-accent)] focus:outline-none"
          placeholder="https://your-site.com"
        />
      </div>

      <div>
        <span className="block text-sm font-semibold text-[var(--qf-text)] mb-3">
          Your biggest pain right now
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PAIN_OPTIONS.map((pain) => (
            <label
              key={pain}
              className={`flex items-center gap-3 rounded-[var(--qf-radius)] border px-4 py-3 cursor-pointer transition-colors ${
                formData.pains.includes(pain)
                  ? 'border-[var(--qf-accent)] bg-[var(--qf-accent-glow)]'
                  : 'border-[var(--qf-border)] bg-[var(--qf-bg-inset)] hover:border-[var(--qf-border-bright)]'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.pains.includes(pain)}
                onChange={() => handlePainToggle(pain)}
                className="h-4 w-4 accent-[var(--qf-accent)]"
              />
              <span className="text-sm text-[var(--qf-text-dim)]">{pain}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="bdf-budget" className="block text-sm font-semibold text-[var(--qf-text)] mb-2">
          Budget range
        </label>
        <select
          id="bdf-budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-[var(--qf-text)] focus:border-[var(--qf-accent)] focus:outline-none"
        >
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bdf-availability" className="block text-sm font-semibold text-[var(--qf-text)] mb-2">
          Preferred time zone / availability
        </label>
        <input
          id="bdf-availability"
          type="text"
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-[var(--qf-text)] placeholder:text-[var(--qf-text-faint)] focus:border-[var(--qf-accent)] focus:outline-none"
          placeholder="e.g. CET mornings, Tue–Thu"
        />
      </div>

      <div>
        <label htmlFor="bdf-other" className="block text-sm font-semibold text-[var(--qf-text)] mb-2">
          Anything else? (optional)
        </label>
        <textarea
          id="bdf-other"
          rows={4}
          value={formData.other}
          onChange={(e) => setFormData({ ...formData, other: e.target.value })}
          className="w-full rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] px-4 py-3 text-[var(--qf-text)] placeholder:text-[var(--qf-text-faint)] focus:border-[var(--qf-accent)] focus:outline-none resize-y"
          placeholder="Current tools, team size, what you want fixed first..."
        />
      </div>

      {/* Honeypot — must stay empty; bot fill = rejected server-side */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        analyticsEvent="cta_book_map_click"
        analyticsDetail={{ location: 'book_discovery_submit' }}
      >
        {status === 'submitting' ? 'Sending…' : 'Request the scan — I reply within one working day'}
      </Button>

      {errorMessage && (
        <p className="text-xs text-[var(--qf-error)]">
          Error: {errorMessage}
        </p>
      )}

      <p className="text-xs text-[var(--qf-text-faint)]">
        If the fit is right, I&apos;ll send a payment link and available times within 24 hours. No spam.
      </p>
    </form>
  );
}

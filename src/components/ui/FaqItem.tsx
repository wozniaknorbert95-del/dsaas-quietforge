'use client';

import { useId, useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
  className?: string;
}

export default function FaqItem({ question, answer, className }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`qf-faq-item ${className ?? ''}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="qf-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
      >
        {question}
        <span className="qf-faq-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        id={panelId}
        className={open ? 'qf-faq-panel is-open' : 'qf-faq-panel'}
        hidden={!open}
      >
        <p className="qf-faq-answer">{answer}</p>
      </div>
    </div>
  );
}

import type { SystemRecord } from '@/content/systems-catalog';

export default function TLDRBox({ tldr }: { tldr: SystemRecord['tldr'] }) {
  const rows = [
    { label: 'What it is', value: tldr.is },
    { label: 'Typically gives back', value: tldr.givesBack },
    { label: 'Replaces', value: tldr.replaces },
  ];

  return (
    <dl className="qf-tldr">
      {rows.map((row) => (
        <div key={row.label} className="qf-tldr-row">
          <dt className="qf-tldr-label">{row.label}</dt>
          <dd className="qf-tldr-value">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

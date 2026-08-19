import type { SystemRecord } from '@/content/systems-catalog';

export default function FeatureGallery({
  features,
}: {
  features: SystemRecord['features'];
}) {
  return (
    <ul className="qf-feature-grid">
      {features.map((feature) => (
        <li key={feature.name} className="qf-feature-card">
          <h3 className="qf-feature-name">{feature.name}</h3>
          <p className="qf-feature-does">{feature.does}</p>
          <p className="qf-feature-see">{feature.ownerSees}</p>
        </li>
      ))}
    </ul>
  );
}

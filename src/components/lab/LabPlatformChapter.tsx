import { LAB_PLATFORM_FACTS } from '@/content/lab';

export default function LabPlatformChapter() {
  return (
    <div className="qf-lab-platform-grid">
      {LAB_PLATFORM_FACTS.map((fact) => (
        <article key={fact.title} className="qf-lab-platform-card">
          <h3>{fact.title}</h3>
          <p>{fact.body}</p>
        </article>
      ))}
    </div>
  );
}

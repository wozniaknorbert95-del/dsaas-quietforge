export default function FlowDiagram({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="qf-flow">
      {/* SVG schematic — not a live screenshot. */}
      <img src={src} alt={alt} className="qf-flow-img" />
      <figcaption className="qf-flow-caption">{caption}</figcaption>
    </figure>
  );
}

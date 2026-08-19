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
      <img
        src={src}
        alt={alt}
        width={1200}
        height={520}
        className="qf-flow-img"
      />
      <figcaption className="qf-flow-caption">{caption}</figcaption>
    </figure>
  );
}

import React from 'react';

interface ReferenceItem {
  title: string;
  url: string;
}

interface ReferenceBlockProps {
  references?: ReferenceItem[];
  furtherReading?: ReferenceItem[];
  relatedSystems?: ReferenceItem[];
}

function ReferenceSection({ title, items }: { title: string; items: ReferenceItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="reference-section">
      <div className="reference-title">{title}</div>
      <ul className="reference-list">
        {items.map((item, i) => (
          <li key={i}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ReferenceBlock({ references, furtherReading, relatedSystems }: ReferenceBlockProps) {
  const hasAny = (references && references.length > 0) ||
                 (furtherReading && furtherReading.length > 0) ||
                 (relatedSystems && relatedSystems.length > 0);

  if (!hasAny) return null;

  return (
    <div className="reference-block">
      <ReferenceSection title="Official References" items={references || []} />
      <ReferenceSection title="Further Reading" items={furtherReading || []} />
      <ReferenceSection title="Related Systems" items={relatedSystems || []} />
    </div>
  );
}

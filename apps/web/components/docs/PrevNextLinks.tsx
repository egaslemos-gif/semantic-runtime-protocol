import React from 'react';
import Link from 'next/link';

interface PrevNextLinksProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export default function PrevNextLinks({ prev, next }: PrevNextLinksProps) {
  if (!prev && !next) return null;

  return (
    <div className="prev-next-links" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
      <div>
        {prev && (
          <Link href={prev.href} className="prev-link" style={{ display: 'block' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Previous</div>
            <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>← {prev.title}</div>
          </Link>
        )}
      </div>
      <div style={{ textAlign: 'right' }}>
        {next && (
          <Link href={next.href} className="next-link" style={{ display: 'block' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Next</div>
            <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>{next.title} →</div>
          </Link>
        )}
      </div>
    </div>
  );
}

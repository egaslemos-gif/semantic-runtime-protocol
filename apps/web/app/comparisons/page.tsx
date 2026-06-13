import React from 'react';
import Link from 'next/link';
import { getSectionByKey } from '@/lib/navigation';

export default function ComparisonsIndex() {
  const section = getSectionByKey('comparisons')!;

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '720px' }}>
      <div className="page-header">
        <div className="page-breadcrumb">
          <Link href="/">SRP</Link>
          <span>/</span>
          Comparisons
        </div>
        <h1 className="page-title">Comparisons</h1>
        <p className="page-description">
          How SRP relates to existing technologies in the AI engineering ecosystem. Respectful, analytical, non-tribal.
        </p>
      </div>

      <div className="section-index">
        {section.pages.map((page) => (
          <Link key={page.slug} href={`/comparisons/${page.slug}`} className="section-card">
            <div className="section-card-title">{page.title}</div>
            {page.description && (
              <div className="section-card-description">{page.description}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

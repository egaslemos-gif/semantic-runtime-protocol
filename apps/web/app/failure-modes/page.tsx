import React from 'react';
import Link from 'next/link';
import { getSectionByKey } from '@/lib/navigation';

export default function FailureModesIndex() {
  const section = getSectionByKey('failure-modes')!;

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '720px' }}>
      <div className="page-header">
        <div className="page-breadcrumb">
          <Link href="/">SRP</Link>
          <span>/</span>
          Failure Modes
        </div>
        <h1 className="page-title">Failure Modes</h1>
        <p className="page-description">
          Real engineering failures that happen when AI agents operate without runtime boundaries.
        </p>
      </div>

      <div className="section-index">
        {section.pages.map((page) => (
          <Link key={page.slug} href={`/failure-modes/${page.slug}`} className="section-card">
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

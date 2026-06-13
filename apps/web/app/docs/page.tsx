import React from 'react';
import Link from 'next/link';
import { getSectionByKey } from '@/lib/navigation';

export default function DocsIndex() {
  const section = getSectionByKey('docs')!;

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '720px' }}>
      <div className="page-header">
        <div className="page-breadcrumb">
          <Link href="/">SRP</Link>
          <span>/</span>
          Docs
        </div>
        <h1 className="page-title">Documentation</h1>
        <p className="page-description">
          Runtime boundaries, traversal engine, context firewall, constraints, and specifications.
        </p>
      </div>

      <div className="section-index">
        {section.pages.map((page) => (
          <Link key={page.slug} href={`/docs/${page.slug}`} className="section-card">
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

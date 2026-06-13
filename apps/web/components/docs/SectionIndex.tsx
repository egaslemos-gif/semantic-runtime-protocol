import React from 'react';
import Link from 'next/link';
import type { NavSection } from '@/lib/navigation';

interface SectionIndexProps {
  section: NavSection;
  description?: string;
}

export default function SectionIndex({ section, description }: SectionIndexProps) {
  return (
    <div className="section-index" style={{ padding: '2rem 2.5rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          {section.title}
        </h1>
        {description && (
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
            {description}
          </p>
        )}
      </header>

      <div className="article-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {section.pages.map((page) => (
          <article key={page.slug} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
            <Link href={`${section.href}/${page.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {page.title}
              </h2>
              {page.description && (
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {page.description}
                </p>
              )}
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Read more →
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

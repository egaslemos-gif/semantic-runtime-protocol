import React from 'react';
import { notFound } from 'next/navigation';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { getSectionByKey, getGlobalPrevNext } from '@/lib/navigation';
import { PageHeader, PrevNextLinks, MDXRenderer } from '@/components/docs';
import Prose from '@/components/content/Prose';
import ReferenceBlock from '@/components/content/ReferenceBlock';

export async function generateStaticParams() {
  const slugs = getAllSlugs('foundations');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContentBySlug('foundations', slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: `${page.frontmatter.title} — SRP Foundations`,
    description: page.frontmatter.description,
  };
}

export default async function FoundationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContentBySlug('foundations', slug);
  if (!page) notFound();

  const section = getSectionByKey('foundations')!;
  const { prev, next } = getGlobalPrevNext('foundations', slug);

  return (
    <div style={{ padding: '2rem 2.5rem' }}>
      <div className="page-content">
        <PageHeader
          title={page.frontmatter.title}
          description={page.frontmatter.description}
          section={section.title}
          sectionHref={section.href}
        />
        <Prose>
          <MDXRenderer source={page.content} />
        </Prose>
        <ReferenceBlock
          references={page.frontmatter.references}
          furtherReading={page.frontmatter.furtherReading}
          relatedSystems={page.frontmatter.relatedSystems}
        />
        <PrevNextLinks prev={prev} next={next} />
      </div>
    </div>
  );
}

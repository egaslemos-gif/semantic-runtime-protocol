import React from 'react';
import { notFound } from 'next/navigation';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { getSectionByKey, getGlobalPrevNext } from '@/lib/navigation';
import { PageHeader, PrevNextLinks, MDXRenderer } from '@/components/docs';
import Prose from '@/components/content/Prose';
import ReferenceBlock from '@/components/content/ReferenceBlock';

export async function generateStaticParams() {
  const slugs = getAllSlugs('failure-modes');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContentBySlug('failure-modes', slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: `${page.frontmatter.title} — SRP Failure Modes`,
    description: page.frontmatter.description,
  };
}

export default async function FailureModesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContentBySlug('failure-modes', slug);
  if (!page) notFound();

  const section = getSectionByKey('failure-modes')!;
  const { prev, next } = getGlobalPrevNext('failure-modes', slug);

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

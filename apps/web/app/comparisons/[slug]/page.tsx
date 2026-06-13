import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { getSectionByKey } from '@/lib/navigation';
import PageHeader from '@/components/content/PageHeader';
import Prose from '@/components/content/Prose';
import ReferenceBlock from '@/components/content/ReferenceBlock';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const slugs = getAllSlugs('comparisons');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContentBySlug('comparisons', slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: `${page.frontmatter.title} — SRP Comparisons`,
    description: page.frontmatter.description,
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getContentBySlug('comparisons', slug);
  if (!page) notFound();

  const section = getSectionByKey('comparisons')!;

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
          <MDXRemote
            source={page.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </Prose>
        <ReferenceBlock
          references={page.frontmatter.references}
          furtherReading={page.frontmatter.furtherReading}
          relatedSystems={page.frontmatter.relatedSystems}
        />
      </div>
    </div>
  );
}

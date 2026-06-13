import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

/** Zod schema for MDX frontmatter validation */
const referenceSchema = z.object({
  title: z.string(),
  url: z.string(),
});

export const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  references: z.array(referenceSchema).optional(),
  furtherReading: z.array(referenceSchema).optional(),
  relatedSystems: z.array(referenceSchema).optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export interface ContentPage {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get a single content page by section and slug.
 * Returns parsed frontmatter and raw MDX content.
 */
export function getContentBySlug(section: string, slug: string): ContentPage | null {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = frontmatterSchema.parse(data);

  return {
    slug,
    frontmatter,
    content,
  };
}

/**
 * Get all content pages in a section, sorted by order.
 */
export function getAllContent(section: string): ContentPage[] {
  const sectionDir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  const files = fs.readdirSync(sectionDir).filter(f => f.endsWith('.mdx'));

  const pages = files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    return getContentBySlug(section, slug);
  }).filter((p): p is ContentPage => p !== null);

  return pages.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/**
 * Get all slugs for a section (for generateStaticParams).
 */
export function getAllSlugs(section: string): string[] {
  const sectionDir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  return fs.readdirSync(sectionDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}

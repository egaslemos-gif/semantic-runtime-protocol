import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ParsedNode, RawFrontmatter } from '../types/canonical';

/**
 * Stage 1: Discovery & Parsing
 * The parser ONLY extracts content and raw frontmatter. 
 * It DOES NOT validate structure or resolve semantics.
 */

function getAllMdxFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    if (!fs.existsSync(dirPath)) {
        return arrayOfFiles;
    }

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllMdxFiles(fullPath, arrayOfFiles);
        } else if (fullPath.endsWith('.mdx')) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

export function parseMdxFiles(directories: string[]): ParsedNode[] {
    const parsedNodes: ParsedNode[] = [];

    directories.forEach(dir => {
        const files = getAllMdxFiles(dir);

        files.forEach((filePath) => {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            // We grab whatever is there. Zod catches structural errors in Stage 2.
            const rawFrontmatter = data as RawFrontmatter;

            parsedNodes.push({
                id: rawFrontmatter.canonical_id || `unassigned_${Math.random().toString(36).substring(7)}`,
                frontmatter: rawFrontmatter,
                body: content,
                filePath
            });
        });
    });

    return parsedNodes;
}

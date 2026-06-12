import { z } from 'zod';
import { ParsedNode, ValidatedNode } from '../types/canonical';

/**
 * Stage 2: Schema Validator
 * Validates ONLY the structure. Does NOT validate semantic rules like orphan nodes or lifecycle.
 */
export const SemanticNodeSchema = z.object({
    // Identity (Required)
    canonical_id: z.string().min(1),
    node_type: z.enum(['primitive', 'governance', 'system', 'anti_pattern', 'playbook', 'case_study']),
    title: z.string().min(1),
    status: z.enum(['draft', 'production', 'deprecated']),

    // Semantic Context (Optional)
    ownership_domain: z.enum(['Frontend', 'Backend', 'Infrastructure', 'Methodology', 'Global']).optional(),
    runtime_scope: z.enum(['Build', 'Client', 'Server', 'Edge', 'Agnostic']).optional(),
    constraint_level: z.enum(['Strict', 'Recommended', 'Informational']).optional(),

    // Priority & Weighting (Optional)
    semantic_weight: z.enum(['absolute', 'high', 'medium', 'low']).optional(),
    context_priority: z.enum(['critical', 'high', 'medium', 'low']).optional(),

    // Relational Edges (arrays of Canonical IDs, default empty array)
    owns: z.array(z.string()).optional().default([]),
    enforces: z.array(z.string()).optional().default([]),
    prevents: z.array(z.string()).optional().default([]),
    depends_on: z.array(z.string()).optional().default([]),
    extends: z.array(z.string()).optional().default([]),
    contextualizes: z.array(z.string()).optional().default([]),
    contradicts: z.array(z.string()).optional().default([]),
    supersedes: z.array(z.string()).optional().default([])
});

export type ValidatedFrontmatter = z.infer<typeof SemanticNodeSchema>;

export function validateNodeStructure(node: ParsedNode): ValidatedNode {
    try {
        const validFrontmatter = SemanticNodeSchema.parse(node.frontmatter);
        
        return {
            ...node,
            id: validFrontmatter.canonical_id,
            frontmatter: validFrontmatter
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error(`[FATAL: STRUCTURAL] Schema violation in file: ${node.filePath}`);
            console.error(error.errors);
        }
        throw new Error(`Schema validation failed for ${node.filePath}`);
    }
}

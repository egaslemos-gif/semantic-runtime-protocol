/**
 * Types representing the Semantic Nodes and Edges
 * Based directly on methodology/FRONTMATTER_SPEC.md
 * 
 * GRAPH_MEMORY_MODEL.md outlines 5 strict memory states:
 * ParsedNode -> ValidatedNode -> SemanticNode -> ResolvedNode -> GraphNode
 */

export type CanonicalId = string;

export type NodeType = 'primitive' | 'governance' | 'system' | 'anti_pattern' | 'playbook' | 'case_study';
export type NodeStatus = 'draft' | 'production' | 'deprecated';
export type OwnershipDomain = 'Frontend' | 'Backend' | 'Infrastructure' | 'Methodology' | 'Global';
export type RuntimeScope = 'Build' | 'Client' | 'Server' | 'Edge' | 'Agnostic';
export type ConstraintLevel = 'Strict' | 'Recommended' | 'Informational';
export type SemanticWeight = 'absolute' | 'high' | 'medium' | 'low';
export type ContextPriority = 'critical' | 'high' | 'medium' | 'low';

// Represents the raw data extracted from MDX frontmatter before Zod Validation
export interface RawFrontmatter {
    canonical_id?: string;
    node_type?: string;
    title?: string;
    status?: string;
    ownership_domain?: string;
    runtime_scope?: string;
    constraint_level?: string;
    semantic_weight?: string;
    context_priority?: string;
    
    // Relational Edges
    owns?: string[];
    enforces?: string[];
    prevents?: string[];
    depends_on?: string[];
    extends?: string[];
    contextualizes?: string[];
    contradicts?: string[];
    supersedes?: string[];
}

/**
 * Stage 1: Parsed Node (Raw Extraction)
 * Output from parser.ts. Raw extraction, no structural guarantees.
 */
export interface ParsedNode {
    id: CanonicalId; // Extracted or fallback auto-generated
    frontmatter: RawFrontmatter;
    body: string;
    filePath: string;
}

/**
 * Stage 2: Validated Node (Structurally Valid)
 * Output from schema.ts. Guarantees required fields exist via Zod.
 */
export interface ValidatedNode extends ParsedNode {
    frontmatter: Required<Pick<RawFrontmatter, 'canonical_id' | 'node_type' | 'title' | 'status'>> & RawFrontmatter;
}

/**
 * Stage 3: Semantic Node (Semantically Coherent)
 * Output from semantic.ts. Has passed internal logical integrity checks.
 * Edges are still strings.
 */
export interface SemanticNode extends ValidatedNode {
    isSemanticallyValid: true;
}

/**
 * Stage 4: Resolved Node (Connected)
 * Output from resolver.ts. String edges have been mapped to memory references or weights.
 * Ownership and conflict checks have passed.
 */
export interface ResolvedNode extends SemanticNode {
    resolvedEdges: {
        outbound: Map<string, ResolvedNode>;
        inbound: Map<string, ResolvedNode>;
    };
    semanticScore?: number;
}

/**
 * Stage 5: Graph Node (Immutable Runtime)
 * Output from assembly.ts. The node is frozen.
 */
export type GraphNode = Readonly<ResolvedNode>;

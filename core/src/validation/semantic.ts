import { ValidatedNode, SemanticNode } from '../types/canonical';

/**
 * Stage 3: Semantic Validator
 * Deterministic rejection engine. It does not infer or repair.
 * It strictly upgrades ValidatedNode -> SemanticNode if isolated internal checks pass.
 */
export class SemanticValidator {
    
    /**
     * Validates internal semantic coherence of a single node.
     * Resolves Structural/Contextual mismatches before graph resolution.
     */
    public static validate(node: ValidatedNode): SemanticNode {
        
        // Rule: A 'governance' node must have a constraint_level
        if (node.frontmatter.node_type === 'governance' && !node.frontmatter.constraint_level) {
            throw new Error(`[FATAL: SEMANTIC] Node '${node.id}' is of type 'governance' but lacks a 'constraint_level'.`);
        }

        // Rule: A 'system' node must have an ownership_domain
        if (node.frontmatter.node_type === 'system' && !node.frontmatter.ownership_domain) {
            throw new Error(`[FATAL: GOVERNANCE] Node '${node.id}' is of type 'system' but lacks an 'ownership_domain'.`);
        }

        // Rule: 'deprecated' nodes cannot have 'Strict' constraints
        if (node.frontmatter.status === 'deprecated' && node.frontmatter.constraint_level === 'Strict') {
            throw new Error(`[FATAL: SEMANTIC] Node '${node.id}' is 'deprecated' but enforces a 'Strict' constraint.`);
        }

        return {
            ...node,
            isSemanticallyValid: true
        } as SemanticNode;
    }

    /**
     * Batch processes nodes. Fails fast.
     */
    public static validateAll(nodes: ValidatedNode[]): SemanticNode[] {
        return nodes.map(node => this.validate(node));
    }
}

import { ResolvedNode } from '../../types/canonical';
import { SemanticRegistry } from '../registry';

/**
 * Phase 4: Governance Resolver
 * Verifies that Constitutional boundaries are not crossed. 
 * E.g., 'case_study' cannot enforce on 'governance'.
 */
export function resolveGovernance(nodes: ResolvedNode[], registry: SemanticRegistry): ResolvedNode[] {
    for (const node of nodes) {
        // Contradiction Trap
        for (const [edgeKey, targetNode] of node.resolvedEdges.outbound.entries()) {
            if (edgeKey.startsWith('enforces:')) {
                // Check if target explicitly contradicts source
                if (targetNode.frontmatter.contradicts?.includes(node.id)) {
                    throw new Error(`[FATAL: SEMANTIC] Semantic Drift: Node '${node.id}' enforces '${targetNode.id}', but '${targetNode.id}' explicitly contradicts '${node.id}'. Resolve architectural paradox manually.`);
                }
            }
        }

        // Tier restriction (Case studies cannot govern)
        if (node.frontmatter.node_type === 'case_study' && node.frontmatter.enforces && node.frontmatter.enforces.length > 0) {
             throw new Error(`[FATAL: GOVERNANCE] Tier Violation: '${node.id}' is a 'case_study' and cannot enforce laws.`);
        }

        // Scope Leakage
        if (node.frontmatter.runtime_scope === 'Server') {
            for (const [edgeKey, targetNode] of node.resolvedEdges.outbound.entries()) {
                if (edgeKey.startsWith('depends_on:') && targetNode.frontmatter.runtime_scope === 'Client') {
                    console.error(`[ERROR: SEMANTIC] Scope Leakage: Server node '${node.id}' tightly coupled to Client node '${targetNode.id}'.`);
                }
            }
        }
    }
    return [...nodes];
}

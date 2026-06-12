import { ResolvedNode } from '../../types/canonical';
import { SemanticRegistry } from '../registry';

/**
 * Phase 3: Lifecycle Resolver
 * Enforces maturity rules. Deprecated nodes cannot be ownership roots.
 * Production nodes cannot depend on Draft nodes.
 */
export function resolveLifecycle(nodes: ResolvedNode[], registry: SemanticRegistry): ResolvedNode[] {
    for (const node of nodes) {
        // Rule: Deprecated nodes cannot own other nodes
        if (node.frontmatter.status === 'deprecated' && (node.frontmatter.owns && node.frontmatter.owns.length > 0)) {
            throw new Error(`[FATAL: LIFECYCLE] Node '${node.id}' is 'deprecated' but acts as an ownership root. Dead nodes cannot govern live structure.`);
        }

        // Rule: Production nodes cannot depend on drafts
        if (node.frontmatter.status === 'production') {
            for (const [edgeKey, targetNode] of node.resolvedEdges.outbound.entries()) {
                if (edgeKey.startsWith('depends_on:') && targetNode.frontmatter.status === 'draft') {
                    throw new Error(`[FATAL: LIFECYCLE] Node '${node.id}' (production) depends on '${targetNode.id}' (draft). Architecture cannot rely on unratified concepts.`);
                }
            }
        }

        // Rule: Deprecated nodes can only be referenced if superseded
        for (const [edgeKey, targetNode] of node.resolvedEdges.outbound.entries()) {
            if (edgeKey.startsWith('depends_on:') && targetNode.frontmatter.status === 'deprecated') {
                if (!targetNode.frontmatter.supersedes || targetNode.frontmatter.supersedes.length === 0) {
                     // Fails at end of build per escalation matrix
                     console.error(`[ERROR: STATE] Node '${node.id}' depends on a deprecated node '${targetNode.id}' which has no fallback.`);
                }
            }
        }
    }
    return [...nodes];
}

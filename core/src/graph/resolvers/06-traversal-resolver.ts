import { ResolvedNode } from '../../types/canonical';

/**
 * Phase 6: Traversal Resolver
 * Prepares the final Adjacency Index prioritizing Governance edges over Implementation edges.
 * Does NOT mutate GraphNode, but prepares internal mapping for the Manifest Generator.
 */
export function buildTraversalIndex(nodes: ResolvedNode[]): ResolvedNode[] {
    // This phase is purely structural validation before deep freezing.
    // It verifies that no cyclical 'owns' chains exist (DAG Enforcement).

    for (const node of nodes) {
        const visited = new Set<string>();
        let current: ResolvedNode | undefined = node;

        while (current) {
            if (visited.has(current.id)) {
                throw new Error(`[FATAL: GOVERNANCE] Cyclic Ownership Detected starting at '${node.id}'. Ownership must form a DAG.`);
            }
            visited.add(current.id);

            // Find parent
            let parentId: string | undefined;
            for (const edgeKey of current.resolvedEdges.inbound.keys()) {
                if (edgeKey.startsWith('owns:')) {
                    parentId = edgeKey.split(':')[1];
                    break;
                }
            }

            if (parentId) {
                // Follow the chain upwards
                current = current.resolvedEdges.inbound.get(`owns:${parentId}`);
            } else {
                current = undefined;
            }
        }
    }

    return [...nodes];
}

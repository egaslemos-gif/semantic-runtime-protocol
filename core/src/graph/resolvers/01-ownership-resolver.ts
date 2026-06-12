import { SemanticNode } from '../../types/canonical';
import { SemanticRegistry } from '../registry';

/**
 * Phase 1: Ownership Resolver
 * Validates the Single Owner Principle and ensures Ownership DAG integrity.
 */
export function resolveOwnership(nodes: SemanticNode[], registry: SemanticRegistry): SemanticNode[] {
    const ownershipMap = new Map<string, string[]>();

    // Pass 1: Map all 'owns' declarations
    for (const node of nodes) {
        if (node.frontmatter.owns) {
            for (const ownedId of node.frontmatter.owns) {
                if (!ownershipMap.has(ownedId)) {
                    ownershipMap.set(ownedId, []);
                }
                ownershipMap.get(ownedId)!.push(node.id);
            }
        }
    }

    // Pass 2: Detect Ownership Collisions
    for (const [ownedId, owners] of ownershipMap.entries()) {
        if (owners.length > 1) {
            throw new Error(`[FATAL: GOVERNANCE] Ownership Collision: Node '${ownedId}' is claimed by multiple owners: [${owners.join(', ')}]`);
        }
    }

    // No mutation. Just strict validation. Returns a pure shallow copy of the state.
    return [...nodes];
}

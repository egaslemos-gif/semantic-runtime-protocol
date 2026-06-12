import { SemanticNode, ResolvedNode } from '../../types/canonical';
import { SemanticRegistry } from '../registry';

/**
 * Phase 2: Edge Resolver
 * Translates string-based edge definitions into physical memory references.
 * Has NO awareness of filesystem, only canonical identities in the registry.
 */
export function resolveEdges(nodes: SemanticNode[], registry: SemanticRegistry): ResolvedNode[] {
    // Pass 1: Initialize the ResolvedNode objects
    const resolvedMap = new Map<string, ResolvedNode>();
    for (const node of nodes) {
        resolvedMap.set(node.id, {
            ...node,
            resolvedEdges: {
                outbound: new Map(),
                inbound: new Map()
            }
        });
    }

    const edgeTypes = ['owns', 'enforces', 'prevents', 'depends_on', 'extends', 'contextualizes', 'contradicts', 'supersedes'] as const;

    // Pass 2: Resolve Outbound Edges
    for (const node of nodes) {
        const sourceNode = resolvedMap.get(node.id)!;

        for (const edgeType of edgeTypes) {
            const targets = node.frontmatter[edgeType] || [];
            
            for (const targetId of targets) {
                if (!resolvedMap.has(targetId)) {
                    throw new Error(`[FATAL: SEMANTIC] Edge Reference Error: Node '${node.id}' declares '${edgeType}' to a non-existent Canonical ID '${targetId}'. Inference is strictly prohibited.`);
                }
                
                const targetNode = resolvedMap.get(targetId)!;
                sourceNode.resolvedEdges.outbound.set(`${edgeType}:${targetId}`, targetNode);
                targetNode.resolvedEdges.inbound.set(`${edgeType}:${node.id}`, sourceNode);
            }
        }
    }

    return Array.from(resolvedMap.values()).sort((a, b) => a.id.localeCompare(b.id));
}

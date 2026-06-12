import { ResolvedNode } from '../../types/canonical';

/**
 * Phase 5: Weight Resolver
 * Calculates a deterministic, non-fuzzy structural Semantic Score.
 * Base Priority * (Outbound Governance + Inbound Governance)
 */
export function resolveWeights(nodes: ResolvedNode[]): ResolvedNode[] {
    const priorityValues: Record<string, number> = {
        'critical': 4,
        'high': 3,
        'medium': 2,
        'low': 1
    };

    return nodes.map(node => {
        const baseScore = priorityValues[node.frontmatter.context_priority || 'medium'] || 2;
        
        let multiplier = 1;
        // Deterministic Governance Boost
        if (node.frontmatter.node_type === 'governance') multiplier += 2;
        if (node.frontmatter.node_type === 'system') multiplier += 1;

        // Deterministic Edge Scoring
        let edgeScore = 0;
        for (const edgeKey of node.resolvedEdges.inbound.keys()) {
            if (edgeKey.startsWith('owns:')) edgeScore += 4;
            if (edgeKey.startsWith('enforces:')) edgeScore += 4;
            if (edgeKey.startsWith('depends_on:')) edgeScore += 2;
        }

        // Calculate final frozen score
        const finalScore = baseScore * multiplier + edgeScore;

        return {
            ...node,
            semanticScore: finalScore
        };
    });
}

export interface QueryBounds {
    targetId: string;
    maxDepth: number;
    edgeWhitelist: string[];
    budget: number; // max nodes returned
}

export class ContextQueryEngine {
    private readonly memory: ReadonlyArray<any>;

    constructor(memory: ReadonlyArray<any>) {
        this.memory = memory;
    }

    /**
     * Constraint-Aware Traversal. Not full text search.
     */
    public execute(bounds: QueryBounds): any {
        if (!bounds.targetId || bounds.maxDepth === undefined || !bounds.edgeWhitelist || !bounds.budget) {
            throw new Error(`[FATAL: QUERY_BOUNDARY] Query is missing explicit boundary definitions.`);
        }

        const targetNode = this.memory.find(n => n.id === bounds.targetId);
        if (!targetNode) {
            throw new Error(`[ERROR: QUERY] Target Canonical ID not found in frozen memory: ${bounds.targetId}`);
        }

        // BFS Bounded Traversal
        const resultContext: any[] = [];
        const warnings: string[] = [];
        const queue: { node: any, depth: number }[] = [{ node: targetNode, depth: 0 }];
        const visited = new Set<string>();

        let budgetConsumed = 0;

        while (queue.length > 0 && budgetConsumed < bounds.budget) {
            const { node, depth } = queue.shift()!;

            if (visited.has(node.id)) continue;
            visited.add(node.id);

            resultContext.push(node);
            budgetConsumed++;

            // Elevate strict governance to response top-level warnings
            if (node.frontmatter.constraint_level === 'Strict') {
                warnings.push(`[STRICT] ${node.id}: ${node.frontmatter.status}`);
            }

            if (depth >= bounds.maxDepth) continue;

            // Follow inbound edges
            for (const [edgeKey, targetId] of Object.entries(node.edges.inbound)) {
                const edgeType = edgeKey.split(':')[0];
                if (bounds.edgeWhitelist.includes(edgeType)) {
                    const nextNode = this.memory.find(n => n.id === targetId);
                    if (nextNode) {
                        queue.push({ node: nextNode, depth: depth + 1 });
                    }
                }
            }

            // Follow outbound edges
            for (const [edgeKey, targetId] of Object.entries(node.edges.outbound)) {
                const edgeType = edgeKey.split(':')[0];
                if (bounds.edgeWhitelist.includes(edgeType)) {
                    const nextNode = this.memory.find(n => n.id === targetId);
                    if (nextNode) {
                        queue.push({ node: nextNode, depth: depth + 1 });
                    }
                }
            }
        }

        return {
            budget_consumed: budgetConsumed,
            context: resultContext,
            governance_warnings: warnings
        };
    }
}

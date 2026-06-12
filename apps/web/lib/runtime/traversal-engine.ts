import { DEMO_GRAPH } from "./demo-graph";
import { RuntimeEvent } from "./types";
import { evaluateTraversal } from "./firewall";

export type TraversalIntent = "refactor_session" | "optimize_auth" | "expose_cache";

export function simulateTraversal(intent: TraversalIntent): RuntimeEvent[] {
    const events: RuntimeEvent[] = [];
    const visited = new Set<string>();

    let startNodeId = "frontend.session";

    if (intent === "optimize_auth") {
        startNodeId = "frontend.middleware";
    } else if (intent === "expose_cache") {
        startNodeId = "server.auth";
    }

    // 1. Intent Mapping
    events.push({
        type: "INTENT_MAPPED",
        node: startNodeId
    });

    // Simple BFS Traversal Simulation
    const queue = [startNodeId];
    visited.add(startNodeId);

    while (queue.length > 0) {
        const currentId = queue.shift()!;
        const currentNode = DEMO_GRAPH.nodes[currentId];

        // Find outgoing edges
        const outgoing = DEMO_GRAPH.edges.filter(e => e.source === currentId);

        for (const edge of outgoing) {
            const targetNode = DEMO_GRAPH.nodes[edge.target];
            
            // Log Edge Traversal Attempt
            events.push({
                type: "EDGE_TRAVERSED",
                from: currentId,
                to: targetNode.id
            });

            // 2. Firewall Evaluation
            const intentScope = DEMO_GRAPH.nodes[startNodeId].scope;
            const decision = evaluateTraversal(intentScope, currentNode, targetNode);

            if (decision.status === "DENIED") {
                events.push({
                    type: "BOUNDARY_VIOLATION",
                    fromScope: intentScope, // Show the actual policy violation (intent vs target)
                    toScope: targetNode.scope,
                    target: targetNode.id
                });
                
                events.push({
                    type: "TERMINATED",
                    reason: decision.reason
                });

                return events; // Hard stop
            }

            if (!visited.has(targetNode.id)) {
                visited.add(targetNode.id);
                queue.push(targetNode.id);
            }
        }
    }

    // If it completed without violation
    events.push({
        type: "TERMINATED",
        reason: "Traversal completed successfully."
    });

    return events;
}

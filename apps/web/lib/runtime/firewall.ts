import { GraphNode } from "./types";

export type FirewallDecision = 
    | { status: "ALLOWED" }
    | { status: "DENIED"; reason: string };

export function evaluateTraversal(intentScope: string, from: GraphNode, to: GraphNode): FirewallDecision {
    // Hard rule: An intent originating from Frontend scope cannot access server secrets anywhere in the traversal chain
    if (intentScope === "frontend" && to.scope === "server" && to.id.includes("secrets")) {
        return { 
            status: "DENIED", 
            reason: "Cross-scope traversal rejected." 
        };
    }

    // Example of another boundary rule
    if (from.scope === "server" && to.scope === "frontend") {
        return {
            status: "DENIED",
            reason: "Server cannot traverse into frontend."
        };
    }

    return { status: "ALLOWED" };
}

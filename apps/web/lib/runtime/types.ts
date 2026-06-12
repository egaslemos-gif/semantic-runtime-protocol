export type RuntimeEvent =
  | {
      type: "INTENT_MAPPED";
      node: string;
    }
  | {
      type: "EDGE_TRAVERSED";
      from: string;
      to: string;
    }
  | {
      type: "BOUNDARY_VIOLATION";
      fromScope: string;
      toScope: string;
      target: string;
    }
  | {
      type: "TERMINATED";
      reason: string;
    };

export interface GraphNode {
    id: string;
    scope: string; // e.g. "frontend", "server", "database"
}

export interface GraphEdge {
    source: string;
    target: string;
    type: "owns" | "depends_on" | "reads";
}

export interface GraphDataset {
    nodes: Record<string, GraphNode>;
    edges: GraphEdge[];
}

import { GraphDataset } from "./types";

export const DEMO_GRAPH: GraphDataset = {
    nodes: {
        "frontend.session": { id: "frontend.session", scope: "frontend" },
        "frontend.middleware": { id: "frontend.middleware", scope: "frontend" },
        "server.auth": { id: "server.auth", scope: "server" },
        "server.auth.secrets": { id: "server.auth.secrets", scope: "server" },
        "server.persistence": { id: "server.persistence", scope: "server" }
    },
    edges: [
        { source: "frontend.session", target: "frontend.middleware", type: "depends_on" },
        { source: "frontend.middleware", target: "server.auth", type: "depends_on" },
        { source: "server.auth", target: "server.auth.secrets", type: "owns" },
        { source: "server.auth", target: "server.persistence", type: "depends_on" },
        { source: "server.auth", target: "frontend.session", type: "reads" }
    ]
};

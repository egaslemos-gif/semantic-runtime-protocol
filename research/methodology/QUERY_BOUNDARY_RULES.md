# Query Boundary Rules

The Context Query Engine is a deterministic semantic traversal tool, not a semantic exploration engine. Queries without hard boundaries degrade into Context Explosions.

## Absolute Boundary Laws

Every query passed to the SemanticRuntime must declare explicit bounds:
1. `targetId`: The canonical ID of the root node.
2. `maxDepth`: The absolute ceiling for BFS traversal (e.g., 3).
3. `edgeWhitelist`: The exact edge types allowed to be traversed (e.g., `['owns', 'depends_on']`).
4. `budget`: The maximum number of tokens or nodes allowed in the response.

If a query is missing any of these boundaries, it fails with `[FATAL: QUERY_BOUNDARY]`. The query engine will NOT infer default boundaries.

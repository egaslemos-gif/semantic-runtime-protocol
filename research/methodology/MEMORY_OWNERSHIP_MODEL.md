# Memory Ownership Model

Once the Graph is loaded into the Next.js process memory, ownership of that memory is highly restricted.

## Ownership Rules

1. **The SemanticRuntime Singleton:** This is the exclusive owner of the memory. No other class, service, or API route can hold a direct pointer to the internal Maps or Sets.
2. **Read-Only Clones:** When the `ContextQueryEngine` traverses the graph, it yields read-only serialized references (`Readonly<GraphNode>`).
3. **Immutability:** V8 `Object.freeze()` is applied recursively during hydration. Any Next.js API route attempting to inject a transient property (e.g., `node.isHovered = true`) will trigger a fatal `TypeError` and crash the server, intentionally failing fast.

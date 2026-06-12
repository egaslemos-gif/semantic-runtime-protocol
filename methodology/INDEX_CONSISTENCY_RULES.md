# Index Consistency Rules

The `SemanticRegistry` uses O(1) indices (`byOwnership`, `byLifecycle`, etc.) to bypass O(N^2) scans. To prevent Index Desynchronization, index mapping is centralized and immutable.

## Consistency Laws

1. **Single Entry Point**
   - Nodes are injected into the registry via a strict `registry.register(ValidatedNode)` method.
2. **Synchronous Indexing**
   - During `register()`, all indices are populated synchronously in the exact same tick.
3. **Immutability of Indices**
   - Resolvers CANNOT add or remove nodes from the indices. Resolvers can only *read* from indices.
4. **No Partial Deletion**
   - If a node is invalid, the entire graph fails. There is no logic to "remove" a node from indices midway through resolution. The graph is all-or-nothing.

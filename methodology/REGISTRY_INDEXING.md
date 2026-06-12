# Registry Indexing

The `NodeRegistry` is not a simple `Map<string, Node>`. A flat map is highly inefficient for Semantic Traversal and Context Minimization. The registry acts as an advanced Semantic Access Layer.

## Required Indexes

When `ValidatedNodes` are injected into the registry, the registry maintains synchronous indexes for instant lookup:

1. **Canonical Index** (`Map<CanonicalId, Node>`)
   - O(1) lookup by exact ID.
2. **Ownership Index** (`Map<Domain, CanonicalId[]>`)
   - O(1) lookup for all nodes belonging to `Frontend` or `Infrastructure`.
3. **Lifecycle Index** (`Map<Status, CanonicalId[]>`)
   - O(1) retrieval of all `deprecated` or `draft` nodes to quickly calculate debt.
4. **Type Index** (`Map<NodeType, CanonicalId[]>`)
   - O(1) retrieval of all `anti_patterns` or `governance` constraints.

By building these indexes in memory during Phase 5 (Node Registry), the subsequent Resolution and Assembly phases avoid O(N^2) graph scans, keeping compilation under a few milliseconds.

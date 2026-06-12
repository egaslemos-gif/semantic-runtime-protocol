# Index Freeze Protocol

The multiple O(1) indices inside the `SemanticRegistry` (`byLifecycle`, `byOwnership`, etc.) are critical for fast traversal. However, if they become desynchronized from the root map, the MCP Context Minimizer could feed corrupted data to AI agents.

## The Freeze Sequence

1. **Build Phase:** Indices are highly mutable `Sets` during the `parse` and `register` phases.
2. **Index Locking:** Immediately after the final `ValidatedNode` is registered, the Registry's internal indices are subjected to `Object.freeze()`.
3. **Immutability Guarantee:** During the 6-phase Resolution Pipeline, no new nodes can be added. If a resolver attempts `registry.register()`, Node.js throws a `TypeError`.
4. **Traversal Safety:** Because the indices are frozen before the first resolver runs, the Traversal Engine is guaranteed absolute stability during O(1) lookups.

# Registry Memory Layout

The `SemanticRegistry` is strictly defined as a Semantic Access Layer, not an application service. It provides O(1) indexed access to nodes without performing any heuristic logic.

## Memory Structure

The internal memory of the Registry is strictly segregated into structural maps:

1. **The Root Store:** `Map<CanonicalId, SemanticNode>`
   - The absolute source of truth. All other indices store `CanonicalId` strings referencing this map, not deep copies of the nodes.
2. **The Governance Index:** `Map<OwnershipDomain, Set<CanonicalId>>`
   - O(1) lookup to find all systems owned by `Frontend` or `Infrastructure`.
3. **The State Index:** `Map<NodeStatus, Set<CanonicalId>>`
   - O(1) retrieval of all `deprecated` systems.
4. **The Topology Index:** `Map<NodeType, Set<CanonicalId>>`
   - O(1) separation of `anti_pattern` nodes from `primitive` nodes.

## Interaction Rules
- **No Inference:** The registry accepts explicit `ValidatedNode` input and returns `SemanticNode`. It does not guess missing data.
- **Synchronous Locking:** All sets are populated synchronously in a single transaction when `registry.register(node)` is called.

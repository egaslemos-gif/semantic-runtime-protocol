# Node Resolution Flow

The core of the Semantic Compiler is the `Resolver` (`/core/src/graph/resolver.ts`). To prevent the "Compiler Complexity Explosion", the resolver operates in a strict, linear pipeline without opaque recursion.

## The Linear Flow

1. **`ReferenceLinking`**: Maps string-based `canonical_id` declarations inside edges to actual memory pointers in the `NodeRegistry`.
2. **`EdgeValidation`**: Executes directional rule checks (e.g., verifying a `Governance` node doesn't depend on a `Case Study`).
3. **`OwnershipResolution`**: Scans all `owns` edges. Ensures that no node is claimed by more than one `owns` relationship (detecting Ownership Conflicts).
4. **`WeightResolution`**: Computes the structural importance of each node. Nodes with multiple inbound `owns` or `prevents` edges gain higher `Semantic Priority`.
5. **`ConflictResolution`**: Detects Semantic Drift (e.g., Node A `enforces` Node B, but Node B `contradicts` Node A).
6. **`TraversalIndexing`**: Generates the adjacency lists required to serialize the `relationship-map.json`.

If any phase fails (based on `VALIDATION_SEVERITY.md`), the resolution halts immediately.

# Edge Resolution Order

To maintain deterministic graph assembly, edges must be resolved in a specific, mathematical sequence. A cycle or ownership conflict might be missed if the traversal order is randomized.

## The Sequence

1. **`owns` (Authority First)**
   - Must be resolved first to establish the global Ownership Tree. If a node cannot be placed in the tree, or is claimed twice, resolution halts immediately.
2. **`supersedes` / `contradicts` (State Second)**
   - Resolving deprecation paths and conflicts ensures the compiler knows which nodes are "dead" before connecting active dependencies.
3. **`enforces` / `prevents` (Governance Third)**
   - Establishes the risk boundaries and constraints.
4. **`depends_on` / `extends` (Architecture Fourth)**
   - Maps the structural implementation of the system. Fails if depending on a dead/deprecated node.
5. **`contextualizes` / `references` (Narrative Last)**
   - Maps weak, associative relationships.

By enforcing this order, `Governance Errors` are caught milliseconds into the compilation, before wasting CPU cycles on deep narrative edge mapping.

# Resolver State Integrity

The Resolution Pipeline processes nodes by passing them linearly through specialized resolvers. To guarantee integrity, state transitions must be mathematically verifiable.

## The Integrity Guarantee

1. **Closed-State Input:** A resolver receives an array of nodes in a specific, locked state (`SemanticNode[]`).
2. **Closed-State Output:** The resolver MUST return an entirely new array mapping to the next explicit state (`ResolvedNode[]`).
3. **No Partial Resolution:** A resolver cannot return an array where some nodes are resolved and others are not. If an edge fails to resolve, the entire pipeline crashes with a `[FATAL: SEMANTIC]` error.
4. **Strict Isolation:** `OwnershipResolver` has no concept of `EdgeResolver` data. It only verifies `owns` vectors. If it alters state, it creates a new object instance, avoiding shared memory mutations.

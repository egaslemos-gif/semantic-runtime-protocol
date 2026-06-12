# Pipeline Execution Rules

The Resolution Pipeline MUST be deterministic, producing identical graph outputs byte-for-byte across runs. It enforces strict linear mutation constraints.

## The 5 Absolute Execution Rules

1. **Strict Linearity (No Loops/Recursion)**
   - The Pipeline executes Phases 1 to 6 in order. A phase CANNOT call a previous phase.
2. **State Isolation**
   - Each phase receives the immutable state of the previous phase. It returns a explicitly new state object.
   - *Example:* `EdgeResolver` takes `SemanticNode[]`, returns `ResolvedNode[]`.
3. **No Cross-Mutation**
   - Resolvers CANNOT mutate the state of other resolvers. `OwnershipResolver` cannot touch `weight` scores.
4. **Immediate Failure Propagation**
   - If a Resolver triggers a `[FATAL]` error, the Pipeline aborts instantly. There are NO retries, NO fallbacks, and NO partial graph builds.
5. **Deterministic Ordering**
   - Nodes are always processed in ascending alphabetical order of their `canonical_id` to guarantee identical byte output for Manifest generation.

# Resolver Interfaces

The Resolution Pipeline strictly avoids a monolithic "God Class". Instead, it relies on decoupled, specialized resolver interfaces that operate exclusively on specific semantic dimensions.

## The Standard Interface
Every resolver must implement a predictable input/output contract:

```typescript
interface ResolutionPipelineStep {
  name: string;
  execute(registry: SemanticRegistry): void;
}
```

## Specialized Interfaces

### 1. `EdgeResolver`
- **Focus:** Reference Linking.
- **Contract:** Converts string arrays of `canonical_id` into memory references pointing to `ValidatedNode` objects. Does not validate correctness of the edge direction.

### 2. `OwnershipResolver`
- **Focus:** Hierarchy & Authority.
- **Contract:** Scans exclusively `owns` edges. Builds the `OwnershipTree`. If a node is targeted by >1 `owns` edge, it throws a `[FATAL: GOVERNANCE]` error.

### 3. `LifecycleResolver`
- **Focus:** Maturity Constraints.
- **Contract:** Scans all dependencies. If a `production` node depends on a `draft` node, throws `[FATAL: SEMANTIC]`.

### 4. `GovernanceResolver`
- **Focus:** Directional Integrity.
- **Contract:** Validates that lower-tier concepts (e.g., `case_study`) do not `enforce` rules on higher-tier domains (`governance`).

### 5. `WeightResolver`
- **Focus:** Scoring.
- **Contract:** Computes the structural `Semantic Score` of the node without altering its edges.

By adhering to these interfaces, new analytical dimensions can be injected into the compiler without mutating existing resolution logic.

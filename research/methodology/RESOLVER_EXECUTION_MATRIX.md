# Resolver Execution Matrix

The Execution Matrix is the absolute law for how resolvers are sequentially applied. Resolvers MUST NOT run in parallel. Each resolver waits for the previous one to complete and emit its strictly defined target state.

## The Matrix

| Phase | Resolver | Input State | Output State | Failure Condition |
| :--- | :--- | :--- | :--- | :--- |
| **0** | `SemanticRegistry` | `ValidatedNode[]` | `SemanticNode[]` (Indexed) | Unreachable ID, Duplicate ID |
| **1** | `OwnershipResolver` | `SemanticNode[]` | `SemanticNode[]` (Ownership Mapped) | Multiple `owns` claims |
| **2** | `EdgeResolver` | `SemanticNode[]` | `ResolvedNode[]` (Edges Mapped) | Reference points to non-existent ID |
| **3** | `LifecycleResolver` | `ResolvedNode[]` | `ResolvedNode[]` (Maturity Checked) | Prod depends on Draft |
| **4** | `GovernanceResolver` | `ResolvedNode[]` | `ResolvedNode[]` (Rules Checked) | Subsystem enforces on Global |
| **5** | `WeightResolver` | `ResolvedNode[]` | `ResolvedNode[]` (Scored) | N/A |
| **6** | `TraversalResolver` | `ResolvedNode[]` | `ResolvedNode[]` (Adjacency built) | Circular dependency trap |

If any phase fails, the node execution is aborted globally.

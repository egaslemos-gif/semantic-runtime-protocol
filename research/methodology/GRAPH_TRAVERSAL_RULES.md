# Graph Traversal Rules

When a query is executed against the Semantic Graph (e.g., by the Search Engine or the Context Assembler), the traversal must obey strict directional logic.

## Traversal Governance

### 1. The Governance Ascendancy Rule
When traversing from an `Anti-Pattern` or `System` node, the engine must always ascend the `owns` and `enforces` edges first. The engine must determine "Who governs this node?" before determining "What is related to this node?". Context flows downward from Governance.

### 2. The Dependency Block
Traversal cannot proceed past a `depends_on` edge if the target node is marked as `deprecated`, unless the query is explicitly a legacy tracing operation.

### 3. Edge Weight Thresholding
When traversing for Context Minimization, the engine halts traversal across any edge with a weight of `LOW` (e.g., `references`, `contextualizes`). Only structurally significant edges (`VERY HIGH`, `HIGH`, `MEDIUM`) are traversed for AI Context.

### 4. Cycle Termination
The `WeightedDirectedGraph` memory structure automatically terminates traversal if a node ID matches the traversal origin history array, preventing infinite recursion during Semantic Compiler validation.

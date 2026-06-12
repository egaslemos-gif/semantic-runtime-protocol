# Context Stress Protocol

Testing the runtime with organic documentation is insufficient. The `SemanticRuntime` must be validated against extreme, artificially hostile graph topologies.

## Vectors of Semantic Attack

1. **The Fanout Bomb:** A single node with 1000 outbound `depends_on` edges. Tests if the Traversal Engine collapses or correctly prunes based on token budget.
2. **The Depth Trap:** A linear chain of 15 nodes (`A owns B`, `B owns C`... `O owns P`). Tests `maxDepth` hard stops.
3. **The Governance Paradox:** Artificial nodes injected with `Strict` contradictions (A enforces B, B contradicts A). Validates that the CLI Compiler intercepts these before hydration.
4. **The Zombie Reference:** 10,000 edges pointing to a deprecated root. Validates that the Lifecycle Resolver strictly blocks traversal into deprecated space.

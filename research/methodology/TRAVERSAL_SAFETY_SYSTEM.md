# Traversal Safety System

"Hidden Recursive Traversal" is the most dangerous vulnerability in semantic relationship graphs. Deeply chained `depends_on`, `extends`, or `contextualizes` edges can cause infinite loops or Context Explosions.

## The Safety Mechanisms

1. **Visited Node Tracking (Cycle Prevention)**
   - Every traversal pass uses a fresh `Set<CanonicalId>` tracking object.
   - If the engine encounters a node ID that is already in the `Set`, it aborts that branch immediately.
2. **Depth Ceilings (Context Explosion Prevention)**
   - The traversal engine enforces a hard `MaxDepth`.
   - `owns` / `enforces` edges bypass the ceiling (Governance must always be resolved).
   - `depends_on` terminates at Depth 3.
   - `contextualizes` terminates at Depth 1.
3. **Non-Cyclic Graph Enforcement**
   - `owns` trees must strictly form a DAG (Directed Acyclic Graph). An `[ERROR: SEMANTIC]` is thrown if Node A owns Node B, and Node B owns Node A.

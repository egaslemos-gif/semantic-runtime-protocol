# Resolution Pipeline

The `Resolver` is the heart of the Semantic Compiler. To prevent "Resolver Complexity Explosion", the resolution process is strictly divided into specialized, decoupled modules.

It does not operate as a giant monolithic class. It is a linear pipeline of isolated resolvers.

## The Modules

### 1. `EdgeResolver`
- **Role:** Maps string-based `canonical_id` declarations to actual memory pointers.
- **Input:** `SemanticNode[]`
- **Output:** Adjacency mappings without validation.

### 2. `OwnershipResolver`
- **Role:** Evaluates all `owns` edges to establish the Governance Hierarchy.
- **Rule:** A node can only have ONE absolute owner. The `OwnershipResolver` throws a `[FATAL: GOVERNANCE]` error if multiple `owns` edges target the same node.

### 3. `LifecycleResolver`
- **Role:** Enforces `NODE_LIFECYCLE.md` constraints across the resolved edges.
- **Rule:** Detects if a `production` node `depends_on` a `draft` node.

### 4. `GovernanceResolver`
- **Role:** Validates directional rule checks.
- **Rule:** Ensures that lower-tier nodes (e.g., `case_study`) do not enforce rules on higher-tier nodes (e.g., `governance`).

### 5. `WeightResolver`
- **Role:** Calculates the structural `Semantic Score` of the node based on its inbound/outbound edge types (`EDGE_TYPES.md`) and contextual density.

### 6. `TraversalResolver` (Indexer)
- **Role:** Pre-computes traversal adjacency lists optimized for the internal Graph traversal engine.

By splitting resolution, the Compiler avoids entropy growth and remains mathematically verifiable.

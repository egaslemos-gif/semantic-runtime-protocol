# Graph Memory Model

The `WeightedDirectedGraph` transitions through strict memory states during the compilation process, formalizing the exact structural shape of knowledge at any given time.

## The 5 Node Stages

### 1. `ParsedNode` (Raw Extraction)
Output of `parser.ts`. Contains raw markdown, raw frontmatter, and filesystem metadata. No structural guarantees.

### 2. `ValidatedNode` (Structurally Valid)
Output of `schema.ts`. Frontmatter has passed Zod validation. Identity (`canonical_id`) is guaranteed.

### 3. `SemanticNode` (Semantically Coherent)
Output of the Semantic Validator. The node has passed isolated integrity checks (e.g., no contradictory internal states), but is not yet connected to the broader graph.

### 4. `ResolvedNode` (Connected)
Output of the `Resolution Pipeline`. The node's edges are mapped to physical memory pointers of other nodes. Weights and Ownership are established.

### 5. `GraphNode` (Immutable Runtime)
Output of the `Assembly` phase. The node and all its edges are locked via `Object.freeze()`. It is fully ready for Context Assembly, Retrieval, and Traversal. The `GraphNode` is read-only.

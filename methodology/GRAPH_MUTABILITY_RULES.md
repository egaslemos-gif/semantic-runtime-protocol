# Graph Mutability Rules

The `WeightedDirectedGraph` is the source of truth for the entire contextual platform. To ensure determinism, the graph's memory structure follows strict mutability phases.

## The Phases of Mutability

### 1. Ephemeral Phase (Mutable)
**Scope:** Parsing & Instantiation
During this phase, isolated `ParsedNode` and `ValidatedNode` objects are constructed. They exist freely in memory. Properties can be transformed, and raw MDX is stripped into semantic blocks.

### 2. Resolution Phase (Controlled Mutation)
**Scope:** Edge Resolution & Weighting
The `Resolver` connects the nodes. Nodes are mutated *only* to append memory references to their inbound/outbound edges. Weights are calculated and assigned. No new nodes can be injected during this phase.

### 3. Assembly Phase (Immutable Freeze)
**Scope:** Graph Compilation & Traversal
Once the `Assembly` engine constructs the final graph, the entire registry is subjected to `Object.freeze()`. The graph is now mathematically sealed.

## Enforcement
Any attempt by the Frontend Renderer or Context Assembler to modify a node, edge, or weight after Phase 3 will throw a runtime `TypeError`. The graph is read-only.

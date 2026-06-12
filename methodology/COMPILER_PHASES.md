# Compiler Phases

The Semantic Compiler (`/core/compiler`) is a 100% Node-native build tool. It translates raw MDX files into the deterministic `WeightedDirectedGraph` used by both the Next.js frontend and the AI Context Engine. 

It is completely decoupled from React and the browser.

## The Deterministic Pipeline

1. **Discovery Phase:** Scans the `/content` and `/methodology` directories for `.mdx` files.
2. **Parsing Phase:** Extracts the raw frontmatter and content body using `gray-matter`.
3. **Schema Validation Phase:** Pipes the frontmatter through rigorous `zod` schemas. Missing required fields (e.g., `canonical_id`) immediately halt the compiler.
4. **Node Instantiation:** Creates isolated semantic nodes in memory.
5. **Relationship Resolution:** Parses all declared edges (`prevents`, `owns`, `depends_on`) mapping string IDs to instantiated node references.
6. **Semantic Validation Phase:** Validates graph integrity:
   - **Orphan Nodes:** Fails if a node has 0 connections.
   - **Forbidden Cycles:** Fails if Node A `owns` Node B, and Node B `owns` Node A.
   - **Dangling Edges:** Fails if an edge points to a non-existent `canonical_id`.
   - **Ownership Conflicts:** Fails if multiple nodes claim to `own` the same child.
7. **Weight Calculation:** Computes the structural importance of each node based on its inbound/outbound edge types (`EDGE_TYPES.md`).
8. **Graph Compilation:** Serializes the validated `WeightedDirectedGraph` into `relationship-map.json` and `semantic-registry.json`.
9. **Manifest Generation:** Compiles the `ai-manifest.json` by running the graph through the Context Minimization and Budgeting engines.

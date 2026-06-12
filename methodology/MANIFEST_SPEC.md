# Manifest Specification

The Semantic Compiler does not dump a generic JSON block. It produces specialized, runtime-oriented artifacts optimized for specific consumers.

## The Output Artifacts

### 1. `graph-index.json`
- **Consumer:** Next.js Frontend (`/apps/web`)
- **Structure:** Flat array of `SemanticNode` with basic metadata (title, status, short summary).
- **Purpose:** Rendering the Sidebar, Navigation, and Knowledge Graph Footer. Strips out raw markdown bodies to keep client bundles small.

### 2. `ai-manifest.json`
- **Consumer:** MCP Server / Agents
- **Structure:** Hierarchical payload mapped by `canonical_id`, incorporating Context Minimization constraints.
- **Purpose:** Fast retrieval of governance rules, prevented anti-patterns, and strict boundaries. Excludes UI metadata and narrative content.

### 3. `relationship-map.json`
- **Consumer:** Internal Traversal Engine & AI Reasoning
- **Structure:** Strict Adjacency List (`Node -> [EdgeType, TargetNode]`).
- **Purpose:** Enables instant graph traversal without loading node bodies. Used to calculate "Semantic Distance" between concepts.

### 4. `semantic-registry.json`
- **Consumer:** System Boot Sequence / Build Pipeline
- **Structure:** Dictionary mapping physical MDX paths to `canonical_id`.
- **Purpose:** Internal compiler mapping and cache invalidation.

### 5. `ownership-map.json`
- **Consumer:** Governance Enforcement tools
- **Structure:** Tree structure descending from `Global` -> `Domains` -> `Systems`.
- **Purpose:** Used to trace which domain owns a specific piece of the architecture.

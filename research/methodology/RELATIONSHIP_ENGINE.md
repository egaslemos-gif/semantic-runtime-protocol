# Relationship Engine

The Runtime-Oriented platform is a connected knowledge graph, not a tree of files. The Relationship Engine is the custom indexing system that parses MDX frontmatter and automatically computes bidirectional relationships between concepts.

## Core Mechanics

### 1. Implicit Edge Generation
When `Hydration Governance` declares `runtime_ownership` in its `related_primitives` frontmatter, the Relationship Engine automatically generates a bidirectional edge.
- The Hydration Governance page displays a link to Runtime Ownership under "Foundational Primitives".
- The Runtime Ownership page automatically displays Hydration Governance under "Governed Systems" without requiring manual updates to the Primitive document.

### 2. Contextual UI Rendering (`KnowledgeGraphFooter`)
Instead of a static "Next/Previous" button, the bottom of every page renders a dynamic graph representation based on the engine's output:
- **Prevents:** [List of Anti-Patterns]
- **Governed By:** [List of Primitives]
- **Implemented In:** [List of Playbooks]

### 3. Anti-Fragmentation
Because relationships are strictly enforced by the `FRONTMATTER_SPEC`, folder hierarchies become meaningless. A developer navigating the site follows the operational graph (e.g., clicking from a Case Study down to a Primitive, then laterally to a Runtime System), ensuring they always understand the systemic impact of a concept.

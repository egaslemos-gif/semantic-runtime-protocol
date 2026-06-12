# System Boot Sequence

The Semantic Runtime Engine must initialize predictably. The graph cannot be queried until it is completely assembled and validated. 

This boot sequence executes exclusively at **Build-Time**. The frontend (`/app`) and the AI Context API (`/api/ai-context`) are purely visualization and delivery layers that consume the output of this sequence.

## The Sequence

### Step 1: Load Semantic Registry (`/core/registry`)
- Read `SEMANTIC_CONTRACTS.md` and `TERM_REGISTRY.md` to establish the vocabulary.
- Initialize the empty Graph state.

### Step 2: Content Parsing (`/core/compiler`)
- Traverse all directories (`/methodology`, `/content/systems`, etc.).
- Read raw MDX files and extract Frontmatter via `gray-matter`.

### Step 3: Schema Validation (`/core/validation`)
- Execute strict Zod validation on extracted frontmatter.
- **Failure Condition:** Missing required fields (`runtime_impact`, `domain`, etc.) instantly halts the build.

### Step 4: Edge Generation (`/core/graph`)
- Extract `related_primitives`, `prevented_anti_patterns`, and `required_contexts`.
- Map string IDs to actual node structures.
- Apply weights based on the `WEIGHT_SYSTEM.md`.

### Step 5: Semantic Validation (`/core/validation`)
- Verify graph integrity.
- **Failure Condition:** Orphan nodes (no inbound/outbound edges).
- **Failure Condition:** Dangling references (pointing to a node that doesn't exist).
- **Failure Condition:** Forbidden cycles (A owns B, B owns A).

### Step 6: Context Assembly & Manifest Generation (`/core/context`)
- Generate `graph-index.json` (for Next.js frontend rendering).
- Generate `architecture_manifest.json` (for MCP / AI Context API).
- Generate vector/search indexes (if implemented).

### Step 7: Runtime Visualization (`/app`)
- The Next.js framework boots.
- Frontend components (`KnowledgeGraphFooter`, `SemanticSidebar`) read the static JSON indexes to render the UI without performing any runtime parsing or semantic validation.

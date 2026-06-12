# Context Scoring System

Context Minimization relies on the Context Scoring System (`minimizer.ts`) to make mathematical decisions about which nodes to include in an AI Manifest when the token budget is tight.

## The Scoring Formula

A node's `Relevance Score` relative to an origin node is calculated dynamically during traversal:

**`Score = (Base Node Priority) * (Edge Weight) / (Traversal Depth)`**

### Variables

1. **Base Node Priority:**
   - Derived from `FRONTMATTER_SPEC.md` -> `context_priority`.
   - `critical` (4) | `high` (3) | `medium` (2) | `low` (1)
2. **Edge Weight:**
   - Derived from `EDGE_TYPES.md`.
   - `owns`/`enforces`/`prevents` (4) | `depends_on` (3) | `extends` (2) | `contextualizes` (1)
3. **Traversal Depth:**
   - The number of hops from the origin query node. Direct connections (Depth 1) divide the score by 1. Secondary connections (Depth 2) divide by 2.

## Budget Execution
The `ContextAssembler` sorts all traversed nodes by their `Relevance Score` descending. It adds nodes to the `ai-manifest.json` until the `CONTEXT_BUDGETING.md` token limit is reached. Nodes with the lowest score are dropped.

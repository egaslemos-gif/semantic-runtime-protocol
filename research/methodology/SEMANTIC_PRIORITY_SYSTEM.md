# Semantic Priority System

When the compiler is forced to drop nodes due to Context Budgeting, or when the Search Engine must rank results, it relies on the Semantic Priority System.

This system guarantees that operational constraints are always favored over narrative explanations.

## Priority Hierarchy (Highest to Lowest)

1. **`CRITICAL` (Governance & Ownership)**
   - Nodes that define `forbidden_patterns`, Architecture Freezes, and Runtime Ownership. If an agent misses this node, the code generated will mathematically fail the system's integrity.
2. **`HIGH` (Anti-Patterns & Mitigation)**
   - Nodes defining what NOT to do. Identifying failure states is more valuable than identifying success states in automated coding.
3. **`MEDIUM` (Primitives & Systems)**
   - The structural foundations and active implementation layers. Important for scaffolding, but lower priority than strict rules.
4. **`LOW` (Case Studies & Playbooks)**
   - Historical context, examples, and narrative justifications. These are the first to be dropped during Context Minimization.

## Frontmatter Encoding
Every node must declare its `context_priority` (`critical`, `high`, `medium`, `low`) in the frontmatter. The Semantic Compiler uses this variable during Phase 7: Weight Calculation to structure the final `ai-manifest.json`.

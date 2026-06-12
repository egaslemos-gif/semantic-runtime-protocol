# Query Execution Pipeline

The Context Query Engine is a Constraint-Aware Traversal Engine, NOT a Full-Text Search Engine.

## Allowed Query Types

1. **Ownership Queries:** `who governs <system_id>` -> Returns the Ownership DAG.
2. **Constraint Queries:** `runtime constraints for <domain>` -> Returns all nodes enforcing laws on the domain.
3. **Traversal Queries:** `dependencies for <canonical_id>` -> Performs bounded BFS traversal prioritizing `enforces` edges.
4. **Minimization Queries:** `minimal context for <task>` -> Assembles pruned output respecting token budgets.

## Execution Rules
- Queries only traverse memory. No filesystem reads.
- Queries always start by resolving the `CanonicalId`.
- If an ID is missing, the engine throws `[ERROR: QUERY]` and returns a governed failure message, it does NOT fuzzy-search for a close match.

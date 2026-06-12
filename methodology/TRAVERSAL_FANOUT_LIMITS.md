# Traversal Fanout Limits

Context Explosions happen not only vertically (`maxDepth`), but horizontally (`branchingFactor`).

## Fanout Restraints

1. **Branching Factor Ceiling:** The Query Engine is constrained to a `maxBranchingFactor` (e.g., 20). 
2. **Pruning Strategy:** If a node has 50 outbound `depends_on` edges, the Traversal Engine will process the first 20 (sorted alphabetically by `CanonicalId` for determinism) and drop the rest.
3. **Governance Exemption:** Edges of type `enforces` or `owns` ignore the Branching Factor Ceiling. Constitutional rules can never be pruned due to lateral constraints.

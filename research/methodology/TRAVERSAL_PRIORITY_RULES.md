# Traversal Priority Rules

When the Context Assembly Engine navigates the `GraphNode` network, it uses Traversal Priority to determine which edges to follow first, ensuring that Governance always supersedes Implementation details.

## Traversal Ascendancy

1. **`owns` / `owned_by` (Priority 1)**
   - The engine ALWAYS ascends ownership edges first. It is critical to establish "Who governs this concept?" before evaluating anything else.
2. **`enforces` / `prevents` (Priority 2)**
   - The engine retrieves strict rules and risk mitigations applied to the node.
3. **`depends_on` (Priority 3)**
   - The engine retrieves architectural prerequisites.
4. **`extends` (Priority 4)**
   - The engine retrieves inherited behaviors.
5. **`contextualizes` / `references` (Priority 5 - Often Dropped)**
   - The engine treats these as low-priority narrative links, which are the first to be culled during Context Minimization.

By strictly prioritizing traversal, the Graph guarantees that AI Context limits are filled with Operational Laws rather than theoretical philosophy.

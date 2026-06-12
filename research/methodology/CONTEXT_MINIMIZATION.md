# Context Minimization

In AI-assisted engineering, the primary risk is not a lack of context, but **Context Explosion**. Feeding an agent the entire Semantic Graph degrades reasoning quality, introduces hallucination risks, and wastes token budgets.

The Context Minimization engine is responsible for extracting the *minimally sufficient* context required for an agent to safely operate on a given canonical domain.

## Minimization Strategy

When an agent requests context for a specific domain (e.g., `system.offline.dexie_orchestration`):

1. **Depth Limiting:** The engine only traverses the graph to a depth of **1** for `relates_to` or `contextualizes` edges. Tangential connections are aggressively pruned.
2. **Priority Traversal:** The engine traverses to a depth of **2** for `owns`, `enforces`, and `prevents` edges. Governance boundaries are always prioritized over implementation details.
3. **Content Stripping:** Narrative text, historical justifications, and UI-specific frontmatter are stripped. The agent is only fed the structural rules, `prevented_anti_patterns`, and explicit contracts.
4. **Cycle Pruning:** If traversal encounters a node already in the context payload, the path is terminated immediately to prevent recursion.

By minimizing context, the system ensures the agent remains focused on the explicit architectural constraints without becoming confused by tangential theoretical philosophy.

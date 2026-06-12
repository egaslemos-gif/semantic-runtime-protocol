# Graph Model

To eliminate folder-driven navigation, the Runtime-Oriented platform implements a Graph Model for content discovery. 

In traditional documentation, structure is dictated by the file system (`/docs/routing/ssr.md`). In this platform, structure is dictated by semantic weight and node connectivity.

## Node Types

1. **Primitive Node:** High weight. The center of the graph. Many inbound connections, few outbound.
2. **System Node:** Medium weight. The implementation layer. Highly connected to Primitives and Anti-Patterns.
3. **Anti-Pattern Node:** Negative weight. Represents failures. Points to Governance Nodes for resolution.
4. **Governance Node:** Restrictive weight. Defines boundaries. Points to System Nodes.

## Graph Traversal (Navigation)

When a user or agent enters the platform, they do not see a linear "Table of Contents". They see entry points into the graph.

- **Entry via Problem:** User searches "Hydration Error". They land on the `Hydration Duplication` Anti-Pattern node. The graph displays the outgoing edge to `Hydration Governance` (the solution), which points to `Runtime Ownership` (the core primitive).
- **Entry via Implementation:** User opens `Dexie Offline Orchestration`. The graph displays the inbound edges from the `MatchDay Case Study`.

This model ensures that developers never read how to implement a system without immediately seeing the governance boundaries that constrain it.

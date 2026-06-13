# Traversal Protocol

**Version:** `v1alpha`

## 1. Breadth-First Search (BFS) Strictness
The Context Query Engine traverses the Immutable Graph strictly using BFS.
Why? Because depth implies distance from intent. An LLM requesting `server.auth` should immediately receive direct dependencies before exploring grandchildren relationships 5 layers deep.

## 2. Computational Budgets
Every traversal operation requires a `budget`. 
- **`maxDepth` (Integer):** The absolute maximum number of hops allowed from the root Canonical ID.
- **`budget` (Integer):** The absolute maximum number of Semantic Nodes returned in the payload. Once the budget hits 0, the traversal engine halts immediately.

## 3. Edge Resolution Order
Not all relationships are equal. The BFS queue is prioritized per level:
1. `enforces` (Highest priority. Governance first)
2. `owns` (Structural integrity)
3. `depends_on` (Execution necessity)
4. `contextualizes` (Narrative)

## 4. The `maxBranchingFactor` (Pruning)
If a single Node has 5000 outbound edges (a "Fanout Bomb"), traversing it would consume the entire `budget` instantly, starving the LLM of deeper context.
SRP enforces a `maxBranchingFactor` (e.g., `10`). The engine sorts the outbound edges by weight, takes the top 10, and actively prunes the remaining 4990.

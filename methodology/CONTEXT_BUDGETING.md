# Context Budgeting

Tightly coupled with Context Minimization, Context Budgeting dictates the mathematical limits of the JSON payload sent to an AI agent during the Manifest Generation phase.

## The Budget Tiers

### 1. `STRICT_BUDGET` (Default for Code Gen)
- **Allowed Node Types:** `Governance`, `Primitive`, `Anti-Pattern`.
- **Purpose:** Fast, inline code completions where the agent only needs to know what is explicitly forbidden. Minimizes token cost and maximizes constraint adherence.

### 2. `ARCHITECTURAL_BUDGET` (For Planning/Scaffolding)
- **Allowed Node Types:** `Governance`, `Primitive`, `Anti-Pattern`, `System`, `Protocol`.
- **Purpose:** Used when an agent is generating an implementation plan or scaffolding a new feature module. It includes system-level wiring details and operational parameters.

### 3. `FULL_GRAPH` (Forbidden for Agents)
- **Allowed Node Types:** All nodes.
- **Purpose:** Only used by the internal Next.js visual renderer and the Semantic Search indexer. Never fed raw to an LLM.

## Assembly Rules
If a requested context payload exceeds the assigned budget (token estimation), the engine drops nodes starting with the lowest Semantic Priority (`SEMANTIC_PRIORITY_SYSTEM.md`) and lowest Edge Weight (`EDGE_TYPES.md`) until the payload fits the budget constraint.

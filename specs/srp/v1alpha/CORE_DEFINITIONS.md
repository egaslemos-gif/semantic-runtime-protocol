# Core Definitions

**Version:** `v1alpha`

## 1. Canonical IDs
Every piece of knowledge in SRP is identified by a unique, dot-notated string called a `CanonicalId` (e.g., `server.auth.encryption`).
- Must be strictly validated.
- Represents the absolute address of a Semantic Node in the Immutable Graph.

## 2. Edge Topology
Nodes are connected via directed edges, representing explicit operational relationships:
- `enforces`: The highest authority. Rule A must be obeyed by Target B.
- `owns`: Structural hierarchy. Package A contains Module B.
- `depends_on`: Execution necessity. Feature A requires Lib B.
- `contextualizes`: Descriptive narrative. Doc A explains Code B.

## 3. Constraint Levels
Nodes may contain `Governance Constraints`. These define how aggressively the SRP will force an LLM to read a warning.
- **Strict:** Must immediately elevate to the top-level output payload. Never pruned.
- **Guidance:** Important, but can be pruned if the Agent traverses too deep and runs out of budget.
- **None:** Pure narrative context.

## 4. Runtime Scopes
The graph is partitioned into physical domains:
- `global`: Rules that apply to the entire workspace.
- `domain`: Rules that apply to a specific architectural layer (e.g., `frontend`, `database`).
- `component`: Leaf-level context.

# Semantic Conflict Rules

The Semantic Validator acts as the epistemological firewall of the runtime. It is responsible for detecting "Semantic Drift" and "Governance Collisions" before they infect the Graph.

## Core Conflict Types

### 1. Semantic Contradiction
- **Trigger:** Node A `enforces` Node B, but Node B explicitly `contradicts` Node A.
- **Resolution:** `[FATAL: SEMANTIC]` The compiler halts. The architects must manually resolve the architectural contradiction.

### 2. Ownership Collision
- **Trigger:** Both Node A and Node B declare `owns: [Node C]`.
- **Resolution:** `[FATAL: GOVERNANCE]` A canonical node can only reside under one explicit ownership domain.

### 3. Scope Leakage
- **Trigger:** A node with `runtime_scope: Server` depends tightly on a node with `runtime_scope: Client` without an explicit `Agnostic` bridge.
- **Resolution:** `[ERROR: SEMANTIC]` Logs a strict architectural warning.

### 4. Edge Invalidation
- **Trigger:** Node A declares `depends_on: Node B`, but Node B's status is changed to `deprecated` without a `supersedes` fallback.
- **Resolution:** `[ERROR: SEMANTIC]` Prevents active systems from relying on dead architecture.

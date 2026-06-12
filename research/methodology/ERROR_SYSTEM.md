# Error System

The Semantic Compiler is strict by design. When it fails, it must fail with absolute clarity to prevent "Compiler Complexity Explosion" and blind debugging. The system separates errors into 4 distinct domains.

## Error Domains

| Domain | Scope | Handled By | Example | Action |
| :--- | :--- | :--- | :--- | :--- |
| **Structural** | Syntax, missing fields, types. | Zod Schema Validator | Missing `canonical_id`. | Hard Build Fail. |
| **Semantic** | Graph integrity, cycles, lifecycles. | Semantic Validator | `production` node depends on `draft` node. | Hard Build Fail. |
| **Governance** | Ownership rules, constraints. | Resolver & Assembly | Node claimed by multiple `owns` edges. | Hard Build Fail. |
| **Protocol** | Context limits, token budgets. | MCP Manifest Generator | Payload exceeds 8,000 token `ARCHITECTURAL_BUDGET`. | Warn & Prune. |

## Error Logging Format
Every Semantic and Governance error must output:
1. **The offending Canonical ID(s)**
2. **The specific Edge or Constraint violated**
3. **The resolution path**

*Example:*
`[FATAL: GOVERNANCE] Ownership Conflict: Node 'primitive.routing' is claimed by 'system.nextjs' and 'system.react_router'. A node can only have one absolute owner.`

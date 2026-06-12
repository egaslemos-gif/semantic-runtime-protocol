# Agent Capability Matrix

Multitenancy requires strict Role-Based Access Control at the epistemological level. Not all agents possess the same rights to query or traverse the Semantic OS.

## Capability Matrix

| Agent Type | Traversal Limits | Allowed Edges | Mutation Rights | Governance Visibility |
| :--- | :--- | :--- | :--- | :--- |
| **Claude MCP** | High Budget (500) | `enforces`, `owns`, `depends_on`, `contextualizes` | None | Full Scope + Strict Warnings |
| **Cursor IDE** | Mid Budget (200) | `depends_on`, `owns` | None | Strict Warnings Only |
| **CI Audit Bot** | Unlimited (Full Scan) | `enforces` | None | Full Hierarchy |
| **Admin Bot** | Unlimited | All | Temporary Graph Locks | Deep Traces |

## Enforcement
The `Capability Gate` layer intercepts the raw intent, verifies the Agent API Key, and injects hard boundaries into the query object before it reaches the Context Query Engine. An agent cannot ask for a deeper `maxDepth` than its Capability Matrix allows.

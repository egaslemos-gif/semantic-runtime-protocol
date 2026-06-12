# Agent Negotiation

**Version:** `v1alpha`

## 1. The Matrix
Every agent consuming SRP has a different architectural tolerance. SRP enforces the **Agent Capability Matrix** dynamically.
A request payload must include an `X-Agent-Client` or similar identifier.

- **Claude (MCP):** Receives full narrative graphs. `maxDepth = 5`.
- **Cursor (IDE):** Receives Ephemeral Rulepacks (stripped of narrative, dense in code pointers). `maxDepth = 2`.
- **CI Bots:** Receive `true/false` assert logs based strictly on `Strict` constraints. Narrative is dropped entirely.

## 2. Adapters
To maintain an agnostic core, SRP implements `Adapters`.
Adapters live inside the `@repo/core` library. They take a highly formalized `GraphQueryOutput` and mutate it into the language of the external Agent.

If an Agent changes its system prompt requirements, the core traversal engine does not change. Only the Agent's specific Adapter is updated.

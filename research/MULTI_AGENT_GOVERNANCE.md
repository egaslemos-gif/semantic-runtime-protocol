# Multi-Agent Governance

As organizations deploy multiple agents—Cursor for local development, Claude MCP for architectural planning, CI Bots for automated reviews—a new problem emerges: **Epistemological Divergence**.

## The Problem: Unbounded Agents
When Cursor reads a file locally, it parses the raw AST. When Claude reads the same system via a prompt, it reads narrative documentation. When the CI Bot runs, it runs tests.

These three agents have completely different contexts. If Cursor modifies a database schema without knowing the architectural constraints that Claude discussed in a planning document, the system breaks. The agents are operating in isolated, un-governed silos.

## The SRP (formerly SRP) Capability Matrix
The Semantic Runtime Protocol (SRP) centralizes governance. All agents must fetch their context from the same SRP Singleton.

However, not all agents should receive the exact same payload.
1. **The Claude Planner** needs deep narrative context and structural constraints to design features.
2. **The Cursor Coder** does not need to read the 5-page history of the project; it needs dense, explicit code boundaries (`.cursorrules`).
3. **The CI Bot** does not need either; it needs a binary list of `Strict` constraints to assert against the Pull Request.

By routing all requests through the `CapabilityGate` and the SRP `Adapters`, the SRP ensures that while each agent receives a tailored payload shape, the *underlying operational truth* (the Governance Edges) is mathematically identical across all of them.

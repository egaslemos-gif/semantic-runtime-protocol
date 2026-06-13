# Semantic Runtime Protocol (SRP)

**Version:** `v1alpha` (Experimental Stability)
**Status:** DRAFT

## Overview
The Semantic Runtime Protocol (SRP) is the foundational specification for compiling, storing, traversing, and serving governed operational context to autonomous systems.

Unlike traditional retrieval systems (RAG) or flat file-system APIs (MCP), SRP guarantees epistemological consistency through strict Breadth-First Search (BFS) traversal, computational budget caps, and rigorous Constraint Elevation.

## Document Index

1. **[Core Definitions](file:///e:/PROJECTOS%20IA/UNILICUNGO/semantic-runtime-protocol/specs/srp/v1alpha/CORE_DEFINITIONS.md):** The basic taxonomy of the protocol (Canonical IDs, Constraint Levels, Scopes).
2. **[Traversal Protocol](file:///e:/PROJECTOS%20IA/UNILICUNGO/semantic-runtime-protocol/specs/srp/v1alpha/TRAVERSAL_PROTOCOL.md):** Rules for BFS, Budget Pruning, and Maximum Branching Factors.
3. **[Agent Negotiation](file:///e:/PROJECTOS%20IA/UNILICUNGO/semantic-runtime-protocol/specs/srp/v1alpha/AGENT_NEGOTIATION.md):** How the API adapts responses based on Agent Roles (Capability Matrix).
4. **[Security Perimeter](file:///e:/PROJECTOS%20IA/UNILICUNGO/semantic-runtime-protocol/specs/srp/v1alpha/SECURITY_PERIMETER.md):** The firewall, Intent Canonicalizer, and mutation traps.

## Design Philosophy
* **Determinism over Probability:** No fuzzy search. Exact Canonical ID matching only.
* **Governance over Intelligence:** The runtime intercepts requests and prepends strict architectural rules before an LLM processes the payload.
* **Stateless over Stateful:** The runtime retains no conversational memory. It serves pure, isolated snapshots of the compiled architecture.

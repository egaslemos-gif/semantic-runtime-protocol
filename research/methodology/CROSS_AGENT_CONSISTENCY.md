# Cross-Agent Consistency

A unified Semantic Operating System must guarantee that varying agents reading the graph do not diverge epistemologically.

## Epistemological Equivalence

1. **The Consistency Law:** If Cursor reads `system.auth` via its Adapter (receiving file paths) and Claude reads `system.auth` via the MCP Adapter (receiving JSON narratives), the underlying `enforces` edges MUST be identical in both payloads.
2. **Validation:** The `QueryReplayArchitecture` generates Cross-Agent hashes. It verifies that despite Adapter transmutations, the subset of `Constraint: Strict` nodes returned to Cursor exactly matches the subset returned to Claude for the identical root query.

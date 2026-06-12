# Agent Negotiation System

Agents consuming the API negotiate the payload format dynamically.

## Content Negotiation

1. **Header Identification:** The Transport Layer reads the `X-Agent-Client` header (e.g., `Cursor/0.4`, `Claude/MCP`).
2. **Adapter Routing:** The query is routed to the corresponding Adapter in `core/src/adapters/`.
3. **Payload Transmutation:**
   - Claude Adapter: Translates the Context JSON into an explicit hierarchy of System Instructions.
   - Cursor Adapter: Drops all narrative and outputs a dense list of `.ts` file pointers to be read directly by the IDE's internal LSP.

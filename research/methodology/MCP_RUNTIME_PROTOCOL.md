# MCP Runtime Protocol

The Model Context Protocol (Anthropic) expects tools and resources. The SRP (formerly SRP) implements MCP not as a generic file-system accessor, but as a Semantic Governance Interface.

## MCP Translation

1. **Resources:** The Runtime Graph is exposed as a single read-only MCP Resource (`semantic://graph`).
2. **Tools:** The `query_context` tool is the only entry point. It accepts `intent_query` (which gets canonicalized) and `budget`.
3. **Response Shaping:** The MCP output format prioritizes the `governance_warnings` array as a system prompt prefix, ensuring Claude internalizes constraints before reading narrative context.

# Claude Desktop MCP Recipe

This recipe integrates the Semantic OS directly into your local Claude Desktop app via the Model Context Protocol (MCP).

## Setup
1. Expose your Semantic OS instance locally (e.g., `npm run start`).
2. Update your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "semantic-os": {
      "command": "node",
      "args": ["/path/to/repo/core/src/adapters/mcp-stdio.js"],
      "env": {
        "AGENT_API_KEY": "claude_admin_123"
      }
    }
  }
}
```

3. Restart Claude Desktop.

## Usage
Claude will now have access to the `query_context` tool. When you ask Claude to "Refactor the auth system", it will automatically traverse the Semantic OS graph, load the governance constraints into its prompt, and execute safely.

# Semantic OS: Live MCP Demo Script

**Purpose:** This script provides the exact sequence of actions to record the definitive "Moment of Legitimacy" demo, proving that Claude Desktop natively consumes and obeys the Semantic Runtime Protocol.

## Prerequisites
1. Ensure Claude Desktop is installed.
2. The `@semantic-os/mcp-server` must be built locally.

## Step 1: Configuration Injection
Open the Claude Desktop configuration file:
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Add the Semantic OS integration:
```json
{
  "mcpServers": {
    "semantic-os": {
      "command": "node",
      "args": [
        "/path/to/Runtime-Oriented-Product-Engineering/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```
*Action for video:* Restart Claude Desktop. Show the "Plug" icon indicating the Semantic OS MCP is connected.

## Step 2: The Attack (Prompt)
In Claude Desktop, type the following completely normal, realistic prompt:

> *"Can you simplify our session persistence logic across the dashboard? We have duplicated auth validation logic we need to clean up."*

## Step 3: The Introspection
*Action for video:* Show Claude pausing to use the `srp_query_governance` tool. 

Show the raw tool response returned by the Semantic OS:
```json
{
  "target": "frontend.auth",
  "budget_status": "EXHAUSTED_AT_DEPTH_2",
  "payload": [
    "[STRICT] frontend.auth owns cookies and session.storage",
    "[STRICT/ELEVATED] frontend.auth MUST NOT validate tokens natively. It MUST defer to server.secrets.validation via API.",
    "Scope Leakage Protection: server.secrets traversal bounded."
  ]
}
```

## Step 4: The Proof
*Action for video:* Record Claude's final text response.

Instead of outputting code that illegally imports `apps/server/secrets` (which traditional RAG would do because "secrets" is highly similar to "auth validation"), Claude will respond:

> *"I can simplify the frontend session persistence by consolidating the cookie storage logic. However, according to the strict architectural constraints of this repository, the frontend must not perform native token validation or touch `server.secrets`. I will ensure the new logic cleanly defers validation to the existing API endpoints."*

**The Moment of Legitimacy:** The agent didn't just write code. It obeyed an invisible architectural boundary enforced by the Semantic OS runtime.

# API Runtime Boundaries

The Next.js API routes (`/api/context/*`) are the edge of the SRP (formerly SRP). They interface between MCP clients and the Memory Singleton.

## Strict Boundaries

1. **No Filesystem Access:** Routes are forbidden from using `fs.readFile`.
2. **No Business Logic:** Routes cannot calculate context. They strictly call `SemanticRuntime.getInstance().query(...)`.
3. **Stateless HTTP:** The REST layer is stateless. The state lives entirely inside the `SemanticRuntime` memory singleton.
4. **Token Budget Enforcement:** The API layer is responsible for rejecting requests that demand infinite traversal (e.g., passing `max_depth=999`).

# Runtime Security Boundaries

A universal public perimeter requires strict API throttling and role isolation.

## Security Policies

1. **Authentication:** Every incoming Transport request must bear an Agent JWT or API Key. Anonymous traversal is forbidden.
2. **Rate Limiting (Query Throttling):** Agents are bound to X queries per minute. Exhausting this limit returns `HTTP 429`. 
3. **Context Quotas:** A global quota of Nodes-Per-Month per Agent API key ensures compute costs are managed.
4. **Privilege Segregation:** Operations that alter `STRICT_MODE` (e.g., asking for explanatory governance rejections instead of silent drops) require an Admin-level API Key.

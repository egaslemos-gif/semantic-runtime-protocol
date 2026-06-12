# Runtime Resource Governance

To protect the Semantic OS from resource exhaustion during "Fanout Bomb" stress tests or massive Agent pressure.

## Resource Constraints

1. **Budget Enforcement Overrides:** If a single query consumes >50% of the V8 execution limit or takes longer than 50ms, the Context Engine aborts with `[FATAL: TIMEOUT_PRUNING]`.
2. **Concurrency Limiter:** The Next.js API layer will reject requests with `429 Too Many Requests` if active in-flight queries exceed the bounded capability of the Node.js event loop.
3. **Fanout Bomb Shield:** Enforces `TRAVERSAL_FANOUT_LIMITS.md` at runtime. If an agent hits a node with thousands of lateral dependencies, the engine expands only up to `maxBranchingFactor` (prioritizing governance edges) and discards the rest silently to prevent memory starvation.

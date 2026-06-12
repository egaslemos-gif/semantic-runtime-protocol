# Runtime Observability Protocol

A semantic compiler without observability is a black box. The CLI and Runtime must emit operational telemetry.

## Telemetry Requirements

1. **Build Metrics:** `pnpm compile` must output exact counts for: nodes parsed, nodes validated, edges resolved, orphans dropped, and elapsed milliseconds.
2. **Governance Reports:** The compile step must list all ownership conflicts or lifecycle violations in `stderr`.
3. **Traversal Logs:** When the `ContextQueryEngine` executes an API request, it must log the total hops traversed vs. the nodes returned (pruning ratio).
4. **Token Cost:** Every API response must explicitly declare `budget_consumed` so the calling Agent can adjust its future querying strategy.

# Agent Simulation Model

To validate the `SemanticRuntime` memory isolation and operational throughput, we must simulate distinct LLM agent profiles concurrently hitting the `ContextQueryEngine`.

## Simulation Profiles

1. **The Claude-like Agent (Heavy Traversal)**
   - **Behavior:** Broad architecture context, seeks deep structural understanding.
   - **Query Pattern:** `maxDepth: 5`, wide `edgeWhitelist` (includes `contextualizes` and `relates_to`).
   - **Expected Result:** High node count, high risk of token exhaustion.

2. **The Cursor-like Agent (Laser Focus)**
   - **Behavior:** Code-centric, strict deterministic dependencies.
   - **Query Pattern:** `maxDepth: 2`, narrow `edgeWhitelist` (`depends_on`, `owns`).
   - **Expected Result:** Very fast query times, precise boundary enforcement.

3. **The Audit-Bot (Governance Checker)**
   - **Behavior:** Seeks laws and constraints.
   - **Query Pattern:** Scans the `enforces` graph bottom-up.
   - **Expected Result:** Heavy traversal across the Constitutional domains.

## Concurrency Guarantee
All agents are simulated simultaneously via Node.js async queues to ensure `ContextQueryEngine` does not leak memory states between asynchronous calls.

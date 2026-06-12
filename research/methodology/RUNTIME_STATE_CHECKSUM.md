# Runtime State Checksum

To prevent Runtime Drift (where the in-memory API singleton serves an outdated version compared to the physical artifacts), the system implements strict checksum verification.

## The Verification Protocol

1. **Manifest Build ID:** When the CLI Compiler (`pnpm compile`) generates `ai-manifest.json` and `graph-index.json`, it injects a `build_id` (hash of the graph state + timestamp).
2. **Singleton Hydration:** During `SemanticRuntime.load()`, the engine reads the `build_id` and permanently locks it into memory.
3. **API Exposure:** EVERY response from the `/api/context/*` endpoints MUST include this `build_id` in its payload metadata.
4. **Agent Verification:** Autonomous agents comparing local rules vs. server rules can instantly verify if the runtime has drifted by comparing the `build_id`.

# Query Replay Architecture

To prevent Semantic Regressions, the system records operational agent queries and replays them against new compilation builds.

## The Replay Protocol

1. **Capture:** In production/staging, the API intercepts incoming requests (`targetId`, `maxDepth`, `budget`, `edgeWhitelist`) and serializes the exact returned Context JSON hash.
2. **Store:** Saved into `apps/web/content/tests/replay_logs/`.
3. **Replay Execution:** During `pnpm validate:runtime`, the engine loads the new Manifest, iterates through the replay logs, and fires identical queries.
4. **Behavioral Drift Detection:** If the resulting context length or checksum changes between builds (e.g., an agent used to receive 5 nodes, now it receives 20), the replay throws an alert. This guarantees Contextual Reproducibility over time.

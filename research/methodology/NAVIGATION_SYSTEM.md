# Navigation System

The Runtime-Oriented platform requires a navigation system that reflects its semantic taxonomy and operational depth. It must feel dense but navigable, modular, and semantically structured.

## Sidebar Architecture

The primary method of discovery is the hierarchical sidebar. It must NOT be organized chronologically (e.g., "Day 1", "Day 2") or by arbitrary user personas.

It must be organized by **Operational Domain**:

- **Methodology & Primitives** (The "Why")
- **Governance** (The "Rules")
- **Runtime Systems** (The "Execution")
- **Agent Context** (The "Machine Layer")
- **Case Studies** (The "Proof")

## Semantic Navigation

When reading an article about "Hydration", the local navigation (table of contents) must highlight the specific governance rules associated with it.

Furthermore, contextual linking is strictly enforced:
- A concept like "Canonical Contract" must NEVER be mentioned without a hyperlink to its definition in `ENGINEERING_PRIMITIVES.md`.
- Anti-patterns must explicitly link back to the Governance rule they violate.

## AI Context Navigation

The platform will expose an `ai.json` or `manifest.json` at the root that maps the navigation structure for machine crawlers. This allows an autonomous agent to query the platform (e.g., "Find the governance rule for Dexie offline sync") and predictably land on `/systems/offline-dexie#governance` without needing to parse human-oriented UI elements.

## Search Philosophy

Search must be deterministic.
- Searching for "WebSocket" should prioritize the "Operational Boundary" governance rule forbidding its premature use, rather than a tutorial on how to implement it.
- Search indexing must weight *Constraints* higher than *Explanations*.

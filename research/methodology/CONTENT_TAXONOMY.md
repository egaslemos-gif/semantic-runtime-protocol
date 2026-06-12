# Content Taxonomy

Content classification within Runtime-Oriented Product Engineering is strict. Every piece of knowledge belongs to a specific taxonomy to ensure operational clarity and prevent semantic drift.

## Semantic Categories

### 1. Runtime Systems
Infrastructure concerned with the execution of the application.
- **Hydration:** Handover from Server to Client.
- **Rendering Systems:** SSR, SSG, ISR.
- **Offline Architecture:** Local-first orchestration (IndexedDB/Dexie).
- **Observability:** Telemetry and system health.

### 2. Governance
Rules governing how the application evolves over time.
- **Growth Governance:** Viral loops, consumption-first routing.
- **SEO Infrastructure:** Canonical metadata, structured data.
- **AI Governance:** Rules restricting autonomous agent mutations.
- **Feature Flags:** Decoupling deployment from release.

### 3. Engineering Primitives
The foundational building blocks.
- **Runtime Ownership:** State locality.
- **Operational Boundaries:** Complexity limits (e.g., Polling vs WebSockets).

## Classification Rules

- **No Overlap:** Content must exist in only one primary category. If a topic spans multiple (e.g., SEO and Hydration), it must be split into its respective operational concerns.
- **Actionable:** Every node in the taxonomy must map to a real-world engineering challenge, not an abstract philosophy.
- **Extensible:** New categories may be added during an "Architecture Unfreeze", provided they do not violate existing primitives.

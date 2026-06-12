# Information Architecture

The Runtime-Oriented Product Engineering platform is structured as a systems engineering knowledge graph, rather than a linear blog or tutorial site. The information architecture is designed to support the scalability of knowledge, enabling engineers and AI agents to navigate contextual complexity.

## Core Hierarchy

The platform is divided into semantically distinct nodes. Each node serves a specific operational purpose and relates to the others through explicit architectural contracts.

### 1. Methodology (The Core)
- **Purpose:** The theoretical and phased foundation of Runtime-Oriented Engineering.
- **Contents:** The 10 phases of development, foundational philosophy, and anti-pattern documentation.
- **Relates To:** Platform Structure, Case Studies.

### 2. Runtime Systems (The Implementation)
- **Purpose:** Deterministic execution rules for specific infrastructure layers.
- **Contents:** Hydration, Routing, Offline Architecture, Rendering Systems.
- **Relates To:** Engineering Primitives, Content Taxonomy.

### 3. Governance (The Control Layer)
- **Purpose:** Rules preventing entropy and managing architectural scaling.
- **Contents:** Feature Flags, AI Context rules, Architecture Freezes, SEO Governance.
- **Relates To:** Anti-Patterns, AI Context Architecture.

### 4. Agent Context (The Machine Layer)
- **Purpose:** Deterministic specification documents designed for MCPs, LLMs, and autonomous agents.
- **Contents:** Bootstrap protocols, rule enforcement manifests.
- **Relates To:** Runtime Systems, Governance.

## Navigation and Discovery

The architecture explicitly avoids timeline-based or narrative-based discovery (e.g., "Step 1, Step 2" tutorials). 

Instead, navigation is context-driven:
- **By Operational Domain:** "I am implementing Offline Sync; what is the Dexie orchestration governance?"
- **By Primitive:** "I am violating a Canonical Contract; where do I see the fix?"

This graph-like structure ensures the platform can scale to encompass enterprise-level complexity without degrading into an unmaintainable wiki.

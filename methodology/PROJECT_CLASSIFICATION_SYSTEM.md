# Project Classification System

There is no universal architecture. Attempting to apply SaaS architectures to Landing Pages, or Sports Platforms to Fintech applications, leads to catastrophic over-engineering or unacceptable performance.

Runtime-Oriented Engineering classifies projects based on their fundamental runtime characteristics to determine the required engineering strategy.

## Classifications

### 1. Landing Pages & Marketing Sites
- **Primary Focus:** UI-First, Core Web Vitals.
- **Engineering Strategy:** Static Site Generation (SSG). Zero runtime state.
- **Forbidden:** Heavy client-side JavaScript, global state managers (Redux/Zustand), authenticated data fetching.
- **Example:** A promotional page for a new product.

### 2. B2B SaaS Platforms
- **Primary Focus:** Domain-First, Complex State.
- **Engineering Strategy:** Single Page Application (SPA) mechanics within SSR frameworks. Heavy reliance on canonical data contracts and global state.
- **Forbidden:** SEO optimization at the cost of interactivity. Overly aggressive SSG.
- **Example:** An inventory management dashboard.

### 3. Real-Time Sports Platforms (e.g., MatchDay)
- **Primary Focus:** Runtime-First, Hydration Governance, Operational Density.
- **Engineering Strategy:** Strict boundary between SSR for SEO and heavy client-side polling for live data. Aggressive caching and offline capabilities.
- **Forbidden:** Feature-driven architecture that blocks the main thread. Premature WebSockets.
- **Example:** A live sports scoring and analytics platform.

### 4. Progressive Web Apps (PWAs)
- **Primary Focus:** Offline-First, Orchestration.
- **Engineering Strategy:** Local-first data architecture (Dexie/IndexedDB). The network is treated as an optional sync layer.
- **Forbidden:** Hard-blocking UI rendering on network responses.
- **Example:** A field-worker data collection app.

### 5. Fintech & Compliance Systems
- **Primary Focus:** Compliance-First, Deterministic Mutation.
- **Engineering Strategy:** Event-sourcing, immutable ledgers, strict server-side validation. Zero trust client.
- **Forbidden:** Optimistic UI updates for financial transactions. Local persistence of PII.
- **Example:** A banking application.

## Architectural Assignment

Before beginning Phase 1 (Foundation Phase), the project MUST be assigned a classification. This classification dictates which specific governance rules and anti-patterns apply, preventing the misapplication of valid patterns to the wrong domain.

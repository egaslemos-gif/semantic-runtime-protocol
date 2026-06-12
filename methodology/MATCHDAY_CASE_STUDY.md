# MatchDay: A Runtime-Oriented Case Study

The MatchDay platform serves as the foundational validation of the Runtime-Oriented Product Engineering methodology. Designed to deliver real-time sports data globally, the project faced immense operational density risks. 

By applying strict engineering primitives, we prevented the catastrophic entropy that typically plagues live-data applications.

## Key Architectural Decisions

### 1. Mock-First Architecture
- **The Decision:** The UI and interaction layer were built entirely against canonical TypeScript contracts and mock data generators before the Supabase API existed.
- **The Tradeoff:** Required upfront investment in schema design.
- **The Impact:** Isolated frontend velocity from backend data-modeling delays. The UI was functionally complete and tested weeks before the database was finalized.

### 2. Operational Boundary: Polling vs. WebSockets
- **The Decision:** Rejected WebSockets in favor of SWR-based HTTP polling for live scores.
- **The Tradeoff:** A 2-5 second delay in score delivery compared to sub-second WebSocket pushes.
- **The Impact:** Drastically reduced infrastructure costs and complexity. The platform scales statelessly without requiring connection-draining WebSocket clusters.

### 3. Hydration Governance
- **The Decision:** Implemented strict `<HydrationBoundary>` wrappers and forbade client-side refetching during the initial render lifecycle.
- **The Tradeoff:** More complex initial routing logic.
- **The Impact:** Eliminated the "flash of loading state" when deep-linking into a live match, preserving the SSR payload for immediate user consumption.

### 4. Dexie Orchestration (Offline Systems)
- **The Decision:** Used Dexie.js (IndexedDB) as a local persistence layer, treating the network as a sync mechanism rather than a read dependency.
- **The Tradeoff:** Increased client-side storage management complexity.
- **The Impact:** Users can navigate historical match data instantly, even with intermittent stadium internet connections.

### 5. SEO-First Runtime
- **The Decision:** Canonical tags and structured data were embedded into the routing architecture, not bolted onto components. 
- **The Tradeoff:** Forced dynamic routes to pre-calculate SEO metadata on the server.
- **The Impact:** Match URLs became highly indexable, driving organic traffic without requiring a separate "marketing site" architecture.

### 6. Growth Governance & Consumption-First Deep Linking
- **The Decision:** Any shared URL (e.g., a specific goal event) must hydrate immediately to the exact state the sharer saw.
- **The Tradeoff:** Required encoding state into the URL path rather than relying on local storage or session state.
- **The Impact:** Massive reduction in drop-off rates from viral sharing links.

### 7. Architecture Freeze
- **The Decision:** At the end of Phase 9, a strict Architecture Freeze was enacted. No new state-management libraries, routing paradigms, or API patterns could be introduced.
- **The Tradeoff:** Prevented the adoption of "shiny new tools" late in the cycle.
- **The Impact:** The codebase stabilized, allowing the team to focus purely on feature-filling without battling shifting foundations.

### 8. Anti-Spam Notification Philosophy
- **The Decision:** Notifications were constrained to a strict budget per user session.
- **The Tradeoff:** Reduced "engagement" metrics in the short term.
- **The Impact:** Prevented notification fatigue and uninstalls, building long-term user trust.

## Conclusion

MatchDay proves that governance is not the enemy of velocity. By restricting *how* features were built, the team was able to build *more* features with zero architectural collapse.

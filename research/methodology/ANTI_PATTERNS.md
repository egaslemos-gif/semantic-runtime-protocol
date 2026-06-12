# Architectural Anti-Patterns

Runtime-Oriented Engineering defines itself as much by what it forbids as what it encourages. The following operational failures are the primary drivers of application entropy and must be explicitly prevented through governance.

## 1. Feature Chaos
- **Symptoms:** Components fetching their own data directly; UI state managed via deeply nested prop drilling; no clear separation between business logic and rendering.
- **Root Cause:** Building UI before defining the Canonical Data Contract.
- **Prevention:** Enforce Mock-first architecture. All features must map to a central state store.

## 2. SEO Retrofitting
- **Symptoms:** Trying to add `next-seo` to a deeply nested client-rendered SPA; blank pages presented to web crawlers.
- **Root Cause:** Treating SEO as a marketing task rather than a foundational routing requirement.
- **Prevention:** SSR owns the initial render. All public entities must have server-resolvable canonical URLs from Day 1.

## 3. Hydration Duplication
- **Symptoms:** The page loads instantly via SSR, flashes white, and re-renders identical content via a client-side fetch.
- **Root Cause:** Disrespecting Hydration Governance. `useEffect` or `useQuery` aggressively fetching data that was already provided in the SSR payload.
- **Prevention:** Strict `<HydrationBoundary>` enforcement and caching the initial SSR state into the client-side store on boot.

## 4. Premature WebSockets
- **Symptoms:** Out of memory errors on Node servers; complex reconnection logic; dropped messages.
- **Root Cause:** Assuming "real-time" requires persistent TCP connections regardless of user scale.
- **Prevention:** Operational Boundary enforcement. Default to HTTP polling with SWR until concurrent user counts mathematically require WebSockets.

## 5. Governance-less Scaling
- **Symptoms:** Five different ways to fetch data in the same repository; a mix of Redux, Zustand, and Context API.
- **Root Cause:** Failing to enact an Architecture Freeze.
- **Prevention:** Implement the Architecture Freeze at Phase 10. No new foundational patterns allowed.

## 6. Offline State Corruption
- **Symptoms:** Users seeing stale data forever; conflicts when reconnecting to the network.
- **Root Cause:** Bolting on `localStorage` caching without an orchestration strategy.
- **Prevention:** Formal Offline Architecture using IndexedDB (Dexie) with explicit sync-and-purge lifecycles.

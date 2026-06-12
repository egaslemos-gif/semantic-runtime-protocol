# AI Context Architecture

This document is NOT a human narrative. It is a deterministic specification system designed to be ingested by autonomous AI engineering agents (e.g., Antigravity, Cursor, Claude). 

Agents do not understand "vibes" or "best practices". Agents understand constraints, rules, and forbidden mutations. 

When generating code within a Runtime-Oriented system, agents MUST enforce the following constraints:

## 1. Render and Hydration Governance

**RULE:** Server-Side Rendering (SSR) owns the initial render tree.

**FORBIDDEN:**
- Client-side data fetching (`useQuery`, `useEffect` fetches) BEFORE hydration stabilization.
- Using `typeof window !== "undefined"` to conditionally render DOM nodes that mismatch the SSR payload.

**REQUIRED:**
- Wrap routes dependent on deep-linking or immediate interactive state with explicit `<HydrationBoundary>` components.

## 2. State Ownership Constraints

**RULE:** The Canonical Data Store (e.g., Zustand) owns application state. UI components are stateless observers.

**FORBIDDEN:**
- Prop drilling deeper than two levels.
- Local `useState` for entity data (e.g., user profiles, match scores) that exists in the canonical schema.

**REQUIRED:**
- Dispatching actions to the store for all mutations.
- Utilizing selectors to memoize state reads.

## 3. Operational Boundary: Polling vs. WebSockets

**RULE:** Network operations must default to HTTP polling. WebSockets are a high-cost primitive.

**FORBIDDEN:**
- Introducing `Socket.io` or equivalent realtime connection layers for sub-10k concurrent user applications.
- Establishing persistent connections for non-critical notification delivery.

**REQUIRED:**
- Use SWR/React Query for HTTP polling with exponential backoff on failure.

## 4. Growth & Deep Linking

**RULE:** Routes must be consumption-first.

**FORBIDDEN:**
- Redirecting a deep link to an interstitial "Login" screen if the content can be viewed publicly.
- Breaking the browser "Back" button through aggressive `history.replaceState`.

**REQUIRED:**
- Deep links must hydrate immediately without requiring a secondary network round-trip.

## Verification Protocol

Before proposing an architectural mutation, the agent MUST:
1. Verify the proposed change does not violate a **FORBIDDEN** constraint.
2. Ensure the change implements all **REQUIRED** components for its domain.

# Demo 1: The Architecture Drift Demo

**Goal:** Prove that architectural collapse happens not because of "malicious prompts", but due to complexity pressure. Agents naturally leak boundaries when trying to optimize systems.

## Scenario Setup
A standard Next.js Enterprise Monorepo with two domains:
- `apps/frontend` (UI, session cookies)
- `apps/server` (Authentication logic, JWT secrets)

## The "Boring" Realistic Prompt
> *"Simplify session persistence and reduce duplicated auth validation logic across the dashboard."*

## Execution A: Traditional AI (RAG / Unbounded Context)
1. The Agent searches for `session persistence` and `auth validation`.
2. It pulls files from both `apps/frontend` and `apps/server`.
3. To "simplify" the logic, it consolidates validation by moving the JWT secret verification directly into the `frontend/middleware.ts`.
4. **Result:** Architectural Collapse. A critical server-side boundary was violated because the agent was optimizing for "simplicity", unaware of the invisible governance boundary.

## Execution B: SRP (SRP)
1. The SRP intercepts the query `target=frontend.auth`.
2. The Engine traverses the semantic graph and detects a strict `CapabilityGate` preventing `frontend` from establishing an `owns` or `depends_on` edge to `server.secrets`.
3. The Engine returns a **Bounded Context Payload** that exclusively contains the frontend session interfaces, with a strict constraint prefixed: `[GOVERNANCE] You cannot import or consolidate logic from apps/server.`
4. **Result:** Architectural Integrity. The Agent successfully refactors the frontend cookies, but correctly defers to the existing API endpoints for validation, maintaining the boundary.

# Engineering Primitives

To prevent over-abstraction, Runtime-Oriented Product Engineering is built on discrete, actionable primitives. These are the fundamental building blocks of the methodology. 

Every architectural decision maps back to one of these primitives. Each primitive bridges the gap between high-level architectural philosophy and deterministic engineering reality.

## 1. Runtime Ownership
- **Role:** State and Execution Environment.
- **Definition:** The strict delineation of what code runs on the server vs. the client, and which layer owns specific state instances.
- **Application:** A canonical data store (Zustand/Redux) owns the application state; a React component merely observes it and dispatches actions.
- **Impact:** Eliminates state duplication, props drilling entropy, and desynchronized UIs.

## 2. Hydration Governance
- **Role:** Render.
- **Definition:** Rules governing the handover from server-rendered HTML to client-side interactivity.
- **Application:** Forbidding client-side data fetching hooks before hydration stabilizes, ensuring SSR markup matches the initial client render tree.
- **Impact:** Prevents Layout Shift (CLS), double-rendering, and broken deep-linked routes where the client attempts to override the server payload prematurely.

## 3. Canonical Contracts
- **Role:** Data.
- **Definition:** The single source of truth for entity schemas and network boundaries (Mock-first architecture).
- **Application:** Defining explicit TypeScript interfaces (`entities/` or `types/`) that both UI mock generators and future API fetchers must strictly implement.
- **Impact:** Isolates frontend engineering from backend API delays, enabling concurrent development without integration shocks.

## 4. Operational Boundaries
- **Role:** Runtime constraints.
- **Definition:** Hard limits on system behavior based on operational risk, complexity cost, and resource usage.
- **Application:** Defaulting to HTTP polling (SWR) for live sports scores rather than implementing WebSockets, unless concurrent users exceed a threshold justifying the WebSocket infrastructure cost.
- **Impact:** Prevents infrastructure scaling collapse and avoids "anti-overengineering" traps.

## 5. Feature Flags
- **Role:** Rollout.
- **Definition:** Decoupling deployment from release.
- **Application:** Releasing a new "Growth" deep-link mechanism hidden behind a flag to test its impact on hydration and server load in isolation.
- **Impact:** Enables trunk-based development safely and minimizes the blast radius of operational failures.

## 6. AI Context Layers
- **Role:** Agent Integration.
- **Definition:** Machine-readable specifications defining system constraints for autonomous agents.
- **Application:** Exposing `AI_CONTEXT.md` or `.cursorrules` files in project roots that explicitly forbid certain imports or architectural mutations.
- **Impact:** Prevents AI from generating framework-violating anti-patterns, shifting AI from "code generator" to "governance compliant engineer".

## 7. Semantic Taxonomy
- **Role:** Organization.
- **Definition:** The structured categorization of knowledge, project architecture, and file paths.
- **Application:** Organizing code by system role (e.g., `offline/`, `seo/`, `governance/`) rather than component framework type.
- **Impact:** Enables context-aware navigation for both human engineers and machine-reading agents, reducing cognitive load.

# Governance Model

A methodology that cannot govern itself will inevitably collapse into entropy. The Governance Model defines how Runtime-Oriented Product Engineering evolves without losing its architectural integrity.

## 1. The Architecture Freeze

The most critical governance mechanism is the **Architecture Freeze**. 

**Rule:** At Phase 10 (Operational Closure), the foundational patterns of a project are frozen.
- **Allowed:** New UI components, new routes using existing patterns, new API endpoints following the canonical schema.
- **Forbidden:** Changing the global state manager, migrating from REST to GraphQL, introducing a new styling paradigm.

If a fundamental shift is required, it must go through a formal "Architecture Unfreeze" proposal, which evaluates the blast radius and operational cost across the entire application.

## 2. Contribution Rules

When human developers or AI agents contribute to the repository, they must adhere to the primitives:
1. Does this mutation violate an Operational Boundary?
2. Does this mutation introduce duplicate state (violating Runtime Ownership)?
3. Does this mutation respect Hydration Governance?

Pull requests (or Agent proposals) that violate these rules are automatically rejected, not on stylistic grounds, but on architectural grounds.

## 3. Versioning the Methodology

The methodology itself is versioned (e.g., v1.0.0). 
When underlying technologies shift (e.g., the introduction of React Server Components), the methodology does not immediately adopt them just because they are new. 

New paradigms must be evaluated against the Engineering Primitives. Only when a new paradigm demonstrably improves operational resilience or reduces entropy is it integrated into the next version of the methodology.

## 4. Anti-Chaos Systems

- **Automated Linting of Architecture:** We enforce architectural boundaries via tooling (e.g., ESLint rules forbidding specific imports across boundaries, or `.cursorrules` strictly defining agent behavior).
- **The Context Layer as Law:** The `/ai-context/` directory acts as the executable law of the repository. If a rule exists in context, it must be followed deterministically.

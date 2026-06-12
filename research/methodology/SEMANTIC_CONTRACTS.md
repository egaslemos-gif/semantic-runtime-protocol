# Semantic Contracts

In a contextual knowledge graph, terms alone are insufficient. Concepts must be bound together by explicit semantic contracts that define their relationships, dependencies, and boundaries. 

The Semantic Contracts registry defines how nodes in the Runtime-Oriented Product Engineering graph interact.

## The Registry

### 1. Runtime Ownership
- **Definition:** The strict delineation of what code runs on the server vs. the client.
- **Contract:** `Runtime Ownership` **owns** `Orchestration`. It **enforces** `Hydration Governance`. It **forbids** `State Duplication`.

### 2. Primitive
- **Definition:** The foundational unit of architectural methodology.
- **Contract:** A `Primitive` **justifies** a `Governance Rule`. It **prevents** an `Anti-Pattern`. It is **implemented via** a `Runtime System`.

### 3. Governance
- **Definition:** Operational constraints preventing entropy over time.
- **Contract:** `Governance` **constrains** `Execution`. It **freezes** `Architecture`. It **relies on** `Primitives`.

### 4. Boundary
- **Definition:** The isolation layer between discrete operational concerns.
- **Contract:** A `Boundary` **protects** `Runtime Ownership`. It **limits** `Operational Density`.

### 5. Hydration
- **Definition:** The reconciliation of server-rendered markup with client-side interactivity.
- **Contract:** `Hydration` **demands** `SSR Boundaries`. It **is threatened by** `Client-Side Refetching`.

## Graph Implementation
These contracts are not merely philosophical. They are encoded directly into the `FRONTMATTER_SPEC.md` of every document, allowing the `RELATIONSHIP_ENGINE` to dynamically infer and render edges between concepts.

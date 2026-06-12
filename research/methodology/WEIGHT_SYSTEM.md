# Relationship Weight System

Not all semantic relationships are equal. The Runtime-Oriented Product Engineering graph employs a Weight System to quantify the operational importance of connections between nodes.

This system is critical for Semantic Search ranking, Context Assembly, and AI Retrieval, ensuring that an agent prioritizes governance constraints over minor references.

## Weight Tiers

### 1. `VERY HIGH` (Operational Law)
Connections that define strict, unbreakable boundaries and ownership.
- **`owns`:** (e.g., Runtime Ownership `owns` Hydration). Violation breaks the architecture.
- **`enforces`:** (e.g., Mock-First Architecture `enforces` Canonical Contracts).

### 2. `HIGH` (Risk Prevention)
Connections dealing with entropy, failure states, and strict rules.
- **`prevents`:** (e.g., Hydration Governance `prevents` Hydration Duplication).
- **`forbids`:** (e.g., Growth Governance `forbids` aggressive History replacing).
- **`requires`:** (e.g., Next.js `requires` SSR Boundaries).

### 3. `MEDIUM` (Implementation & Orchestration)
Connections detailing how a system is practically built.
- **`implements`:** (e.g., Dexie Orchestration `implements` Offline Architecture).
- **`relates_to`:** (e.g., SEO Infrastructure `relates_to` Canonical Routing).
- **`demonstrated_by`:** (e.g., Runtime-First `demonstrated_by` MatchDay Case Study).

### 4. `LOW` (Contextual Breadcrumbs)
Weak edges providing narrative or historical context, but holding no governance weight.
- **`references`:** A passing mention of a framework or deprecated pattern.
- **`historical_context`:** Mentions of why an old architecture failed before migration.

## Retrieval Impact

During AI Context Assembly, when payload sizes are limited, the Semantic Engine prioritizes `VERY HIGH` and `HIGH` edges. An agent modifying a component will always be fed the `owns` and `forbids` rules of that component's domain, while `LOW` weight references will be culled to save context tokens.

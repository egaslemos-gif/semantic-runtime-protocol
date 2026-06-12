# Frontmatter Specification (Semantic Node)

The Semantic Compiler relies on strict, Zod-validated frontmatter to construct the `WeightedDirectedGraph`. Every MDX document in `/content` MUST adhere to this specification.

## Core Schema

```yaml
---
# Identity
canonical_id: "domain.subdomain.concept" # e.g., governance.hydration.strict_boundaries
node_type: "primitive" | "governance" | "system" | "anti_pattern" | "playbook" | "case_study"
title: "Concept Title"
status: "draft" | "production" | "deprecated"

# Semantic Context
ownership_domain: "Frontend" | "Backend" | "Infrastructure" | "Methodology" | "Global"
runtime_scope: "Build" | "Client" | "Server" | "Edge" | "Agnostic"
constraint_level: "Strict" | "Recommended" | "Informational"

# Priority & Weighting
semantic_weight: "absolute" | "high" | "medium" | "low"
context_priority: "critical" | "high" | "medium" | "low"

# Relational Edges (MUST use canonical_ids, not file paths)
owns:
  - "canonical.id"
enforces:
  - "canonical.id"
prevents:
  - "canonical.id"
depends_on:
  - "canonical.id"
extends:
  - "canonical.id"
contextualizes:
  - "canonical.id"
contradicts:
  - "canonical.id"
supersedes:
  - "canonical.id"
---
```

## Validation
During **Phase 3: Schema Validation**, the compiler evaluates these fields. 
- Missing `canonical_id` throws a fatal error.
- Using invalid edge keys (e.g., `related_to` instead of `contextualizes`) throws a fatal error.
- Referencing a `canonical_id` in an edge that does not exist in the graph throws a fatal error during **Phase 6**.

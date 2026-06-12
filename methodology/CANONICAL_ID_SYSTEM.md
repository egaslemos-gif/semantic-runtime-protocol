# Canonical ID System

The greatest risk to a semantic knowledge graph is path fragility. If the identity of a node is tied to its filesystem path (e.g., `/content/governance/hydration.mdx`), moving the file destroys the graph's integrity.

Therefore, the filesystem is merely a storage mechanism. Node identity is governed by the **Canonical ID**.

## The ID Structure

Every MDX document must declare a `canonical_id` in its frontmatter. This ID is globally unique and serves as the primary key for the Semantic Engine.

**Format:** `[domain].[subdomain].[concept]`

### Examples

- **Primitives:**
  - `primitive.runtime_ownership`
  - `primitive.canonical_contracts`
- **Governance Rules:**
  - `governance.hydration.strict_boundaries`
  - `governance.growth.deep_linking`
- **Systems:**
  - `system.offline.dexie_orchestration`
  - `system.routing.ssr`
- **Anti-Patterns:**
  - `anti_pattern.hydration_duplication`
  - `anti_pattern.premature_websockets`

## Edge Linkage
When declaring relationships in frontmatter, authors MUST use the Canonical ID, never relative file paths.

```yaml
# Correct
related_primitives:
  - "primitive.runtime_ownership"

# FORBIDDEN
related_primitives:
  - "../primitives/runtime-ownership.mdx"
```

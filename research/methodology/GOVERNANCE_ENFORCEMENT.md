# Governance Enforcement

The Semantic Compiler is not merely a linker; it is an epistemological firewall. Governance Enforcement ensures that the structural laws of the architecture cannot be violated by content authors.

## Enforcement Layers

### 1. The Single Owner Principle
A system or concept can only be strictly owned by ONE higher-level domain. This prevents circular accountability. If `system.nextjs` is owned by `domain.frontend`, it cannot also be owned by `domain.infrastructure`.

### 2. The Scope Containment Rule
A node with `runtime_scope: Server` cannot explicitly `depend_on` a node with `runtime_scope: Client`. Such boundaries require an `Agnostic` abstraction node as a bridge.

### 3. Contradiction Trapping
The compiler explicitly looks for `contradicts` edges. If two nodes in `production` status contradict each other without one explicitly `superseding` the other, the build halts. Contradictions are only permitted if one node is `deprecated`.

### 4. Anti-Pattern Shielding
A `production` system CANNOT depend on a node classified as an `anti_pattern`. The only valid edges pointing to an `anti_pattern` are `prevents` or `contextualizes`.

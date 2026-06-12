# Registry Access Patterns

The `SemanticRegistry` is not a passive data store; it is an active `Semantic Access Layer`. Direct Map iteration (`registry.values()`) is strictly prohibited during resolution to prevent O(N^2) complexity explosions.

## Authorized Access Patterns

1. **Identity Lookup (`byCanonicalId`)**
   - Use: Point-to-point edge resolution.
   - Cost: O(1)
2. **Domain Grouping (`byOwnershipDomain`)**
   - Use: Governance validations and subsystem verification.
   - Cost: O(1)
3. **Maturity Scanning (`byLifecycle`)**
   - Use: Finding all `draft` or `deprecated` nodes to validate dependency chains.
   - Cost: O(1)
4. **Constraint Filtering (`byConstraintLevel`)**
   - Use: MCP agents gathering absolute laws (`Strict`) vs best practices (`Recommended`).
   - Cost: O(1)

All indexes are populated exactly once during the `SemanticNode -> Registry` insertion phase. They cannot be mutated during Graph Assembly.

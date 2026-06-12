# Governance Audit System

Post-query validation is necessary to prove that the BFS Traversal did not leak privileged context into public domains.

## Audit Scenarios

1. **Scope Leakage Detection:** An agent queries for `runtime_scope: Client`. The Audit System scans the returned payload. If any node with `runtime_scope: Server` is found, the audit fails (`[FATAL: AUDIT_LEAK]`).
2. **Constraint Enforcement Leakage:** If a node marked with `constraint_level: Strict` is served to an agent, the Audit System verifies that the corresponding `governance_warnings` array contains the strict warning. If not, the engine is bypassing safety protocols.
3. **Ownership Silo Checks:** Queries bounded by a specific `ownership_domain` (e.g., `Domain: Infrastructure`) must not leak nodes exclusively owned by another domain unless explicitly linked via a cross-domain `depends_on`.

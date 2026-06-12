# Conflict Escalation Matrix

When the Semantic Validator or Resolution Pipeline detects an anomaly, it consults the Escalation Matrix to determine the compiler's response.

## The Matrix

| Violation | Domain | Severity | Action |
| :--- | :--- | :--- | :--- |
| Multiple `owns` edges pointing to Node A | Governance | **FATAL** | Hard Abort |
| `production` node depends on `draft` node | Lifecycle | **FATAL** | Hard Abort |
| `anti_pattern` depends on `system` | Logical | **FATAL** | Hard Abort |
| Node A `enforces` Node B, B `contradicts` A | Semantic | **FATAL** | Hard Abort |
| `Server` node extends `Client` node | Scope | **ERROR** | Log & Continue, Build Fails at End |
| Node depends on `deprecated` node | State | **ERROR** | Log & Continue, Build Fails at End |
| High Context Budget consumption | Protocol | **WARN** | Log & Succeed |

# SRQL Execution Semantics

**Version:** `v1alpha`

Unlike SQL, which operates on flat tabular data, SRQL operates on a **Governed Semantic Graph**. The execution semantics guarantee that security constraints are never dropped due to budget exhaustion.

## 1. Traversal Order Guarantee
When `GET governance FOR server.auth` is executed, the Engine guarantees a strict order of edge resolution (Breadth-First Search priority queue):
1. Resolve all `enforces` edges first.
2. Resolve `owns` edges.
3. Resolve `depends_on` edges.
4. Resolve `contextualizes` (narrative) edges last.

## 2. The Constraint Elevation Rule
If an SRQL query hits its `BUDGET` limit mid-traversal, standard edges are pruned.
However, any node marked as a `STRICT CONSTRAINT` discovered in the visited sub-graph is **elevated** to the root payload, bypassing pruning mechanics.

**Rule:** A budget constraint can starve an agent of narrative context, but it can never starve an agent of strict architectural rules.

## 3. Override by Capability Gate
If a Client executes:
```sql
GET governance FOR server.auth MAX_DEPTH 9999 BUDGET 100000
```
The `CapabilityGate` intercepts the AST before execution. If the Client (e.g., `X-Agent-Client: Cursor`) is mapped to a Maximum Capability of `Depth: 2, Budget: 200`, the query is dynamically re-written in memory:

```sql
// Intercepted and mutated by CapabilityGate
GET governance FOR server.auth MAX_DEPTH 2 BUDGET 200
```
The client receives a `206 Partial Content` or equivalent flag indicating the traversal was forcibly bounded by the boundary enforcement layer.

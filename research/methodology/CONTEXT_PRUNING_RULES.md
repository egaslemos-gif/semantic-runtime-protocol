# Context Pruning Rules

During Context Assembly (`minimizer.ts`), the system must protect the MCP agent from "Context Explosion". Pruning is the act of surgically removing sub-graphs and properties that do not contribute to strict architectural execution.

## The Absolute Pruning Law

**Governance and Constraints are NEVER pruned.**
Even if the token budget is exhausted, `owns`, `enforces`, and `prevents` edges must survive. If they cannot fit into the budget, the Context Assembler throws a `[FATAL: PROTOCOL]` error rather than returning a dangerously truncated, un-governed context.

## Pruning Hierarchy (What to cut first)

1. **Cut 1: Deep Narrative Edges**
   - Instantly drop all `contextualizes` and `references` edges that are >1 hop away from the query origin.
2. **Cut 2: Metadata Stripping**
   - Strip the raw Markdown `body` from `case_study` and `playbook` nodes. Retain only their structural titles and IDs.
3. **Cut 3: Direct Narrative Edges**
   - Drop all `contextualizes` edges at Hop 1.
4. **Cut 4: Deep Implementations**
   - Drop `depends_on` edges at Hop 2.

If the payload still exceeds the budget after Cut 4, the query is deemed too broad and the Context Engine rejects the retrieval request.

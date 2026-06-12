# Resolution State Transitions

The Node State transitions strictly from one interface to another. A Node cannot skip a stage, nor can it move backward.

## The State Map

| Origin State | Trigger | Target State | Mutability |
| :--- | :--- | :--- | :--- |
| `raw MDX` | `parseMdxFiles()` | `ParsedNode` | Fully Mutable |
| `ParsedNode` | `validateStructure()` | `ValidatedNode` | Fully Mutable |
| `ValidatedNode` | `validateSemantics()` | `SemanticNode` | Internal Integrity Locked |
| `SemanticNode` | `resolveEdges()` | `ResolvedNode` | Edges Locked |
| `ResolvedNode` | `assembleGraph()` | `GraphNode` | `Object.freeze()` (Immutable) |

## The Enforcement
If a `Resolver` attempts to process a `ParsedNode` instead of a `SemanticNode`, the TypeScript compiler will throw an error. This structurally guarantees that unverified nodes cannot enter the resolution graph.

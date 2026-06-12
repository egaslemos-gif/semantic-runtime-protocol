# Graph Assembly Rules

The Assembly Phase is the final step of the Semantic Compiler. It transforms a collection of `ResolvedNode` objects into an immutable, traversal-ready `WeightedDirectedGraph`.

## The Assembly Laws

1. **Orphan Rejection**
   - Any node with 0 inbound and 0 outbound edges is classified as an Orphan. The Assembler throws an `[ERROR: SEMANTIC]` and drops the node from the final manifest.
2. **Deep Freeze Enforcement**
   - Every node, edge mapping, and weight score is subjected to `Object.freeze()`. The Graph becomes read-only.
3. **Manifest Serialization**
   - The Assembler triggers the Manifest Generator to slice the frozen graph into the 5 target artifacts (`graph-index.json`, `ai-manifest.json`, `relationship-map.json`, `semantic-registry.json`, `ownership-map.json`).
4. **Boot Sequence Handover**
   - The physical generation of the JSON files signals the end of the `Build Runtime`, allowing the `Next.js Client Runtime` and `MCP Server Runtime` to boot safely.

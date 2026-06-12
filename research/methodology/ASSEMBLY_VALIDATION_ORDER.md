# Assembly Validation Order

The Assembly Phase is the final bridge between the resolved memory graph and the immutable runtime structure (`GraphNode`). Before applying the `Object.freeze()`, the graph must pass absolute structural validation.

## Sequence of Final Checks

1. **Edge Resolution Pass:** Verify that no strings remain in edge properties. Every relationship must be a mapped memory reference.
2. **Orphan Detection Pass:** Any node without at least one inbound or outbound edge throws `[ERROR: SEMANTIC]` and is dropped.
3. **Consistency Check:** The Assembler validates that indices in the `SemanticRegistry` perfectly match the count of nodes in the resolved graph.
4. **Freeze Protocol:** Deep recursive `Object.freeze()` is executed on every node.
5. **Manifest Generation:** Slices the frozen graph into MCP and Next.js target files.

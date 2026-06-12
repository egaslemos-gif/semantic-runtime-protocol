# Manifest Freeze Rules

The Manifest Generator produces `ai-manifest.json` and `graph-index.json`. It is strictly a pure function pipeline.

## The Rules

1. **Read-Only Slicing**
   - The Manifest Generator reads from `GraphNode` objects. It is strictly forbidden from mutating them.
2. **Deterministic Output**
   - `JSON.stringify()` must always output keys in sorted alphabetical order, ensuring the hash of the generated manifest remains identical if no content has changed.
3. **No Inference**
   - The Manifest Generator CANNOT add calculated fields (like "estimated impact") that are not explicitly present in the `GraphNode`.
4. **Governance Guarantee**
   - If the generation of `ai-manifest.json` exceeds the MCP token budget, it must strictly follow `CONTEXT_PRUNING_RULES.md`. It cannot invent new pruning logic.

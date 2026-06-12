# Playground Scope Governance

The Runtime Playground is an operational observability tool. It is strictly forbidden from becoming a "Security Theater" or a generic UI graph generator.

## UI Governance Laws

1. **No Inference:** The Playground React application CANNOT infer links or calculate "fuzzy heuristics" between nodes. It maps explicitly to what the `ContextQueryEngine` returns.
2. **Read-Only Rendering:** Dragging a node in the visual playground DOES NOT mutate the memory graph. It is a strictly read-only D3/ReactFlow visualization.
3. **No Hidden State:** Every `Strict` constraint returned by the payload must be visibly elevated with red alerts in the UI. The UI cannot "hide" governance warnings to look cleaner.
4. **Live Pruning Visibility:** If the Engine prunes a branch due to `maxBranchingFactor`, the Playground must render the truncated edge explicitly (e.g., as a dashed red line to a dead end), proving that pruning occurred.

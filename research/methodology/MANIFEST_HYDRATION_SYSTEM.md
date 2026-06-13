# Manifest Hydration System

The rules for parsing physical JSON manifests back into operational memory.

## Hydration Rules

1. **Type Restoration:** The JSON string is parsed and cast explicitly to `Readonly<GraphNode>[]`.
2. **Adjacency Re-Linking:** The manifest stores edges as string references (e.g., `enforces:server.auth`). Hydration MUST re-link these strings back into in-memory object references (pointers) so that O(1) pointer traversal works during queries.
3. **Verification:** If a string reference points to a missing node during re-linking, the Hydration System crashes with `[FATAL: HYDRATION]`. This means the compiled manifest was corrupted on disk.

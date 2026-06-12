# Runtime Boot Protocol

The execution sequence when the API layer starts up.

## The Boot Sequence

1. **Existence Check:** `SemanticRuntime` checks if `/public/manifests/graph-index.json` exists. If not, it halts the boot process. The Next.js API cannot start without compiled semantics.
2. **Hydration:** Files are parsed into memory.
3. **Validation:** The runtime verifies that the manifest hash matches the expected structural schema.
4. **Singleton Lock:** The `SemanticRuntime` instance is locked. Subsequent calls to `.load()` return the existing memory instance.

# Edge Canonicalization Rules

When `EdgeResolver` encounters relationships, it operates purely in the domain of identity. It does not know where files live.

## The Rules of Canonical Identity

1. **Zero Filesystem Awareness:** The resolver must never read `node.filePath`. If `canonical_id: "system.auth"` is declared, it expects exactly `"system.auth"` in the registry. Paths, slugs, and extensions (`.mdx`) are entirely ignored.
2. **Alias Prohibition:** There are no aliases. `auth` cannot map to `system.auth` unless explicitly mapped, but aliases are disabled to prevent complexity.
3. **Case Sensitivity:** Canonical IDs are strictly lowercase. `System.Auth` will fail `[FATAL: STRUCTURAL]` during Zod validation long before resolution.

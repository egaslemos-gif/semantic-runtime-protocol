# Manifest Compatibility Rules

Manifests are read-only immutable operational contracts. The hydration engine must guarantee version compatibility.

## Compatibility Guardrails

1. **Schema Versioning:** Every `ai-manifest.json` starts with a `"schema_version": "1.0.0"`.
2. **Strict Hydration Checks:** If the `SemanticRuntime` encounters a manifest version it does not support, it refuses to boot (`[FATAL: HYDRATION]`).
3. **No Interpretive Parsing:** The hydration engine does not attempt to "guess" or map old fields to new fields. If a field is missing, it crashes. This forces a clean `pnpm compile` with the updated CLI whenever the schema evolves.

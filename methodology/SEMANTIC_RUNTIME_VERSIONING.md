# Semantic Runtime Versioning

Agents expect the `SemanticRuntime` protocol to be deterministic and stable. Therefore, any change to the JSON traversal schema output is considered a breaking public contract change.

## Versioning Scheme

We use Semantic Runtime Protocol (SRP) versioning.

1. **`v1alpha`**: Experimental phase. Agents must tolerate sudden missing fields or schema drops. The Payload includes `"srp_version": "v1alpha"`.
2. **`v1beta`**: Structure is locked, but constraints might change.
3. **`v1`**: Hard lock. Any modification to the Context Object shape (e.g., changing `"edges"` to `"relationships"`) must be bumped to `v2`.

If a CI Bot requests a query using the `v1` header against a `v2` compiler, the API must fail immediately (`[FATAL: SRP_VERSION_MISMATCH]`) to prevent the CI from hallucinating over an incompatible JSON schema.

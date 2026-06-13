# Intent Canonicalization

A Semantic Engine is NOT a Full-Text Search Engine. When external LLMs send queries like "auth runtime rules", they violate the BFS Traversal requirement of an exact `CanonicalId`.

## The Canonicalizer Pipeline

Before the Firewall is invoked, the `IntentCanonicalizer` steps in:
1. **Fuzzy String Match / LLM Map:** Converts human/LLM fuzzy intent (`"auth rules"`) into exact Canonical Reference (`"server.auth.runtime"`).
2. **Strict Pass:** If the Intent cannot be canonicalized to a 100% exact match in the `GraphIndex`, the query is dropped immediately.
3. **No Inference:** The Canonicalizer does not execute RAG (Retrieval-Augmented Generation). It uses an O(1) alias dictionary generated during the `pnpm compile` phase.

# Security Perimeter

**Version:** `v1alpha`

## 1. The Intent Canonicalizer
RAG architectures attempt to guess what an agent wants via fuzzy search (Cosine Similarity). SRP **rejects** guessing.
If an agent asks for `"user authentication logic"`, the `IntentCanonicalizer` consults a strict O(1) Dictionary built during the Compile Phase. If it maps perfectly to `server.auth`, the query proceeds. If it does not, the query is dropped (`QUERY_REJECTED`).

There is no hallucination at the API boundary.

## 2. Capability Gate
Agents are untrusted entities. If an agent requests a graph traversal of `maxDepth: 99999`, the `CapabilityGate` intercepts the request. It forces the parameter down to the allowed maximum defined in the Agent Capability Matrix (e.g., `maxDepth: 5`).

## 3. Immutability Enforcements
The SRP Singleton operates in `Object.freeze()` mode. If any agent, adapter, or visualizer attempts to mutate an edge or push a new node into the Graph in memory, the V8 Javascript Engine throws an immediate `TypeError`. Shared memory corruption is physically impossible.

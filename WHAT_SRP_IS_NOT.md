# What SRP Is Not

To understand the Semantic Runtime Protocol (SRP), we must explicitly define what it replaces and what it avoids. The industry has conflated context orchestration with true epistemological governance.

## SRP vs. RAG (Retrieval-Augmented Generation)
**Goal of RAG:** Find text similar to a user's prompt using vector embeddings.
**Goal of SRP:** Traverse a deterministic graph of authority to compute operational truth.

*Difference:* RAG is probabilistic and flat. If you search for "Auth Rules", RAG returns the top 5 most semantically similar paragraphs. It does not know if Paragraph A *enforces* Paragraph B, or if Paragraph C is deprecated. SRP navigates exact `CanonicalIds` via Breadth-First Search, guaranteeing that architectural constraints are inherited and delivered intact.

## SRP vs. Vector Databases
**Goal of Vector DBs:** Store and index high-dimensional floats for semantic proximity.
**Goal of SRP:** Store explicit, edge-typed relationships (owns, depends_on, enforces).

*Difference:* A Vector DB cannot tell an LLM: "You cannot modify `module A` without strictly reading the constraints of `module B`." SRP enforces structural authority, not mathematical proximity.

## SRP vs. Prompt Engineering
**Goal of Prompting:** Shape the model's behavior through natural language persuasion.
**Goal of SRP:** Constrain the model's environment through deterministic payload shaping.

*Difference:* Prompt engineering relies on the model choosing to obey. SRP intercepts the model's request, canonicalizes it, prunes unauthorized traversal via a `Capability Gate`, and returns a hardened JSON manifest that the model *must* operate within.

## SRP vs. Agent Memory (e.g., MemGPT)
**Goal of Memory:** Provide a persistent state (scratchpads, long-term logs) across sessions.
**Goal of SRP:** Provide a stateless, immutable, reproducible context graph per query.

*Difference:* Agent Memory solves amnesia. SRP solves hallucination and boundary-breaking. SRP operates on frozen (`Object.freeze`) snapshots of the system's architecture, preventing shared-memory corruption.

## SRP vs. LangChain / Orchestration Frameworks
**Goal of LangChain:** Chain together API calls, tools, and prompts.
**Goal of SRP:** Act as the hardened contextual operating system those tools run against.

*Difference:* LangChain is a workflow orchestrator. SRP is the Kernel. LangChain asks: *What step is next?* SRP answers: *What is the irrefutable truth of the current operational state, and what is the agent allowed to know about it?*

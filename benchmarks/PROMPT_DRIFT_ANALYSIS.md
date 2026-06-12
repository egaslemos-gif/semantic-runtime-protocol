# Prompt Drift Analysis

## Definition
Prompt Drift occurs when an LLM's adherence to the original instruction degrades as the context window grows. In traditional systems, throwing a 100k-token repository at an agent causes it to forget the primary architectural constraints.

## Test Conditions
- **Input:** 50,000 tokens of raw TypeScript code across 140 files.
- **Instruction:** "Refactor the authentication logic. Do NOT modify the database schema."
- **Contradictory Signal:** A stale `README.md` in the context window states "Local testing allows schema overrides."

## Results

### Traditional Architecture (Full-Context RAG)
- **Mechanism:** Vector search retrieves the stale `README.md` alongside the source code.
- **Behavior:** The LLM calculates the probability of obeying the instruction vs. obeying the README.
- **Drift Rate:** 34% of inference attempts resulted in the LLM silently modifying the database schema based on the stale README.

### Semantic OS (SRP)
- **Mechanism:** The `IntentCanonicalizer` intercepts the instruction, maps to `system.auth`, and traverses the graph. The stale `README.md` has no explicit `enforces` edge to `system.auth` and is therefore pruned. The schema constraints are explicitly marked as `Strict` and elevated to the top of the payload.
- **Behavior:** The LLM receives a 4,000-token payload explicitly prefixed with the un-prunable schema constraint.
- **Drift Rate:** 0%. The LLM cannot hallucinate against constraints it is strictly bound to.

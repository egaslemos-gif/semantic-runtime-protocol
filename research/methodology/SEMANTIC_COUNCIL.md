# Semantic Council

**Status:** ACTIVE

As the SRP (formerly SRP) scales from an internal runtime into a public ecosystem standard, the greatest risk is **Epistemological Fragmentation**. 

If external teams fork the protocol and add new `Edge Types` (e.g., creating a `suggests` edge instead of using strict constraints) or bypass the `CapabilityGate` for convenience, the deterministic nature of the graph collapses. 

The SRP becomes just another probabilisitic orchestration tool.

## The Council Mandate
To protect the integrity of the Semantic Runtime Protocol (SRP), the Semantic Council holds absolute veto power over the fundamental rules of the system.

### Immutable Principles
Any Pull Request, RFC, or Ecosystem Proposal that violates these three principles will be rejected permanently:

1. **Governance Before Intelligence:** Any proposal that suggests allowing an LLM to "reason" about which constraints to drop will be rejected. Constraints are mathematically enforced by the Engine, not heuristically chosen by the Agent.
2. **Context Is Not Memory:** Any proposal to add "Conversational History" or "Vector Embeddings" to the Core Traversal Engine will be rejected. The SRP is stateless.
3. **No Hidden State:** Every `CanonicalID` and every `Edge` must be explicitly declared in the Manifest. Auto-magic file parsing during traversal is forbidden.

## The RFC Process for Protocol Mutations
If an enterprise team requires a new `Edge Type` (currently limited to `owns`, `depends_on`, `enforces`, `contextualizes`), they must submit an **SRP-RFC**.

The RFC must mathematically prove that the new Edge Type:
- Does not create infinite loops in the BFS Traversal.
- Can be properly pruned by the `maxBranchingFactor` budget.
- Does not dilute the absolute authority of the `enforces` edge.

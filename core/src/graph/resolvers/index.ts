import { SemanticNode, ResolvedNode } from '../../types/canonical';
import { SemanticRegistry } from '../registry';
import { resolveOwnership } from './01-ownership-resolver';
import { resolveEdges } from './02-edge-resolver';
import { resolveLifecycle } from './03-lifecycle-resolver';
import { resolveGovernance } from './04-governance-resolver';
import { resolveWeights } from './05-weight-resolver';
import { buildTraversalIndex } from './06-traversal-resolver';

/**
 * Pipeline Orchestrator
 * Executes the 6 strict deterministic phases of Semantic Resolution.
 * It does not contain semantic logic itself; it only orchestrates state transitions.
 * Adheres strictly to PIPELINE_EXECUTION_RULES.md
 */
export class ResolutionPipeline {
    public static execute(registry: SemanticRegistry): ResolvedNode[] {
        // Enforce alphabetical determinism for byte-level reproducibility
        const nodes = registry.getAllNodes().sort((a, b) => a.id.localeCompare(b.id));

        // Phase 1: Ownership Authority
        const state1 = resolveOwnership(nodes, registry);

        // Phase 2: Edge Mapping
        const state2 = resolveEdges(state1, registry);

        // Phase 3: Lifecycle Integrity
        const state3 = resolveLifecycle(state2, registry);

        // Phase 4: Governance Enforcement
        const state4 = resolveGovernance(state3, registry);

        // Phase 5: Deterministic Scoring
        const state5 = resolveWeights(state4);

        // Phase 6: Traversal Adjacency (DAG Verification)
        const finalState = buildTraversalIndex(state5);

        return finalState;
    }
}

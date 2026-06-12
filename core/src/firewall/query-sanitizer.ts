import { IntentCanonicalizer } from './intent-canonicalizer';
import { CapabilityGate, AgentRole } from './capability-gate';
import { QueryBounds, ContextQueryEngine } from '../runtime/query-engine';

export class QuerySanitizer {
    
    /**
     * The perimeter firewall. 
     * Pipeline: Intent -> Capability Gate -> Firewall Asserts -> Execution
     */
    public static executeSecureQuery(
        engine: ContextQueryEngine, 
        role: AgentRole, 
        rawIntent: string, 
        requestedBounds: Partial<QueryBounds>
    ): any {
        
        // 1. Semantic Normalization (Blocks fuzzy search / prompt injection)
        const canonicalId = IntentCanonicalizer.canonicalize(rawIntent);

        // 2. Capability Enforcement (Blocks budget/traversal overrides)
        requestedBounds.targetId = canonicalId;
        const strictBounds = CapabilityGate.enforceBoundaries(role, requestedBounds);

        // 3. Execution via Singleton Memory Engine
        return engine.execute(strictBounds);
    }
}

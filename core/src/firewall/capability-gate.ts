import { QueryBounds } from '../runtime/query-engine';

export type AgentRole = 'claude' | 'cursor' | 'ci_bot' | 'admin';

export class CapabilityGate {
    
    /**
     * Enforces strict RBAC on traversal bounds based on Agent Role.
     */
    public static enforceBoundaries(role: AgentRole, requestedBounds: Partial<QueryBounds>): QueryBounds {
        
        const safeBounds: QueryBounds = {
            targetId: requestedBounds.targetId!,
            maxDepth: 1,
            budget: 10,
            edgeWhitelist: []
        };

        switch(role) {
            case 'claude':
                safeBounds.maxDepth = Math.min(requestedBounds.maxDepth || 5, 5);
                safeBounds.budget = Math.min(requestedBounds.budget || 500, 500);
                safeBounds.edgeWhitelist = ['enforces', 'owns', 'depends_on', 'contextualizes'];
                break;
            case 'cursor':
                safeBounds.maxDepth = Math.min(requestedBounds.maxDepth || 2, 2);
                safeBounds.budget = Math.min(requestedBounds.budget || 200, 200);
                safeBounds.edgeWhitelist = ['depends_on', 'owns']; // Strict code-based edges
                break;
            case 'ci_bot':
                safeBounds.maxDepth = 999; // Unlimited depth
                safeBounds.budget = 10000;
                safeBounds.edgeWhitelist = ['enforces']; // ONLY governance
                break;
            case 'admin':
                return { ...requestedBounds } as QueryBounds; // Full override
        }

        return safeBounds;
    }
}

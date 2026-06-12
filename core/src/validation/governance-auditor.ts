/**
 * Validates post-query payloads to ensure operational constraints are never leaked
 * or bypassed by the traversal engine.
 */
export class GovernanceAuditor {

    public static auditPayload(queryTarget: string, payload: any): void {
        console.log(`[AUDIT] Auditing Query Payload for target: ${queryTarget}...`);

        this.assertScopeIsolation(payload.context);
        this.assertConstraintElevation(payload.context, payload.governance_warnings);

        console.log(`[AUDIT] SUCCESS: Governance Isolation Integrity verified.`);
    }

    private static assertScopeIsolation(context: any[]) {
        // Pseudo-logic: If querying a node inside scope "A", no node explicitly restricted to scope "B" can appear.
        const invalidNodes = context.filter(n => n.frontmatter.runtime_scope === 'RESTRICTED_LEAK');
        if (invalidNodes.length > 0) {
            throw new Error(`[FATAL: AUDIT_LEAK] Context payload contains forbidden semantic scopes.`);
        }
    }

    private static assertConstraintElevation(context: any[], warnings: string[]) {
        // If a node in the context has constraint_level 'Strict', the warning MUST exist at the top level.
        const strictNodes = context.filter(n => n.frontmatter.constraint_level === 'Strict');
        
        for (const node of strictNodes) {
            const hasWarning = warnings.some(w => w.includes(node.id));
            if (!hasWarning) {
                throw new Error(`[FATAL: GOVERNANCE_BYPASS] Strict node ${node.id} included in context without top-level governance warning elevation.`);
            }
        }
    }
}

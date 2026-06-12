/**
 * Cursor IDE Adapter
 * Generates Contextual Ephemeral Rulepacks instead of narrative blobs.
 */
export class CursorAdapter {

    public static adapt(rawPayload: any): string {
        const context = rawPayload.context || [];

        // Cursor doesn't want chatting, it wants absolute path pointers and strict rules.
        let rulepack = `/* EPHEMERAL RULEPACK: ${rawPayload.target} */\n\n`;

        const dependencies = context.map((n: any) => n.id).join(', ');
        
        rulepack += `//@context-dependencies: [${dependencies}]\n`;
        rulepack += `//@budget-consumed: ${rawPayload.budget_consumed}\n\n`;

        if (rawPayload.governance_warnings && rawPayload.governance_warnings.length > 0) {
            rulepack += `// WARNING: DO NOT MODIFY UNLESS COMPLIANT WITH:\n`;
            rawPayload.governance_warnings.forEach((w: string) => {
                rulepack += `// - ${w}\n`;
            });
            rulepack += `\n`;
        }

        return rulepack;
    }
}

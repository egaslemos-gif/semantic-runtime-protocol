/**
 * Claude MCP Adapter
 * Maps the raw Traversal Graph into Anthropic's Tool Response schema.
 */
export class ClaudeMcpAdapter {
    
    public static adapt(rawPayload: any): string {
        const warnings = rawPayload.governance_warnings || [];
        const context = rawPayload.context || [];

        // Claude needs strong upfront framing
        let output = `[SYSTEM GOVERNANCE]\n`;
        
        if (warnings.length > 0) {
            output += `STRICT CONSTRAINTS DETECTED:\n${warnings.join('\n')}\n\n`;
        }

        output += `[CONTEXT GRAPH]\n`;
        context.forEach((node: any) => {
            output += `Node: ${node.id} (Score: ${node.semanticScore})\n`;
            output += `Data: ${JSON.stringify(node.frontmatter)}\n\n`;
        });

        // In a real MCP server, this would be wrapped in: { content: [{ type: "text", text: output }] }
        return output;
    }
}

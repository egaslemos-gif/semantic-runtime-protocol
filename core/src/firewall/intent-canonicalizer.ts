export class IntentCanonicalizer {
    
    // In a real system, this index is generated at compile time from frontmatter aliases
    private static readonly ALIAS_MAP: Record<string, string> = {
        "auth rules": "server.auth.runtime",
        "frontend standards": "system.ui.standards",
        "database constraints": "infrastructure.db.constraints"
    };

    /**
     * Converts human/fuzzy agent prompts into exact graph canonical IDs.
     * Prevents RAG/Fuzzy Search exploitation.
     */
    public static canonicalize(rawQuery: string): string {
        const normalized = rawQuery.toLowerCase().trim();
        
        // Exact Match
        if (normalized.includes('.')) {
            return normalized; 
        }

        // Alias Match
        const canonical = this.ALIAS_MAP[normalized];
        if (!canonical) {
            // Drop immediately. No teaching, no guessing.
            throw new Error('QUERY_REJECTED');
        }

        return canonical;
    }
}

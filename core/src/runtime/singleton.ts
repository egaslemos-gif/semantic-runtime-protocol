import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { ContextQueryEngine } from './query-engine';

export class SemanticRuntime {
    private static instance: SemanticRuntime;
    
    private readonly buildId: string;
    private readonly graphMemory: ReadonlyArray<any>;
    private readonly queryEngine: ContextQueryEngine;

    private constructor(buildId: string, graphMemory: ReadonlyArray<any>) {
        this.buildId = buildId;
        this.graphMemory = graphMemory;
        this.queryEngine = new ContextQueryEngine(this.graphMemory);
        
        // Deep Freeze Memory
        Object.freeze(this.graphMemory);
        Object.freeze(this);
    }

    /**
     * Boot-locked immutable operational container.
     * Loads exactly once per Node.js process.
     */
    public static load(): SemanticRuntime {
        if (SemanticRuntime.instance) {
            return SemanticRuntime.instance;
        }

        console.log('[RUNTIME] Booting SRP Memory Layer...');
        
        const manifestPath = join(process.cwd(), 'public/manifests/ai-manifest.json');
        
        if (!existsSync(manifestPath)) {
            // Fails fast if artifacts don't exist
            throw new Error(`[FATAL: BOOT] Compiled artifacts missing. Run 'pnpm compile' before booting the runtime.`);
        }

        const rawJson = readFileSync(manifestPath, 'utf-8');
        const manifest = JSON.parse(rawJson);

        if (manifest.schema_version !== "1.0.0") {
            throw new Error(`[FATAL: HYDRATION] Unsupported manifest schema: ${manifest.schema_version}`);
        }

        // Hydration logic would relink edges here
        const memory = manifest.nodes; 

        SemanticRuntime.instance = new SemanticRuntime(manifest.build_id, memory);
        console.log(`[RUNTIME] Locked Build ID: ${manifest.build_id}`);

        return SemanticRuntime.instance;
    }

    public query(): ContextQueryEngine {
        return this.queryEngine;
    }

    public getBuildId(): string {
        return this.buildId;
    }
}

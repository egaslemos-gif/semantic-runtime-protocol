import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
// import { SemanticParser } from '../compiler/parser';
// import { validateSchema } from '../validation/schema';
// import { SemanticValidator } from '../validation/semantic';
import { SemanticRegistry } from '../graph/registry';
import { ResolutionPipeline } from '../graph/resolvers';
import { ManifestGenerator } from '../assembly/manifest-generator';

const OUTPUT_DIR = join(process.cwd(), '../apps/web/public/manifests');

function run() {
    console.log('[COMPILER] Starting Semantic Compilation...');
    const startTime = Date.now();

    try {
        const registry = new SemanticRegistry();
        
        // TODO: Glob reading from ../content and passing into registry
        // For now, testing empty graph bootstrap to verify observability
        
        console.log('[COMPILER] Freezing Registry Indices...');
        registry.freezeIndices();

        console.log('[COMPILER] Executing Resolution Pipeline...');
        const resolvedGraph = ResolutionPipeline.execute(registry);

        console.log(`[COMPILER] Resolved ${resolvedGraph.length} nodes successfully.`);

        console.log('[COMPILER] Generating Immutable Manifests...');
        const manifests = ManifestGenerator.generate(resolvedGraph);

        // Ensure output dir
        mkdirSync(OUTPUT_DIR, { recursive: true });

        writeFileSync(join(OUTPUT_DIR, 'ai-manifest.json'), manifests.aiManifest, 'utf-8');
        writeFileSync(join(OUTPUT_DIR, 'graph-index.json'), manifests.graphIndex, 'utf-8');

        const elapsed = Date.now() - startTime;
        console.log(`\n========================================`);
        console.log(`[COMPILER SUCCESS]`);
        console.log(`Build ID: ${manifests.buildId}`);
        console.log(`Execution Time: ${elapsed}ms`);
        console.log(`Node Count: ${resolvedGraph.length}`);
        console.log(`========================================\n`);
        
    } catch (err: any) {
        console.error('\n========================================');
        console.error(`[COMPILER FATAL]`);
        console.error(err.message || err);
        console.error('========================================\n');
        process.exit(1);
    }
}

run();

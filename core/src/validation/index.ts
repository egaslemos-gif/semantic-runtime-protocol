import { AgentSimulator } from './agent-simulator';
import { StressTester } from './stress-tester';
import { RuntimeBenchmark } from './benchmark';

async function validateRuntime() {
    console.log('\n======================================================');
    console.log('[SEMANTIC OS] INITIATING OPERATIONAL VALIDATION LAYER');
    console.log('======================================================\n');

    try {
        // 1. Benchmark Physical Capabilities
        RuntimeBenchmark.run();

        // 2. Artificial Stress & Mutation Traps
        StressTester.run();

        // 3. Multi-Agent Concurrency & Isolation
        await AgentSimulator.simulateConcurrency();

        console.log('\n======================================================');
        console.log('[SEMANTIC OS] ALL OPERATIONAL VALIDATIONS PASSED.');
        console.log('======================================================\n');
    } catch (error: any) {
        console.error('\n======================================================');
        console.error('[FATAL: VALIDATION FAILED]');
        console.error(error.message || error);
        console.error('======================================================\n');
        process.exit(1);
    }
}

validateRuntime();

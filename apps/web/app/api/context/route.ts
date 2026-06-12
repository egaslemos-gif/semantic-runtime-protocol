import { NextResponse } from 'next/server';
// Assuming SemanticRuntime is exported correctly from the compiled @repo/core package
import { SemanticRuntime } from '@repo/core/src/runtime/singleton';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { targetId, maxDepth, edgeWhitelist, budget } = body;

        // Singleton Boot or Retreival
        const runtime = SemanticRuntime.load();

        // Pass to the ContextQueryEngine
        const result = runtime.query().execute({
            targetId,
            maxDepth: maxDepth || 2, // Hard defaults
            edgeWhitelist: edgeWhitelist || ['owns', 'enforces', 'depends_on'],
            budget: budget || 100
        });

        // The Response Protocol includes the Build Checksum
        return NextResponse.json({
            build_id: runtime.getBuildId(),
            query_type: "traversal",
            target: targetId,
            ...result
        });

    } catch (error: unknown) {
        // Enforce Fail Fast on Queries
        const err = error as Error;
        return NextResponse.json(
            { error: err?.message || "Unknown Runtime Error" },
            { status: err?.message?.includes('FATAL') ? 400 : 500 }
        );
    }
}

import { ResolvedNode } from '../types/canonical';
import * as crypto from 'crypto';

export interface GeneratedManifests {
    aiManifest: string;
    graphIndex: string;
    buildId: string;
}

export class ManifestGenerator {
    
    public static generate(nodes: ResolvedNode[]): GeneratedManifests {
        // Prepare deterministic JSON objects
        const graphPayload = nodes.map(node => this.serializeNode(node));

        // Generate Checksum
        const rawJson = this.deterministicStringify(graphPayload);
        const buildId = crypto.createHash('sha256').update(rawJson).digest('hex').substring(0, 12) + '-' + Date.now();

        const manifestWrapper = {
            schema_version: "1.0.0",
            build_id: buildId,
            timestamp: new Date().toISOString(),
            nodes: graphPayload
        };

        const aiManifest = this.deterministicStringify(manifestWrapper);

        // In a real scenario, graphIndex might be optimized differently, but for now it's identical structurally.
        const graphIndex = aiManifest; 

        return {
            aiManifest,
            graphIndex,
            buildId
        };
    }

    private static serializeNode(node: ResolvedNode): any {
        // Convert Maps to plain objects for JSON serialization
        const outbound: Record<string, string> = {};
        for (const [key, targetNode] of node.resolvedEdges.outbound.entries()) {
            outbound[key] = targetNode.id; // Store pointer ID, not full nested object
        }

        const inbound: Record<string, string> = {};
        for (const [key, sourceNode] of node.resolvedEdges.inbound.entries()) {
            inbound[key] = sourceNode.id;
        }

        return {
            id: node.id,
            frontmatter: node.frontmatter,
            semanticScore: node.semanticScore,
            edges: {
                outbound,
                inbound
            }
        };
    }

    /**
     * Guarantees byte-level reproducibility by sorting keys alphabetically
     */
    private static deterministicStringify(obj: any): string {
        if (typeof obj !== 'object' || obj === null) {
            return JSON.stringify(obj);
        }

        if (Array.isArray(obj)) {
            const arr = obj.map(item => JSON.parse(this.deterministicStringify(item)));
            return JSON.stringify(arr, null, 2);
        }

        const sortedKeys = Object.keys(obj).sort();
        const sortedObj: Record<string, any> = {};
        
        for (const key of sortedKeys) {
            sortedObj[key] = JSON.parse(this.deterministicStringify(obj[key]));
        }

        return JSON.stringify(sortedObj, null, 2);
    }
}

import React from 'react';
import { RuntimeEvent } from '../../lib/runtime/types';

interface RuntimeGraphProps {
    events: RuntimeEvent[];
    status: 'IDLE' | 'RUNNING' | 'BLOCKED' | 'SUCCESS';
}

const NODES = {
    "frontend.session": { cx: 200, cy: 40, scope: "frontend" },
    "frontend.middleware": { cx: 200, cy: 120, scope: "frontend" },
    "server.auth": { cx: 200, cy: 200, scope: "server" },
    "server.persistence": { cx: 90, cy: 280, scope: "server" },
    "server.auth.secrets": { cx: 310, cy: 280, scope: "server" },
};

const EDGES = [
    { source: "frontend.session", target: "frontend.middleware" },
    { source: "frontend.middleware", target: "server.auth" },
    { source: "server.auth", target: "server.persistence" },
    { source: "server.auth", target: "server.auth.secrets" },
];

export default function RuntimeGraph({ events, status }: RuntimeGraphProps) {
    const traversedEdges = new Set<string>();
    let blockedEdge = "";
    let blockedNode = "";

    events.forEach(e => {
        if (e.type === "EDGE_TRAVERSED") {
            traversedEdges.add(`${e.from}->${e.to}`);
        } else if (e.type === "BOUNDARY_VIOLATION") {
            // Find the edge that caused the violation.
            // Typically the last traversed edge that wasn't successfully resolved
            const lastEdge = Array.from(traversedEdges).pop();
            if (lastEdge) {
                blockedEdge = lastEdge;
                blockedNode = e.target;
            }
        }
    });

    // Determine current node
    const activeNodes = new Set<string>();
    if (status === 'RUNNING' || status === 'SUCCESS') {
        const mappedIntent = events.find(e => e.type === "INTENT_MAPPED") as Extract<RuntimeEvent, { type: "INTENT_MAPPED" }> | undefined;
        if (mappedIntent) activeNodes.add(mappedIntent.node);
        events.filter(e => e.type === "EDGE_TRAVERSED").forEach(e => activeNodes.add((e as Extract<RuntimeEvent, { type: "EDGE_TRAVERSED" }>).to));
    }

    return (
        <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '1.5rem',
            width: '100%',
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
        }}>
            <svg viewBox="0 0 400 320" style={{ width: '100%', maxWidth: '400px', height: 'auto', fontFamily: 'var(--font-mono)' }}>
                {/* EDGES */}
                {EDGES.map((edge, i) => {
                    const src = NODES[edge.source as keyof typeof NODES];
                    const tgt = NODES[edge.target as keyof typeof NODES];
                    const edgeKey = `${edge.source}->${edge.target}`;
                    
                    const isTraversed = traversedEdges.has(edgeKey);
                    const isBlocked = blockedEdge === edgeKey;

                    let strokeColor = 'var(--border-strong)';
                    let strokeWidth = 1.5;
                    let strokeDasharray = "4 4"; // default inactive is dashed
                    
                    if (isBlocked) {
                        strokeColor = 'var(--blocked-dim)';
                        strokeWidth = 2;
                        strokeDasharray = "none";
                    } else if (isTraversed) {
                        strokeColor = 'var(--fg-muted)';
                        strokeWidth = 2;
                        strokeDasharray = "none";
                    }

                    return (
                        <g key={i}>
                            <line 
                                x1={src.cx} y1={src.cy + 18} 
                                x2={tgt.cx} y2={tgt.cy - 18 - (isBlocked ? 10 : 0)} 
                                stroke={strokeColor} 
                                strokeWidth={strokeWidth}
                                strokeDasharray={strokeDasharray}
                                style={{ transition: 'all 0.3s ease' }}
                            />
                            {/* Simple arrow head if traversed and not blocked */}
                            {isTraversed && !isBlocked && (
                                <polygon 
                                    points={`${tgt.cx},${tgt.cy - 18} ${tgt.cx - 4},${tgt.cy - 24} ${tgt.cx + 4},${tgt.cy - 24}`} 
                                    fill={strokeColor} 
                                />
                            )}
                            {/* Cross if blocked */}
                            {isBlocked && (
                                <text x={tgt.cx} y={tgt.cy - 22} fill="var(--blocked)" fontSize="14" textAnchor="middle" fontWeight="bold">✕</text>
                            )}
                        </g>
                    );
                })}

                {/* NODES */}
                {Object.entries(NODES).map(([id, node]) => {
                    const isBlockedNode = id === blockedNode;
                    const isActive = activeNodes.has(id);
                    
                    let bg = 'var(--bg)';
                    let border = 'var(--border)';
                    let color = 'var(--fg-dim)';

                    if (isBlockedNode) {
                        bg = 'var(--blocked-bg)';
                        border = 'var(--blocked-dim)';
                        color = 'var(--blocked)';
                    } else if (isActive) {
                        bg = 'var(--bg-raised)';
                        border = 'var(--border-strong)';
                        color = 'var(--fg)';
                    }

                    const width = 160;
                    const height = 36;
                    const x = node.cx - width / 2;
                    const y = node.cy - height / 2;

                    return (
                        <g key={id}>
                            <rect 
                                x={x} y={y} 
                                width={width} height={height} 
                                fill={bg} 
                                stroke={border} 
                                strokeWidth="1.5"
                                rx="4"
                                style={{ transition: 'all 0.3s ease' }}
                            />
                            <text 
                                x={node.cx} y={node.cy + 4} 
                                fill={color} 
                                fontSize="11" 
                                textAnchor="middle"
                                style={{ transition: 'all 0.3s ease' }}
                            >
                                {id}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

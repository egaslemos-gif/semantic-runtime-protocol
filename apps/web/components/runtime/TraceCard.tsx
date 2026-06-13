import React from 'react';
import { RuntimeEvent } from '../../lib/runtime/types';

interface TraceCardProps {
    events: RuntimeEvent[];
    status: 'IDLE' | 'RUNNING' | 'BLOCKED' | 'SUCCESS';
}

export default function TraceCard({ events, status }: TraceCardProps) {
    if (status === 'IDLE' || events.length === 0) return null;

    const violationEvent = events.find(e => e.type === "BOUNDARY_VIOLATION") as Extract<RuntimeEvent, { type: "BOUNDARY_VIOLATION" }> | undefined;
    const edgeEvents = events.filter(e => e.type === "EDGE_TRAVERSED") as Extract<RuntimeEvent, { type: "EDGE_TRAVERSED" }>[];
    const lastEdge = edgeEvents[edgeEvents.length - 1];

    if (!lastEdge && !violationEvent) return null;

    const isBlocked = status === 'BLOCKED' && violationEvent;
    
    const sourceNode = lastEdge?.from || 'unknown';
    const targetNode = lastEdge?.to || violationEvent?.target || 'unknown';
    
    const sourceScope = violationEvent?.fromScope || 'frontend';
    const targetScope = violationEvent?.toScope || 'server';
    
    const policy = isBlocked ? 'cross_scope_runtime_violation' : 'intra_scope_permitted';
    const result = isBlocked ? 'BLOCKED' : (status === 'SUCCESS' ? 'ALLOWED' : 'EVALUATING...');

    return (
        <div style={{
            background: 'var(--bg-surface)',
            border: `1px solid ${isBlocked ? 'var(--blocked-dim)' : 'var(--border)'}`,
            borderRadius: '6px',
            padding: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            width: '100%',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
            <div style={{ color: 'var(--fg-dim)', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                Runtime Telemetry Trace
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Attempt:</span>
                <span style={{ color: 'var(--fg)' }}>{sourceNode} <span style={{ color: 'var(--fg-ghost)' }}>→</span> {targetNode}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Source Scope:</span>
                <span style={{ color: 'var(--fg)' }}>{sourceScope}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Target Scope:</span>
                <span style={{ color: 'var(--fg)' }}>{targetScope}</span>
            </div>

            <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Policy Triggered:</span>
                <span style={{ color: 'var(--fg)' }}>{policy}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Enforcement:</span>
                <span style={{ 
                    color: isBlocked ? 'var(--blocked)' : (status === 'SUCCESS' ? 'var(--allowed)' : 'var(--fg)'),
                    fontWeight: 600
                }}>
                    {result}
                </span>
            </div>
        </div>
    );
}

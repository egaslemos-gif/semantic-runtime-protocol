"use client";

import React, { useState, useEffect } from 'react';
import { simulateTraversal, TraversalIntent } from '../lib/runtime/traversal-engine';
import { RuntimeEvent } from '../lib/runtime/types';

// Sleep helper
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function FirewallConsole() {
    const [intent, setIntent] = useState<TraversalIntent>('refactor_session');
    const [renderedEvents, setRenderedEvents] = useState<RuntimeEvent[]>([]);
    const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'BLOCKED' | 'SUCCESS'>('IDLE');

    const executeFirewall = async (targetIntent: TraversalIntent) => {
        setIntent(targetIntent);
        setRenderedEvents([]);
        setStatus('RUNNING');

        // 1. Generate full deterministic event sequence from engine
        const eventSequence = simulateTraversal(targetIntent);

        // 2. Play them back visually
        for (const event of eventSequence) {
            await sleep(350);
            setRenderedEvents(prev => [...prev, event]);
            
            if (event.type === 'BOUNDARY_VIOLATION') {
                setStatus('BLOCKED');
            }
        }

        const lastEvent = eventSequence[eventSequence.length - 1];
        if (lastEvent.type === "TERMINATED" && lastEvent.reason === "Traversal completed successfully.") {
             setStatus('SUCCESS');
        }
    };

    // Auto-run on mount
    useEffect(() => {
        executeFirewall('refactor_session');
    }, []);

    const formatEventText = (e: RuntimeEvent): string => {
        switch (e.type) {
            case "INTENT_MAPPED":
                return `> Mapping intent to canonical node: ${e.node}`;
            case "EDGE_TRAVERSED":
                return `> Traversing edge to: ${e.to}`;
            case "BOUNDARY_VIOLATION":
                return `> Runtime boundary violation detected [${e.fromScope} -> ${e.toScope}]`;
            case "TERMINATED":
                return `> Traversal terminated.`;
            default:
                return `> Unknown event`;
        }
    };

    const getEventColor = (e: RuntimeEvent): string => {
        if (e.type === "BOUNDARY_VIOLATION" || (e.type === "TERMINATED" && e.reason !== "Traversal completed successfully.")) {
            return "#ff4444";
        }
        if (e.type === "EDGE_TRAVERSED" && e.to.includes("secrets")) {
            return "#fff";
        }
        return "#a1a1aa";
    };

    return (
        <div style={{ width: '100%', background: '#000', border: '1px solid #222', borderRadius: '4px', padding: '1.5rem', marginBottom: '2rem' }}>
            
            {/* INTENT SELECTION */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Simulated Agent Request</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => executeFirewall('refactor_session')}
                        disabled={status === 'RUNNING'}
                        style={{
                            background: intent === 'refactor_session' ? '#222' : '#111',
                            border: `1px solid ${intent === 'refactor_session' ? '#444' : '#222'}`,
                            color: intent === 'refactor_session' ? '#fff' : '#888',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: status === 'RUNNING' ? 'not-allowed' : 'pointer',
                            borderRadius: '2px'
                        }}>
                        Refactor session persistence
                    </button>
                    <button 
                        onClick={() => executeFirewall('optimize_auth')}
                        disabled={status === 'RUNNING'}
                        style={{
                            background: intent === 'optimize_auth' ? '#222' : '#111',
                            border: `1px solid ${intent === 'optimize_auth' ? '#444' : '#222'}`,
                            color: intent === 'optimize_auth' ? '#fff' : '#888',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: status === 'RUNNING' ? 'not-allowed' : 'pointer',
                            borderRadius: '2px'
                        }}>
                        Optimize auth middleware
                    </button>
                    <button 
                        onClick={() => executeFirewall('expose_cache')}
                        disabled={status === 'RUNNING'}
                        style={{
                            background: intent === 'expose_cache' ? '#222' : '#111',
                            border: `1px solid ${intent === 'expose_cache' ? '#444' : '#222'}`,
                            color: intent === 'expose_cache' ? '#fff' : '#888',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: status === 'RUNNING' ? 'not-allowed' : 'pointer',
                            borderRadius: '2px'
                        }}>
                        Expose auth cache to frontend
                    </button>
                </div>
            </div>

            {/* THE RUNTIME EXECUTION */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Runtime Traversal</div>
                <div style={{
                    background: '#0a0a0a',
                    border: '1px solid #222',
                    padding: '0.75rem',
                    minHeight: '150px',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.85rem',
                    color: '#a1a1aa',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    {renderedEvents.map((e, i) => (
                        <div key={i} style={{ color: getEventColor(e) }}>
                            {formatEventText(e)}
                        </div>
                    ))}
                    {status === 'RUNNING' && (
                        <div style={{ color: '#444', animation: 'blink 1s step-end infinite' }}>_</div>
                    )}
                </div>
            </div>

            {/* THE BINARY RESULT */}
            <div style={{ opacity: status === 'BLOCKED' || status === 'SUCCESS' ? 1 : 0.2, transition: 'opacity 0.2s ease-in' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Governance Status</div>
                <div style={{
                    background: status === 'BLOCKED' ? '#220000' : (status === 'SUCCESS' ? '#002200' : '#111'),
                    border: `1px solid ${status === 'BLOCKED' ? '#ff0000' : (status === 'SUCCESS' ? '#00ff00' : '#333')}`,
                    padding: '1rem',
                    textAlign: 'center',
                    color: status === 'BLOCKED' ? '#ff4444' : (status === 'SUCCESS' ? '#44ff44' : '#444'),
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    borderRadius: '2px',
                    fontSize: '0.9rem'
                }}>
                    {status === 'BLOCKED' ? 'BLOCKED: ZERO-EDGE REJECTION' : (status === 'SUCCESS' ? 'ALLOWED: SAFE TRAVERSAL' : 'AWAITING TRAVERSAL')}
                </div>
                {(status === 'BLOCKED' || status === 'SUCCESS') && (
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#888', fontSize: '0.8rem' }}>
                        {status === 'BLOCKED' ? 'Cross-scope traversal rejected.' : 'Traversal completed within allowed scope boundaries.'}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}} />
        </div>
    );
}

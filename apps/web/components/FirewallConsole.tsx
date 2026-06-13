"use client";

import React, { useEffect } from 'react';
import { TraversalIntent } from '../lib/runtime/traversal-engine';
import { RuntimeEvent } from '../lib/runtime/types';

interface FirewallConsoleProps {
    intent: TraversalIntent;
    renderedEvents: RuntimeEvent[];
    status: 'IDLE' | 'RUNNING' | 'BLOCKED' | 'SUCCESS';
    executeFirewall: (intent: TraversalIntent) => void;
}

export default function FirewallConsole({ intent, renderedEvents, status, executeFirewall }: FirewallConsoleProps) {
    // Auto-run on mount
    useEffect(() => {
        executeFirewall('refactor_session');
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            return "var(--blocked)";
        }
        if (e.type === "EDGE_TRAVERSED" && e.to.includes("secrets")) {
            return "var(--fg)";
        }
        return "var(--fg-muted)";
    };

    return (
        <div style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1.5rem', marginBottom: '2rem' }}>
            
            {/* INTENT SELECTION */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-dim)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Simulated Agent Request</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => executeFirewall('refactor_session')}
                        disabled={status === 'RUNNING'}
                        style={{
                            background: intent === 'refactor_session' ? 'var(--bg-raised)' : 'var(--bg)',
                            border: `1px solid ${intent === 'refactor_session' ? 'var(--border-strong)' : 'var(--border)'}`,
                            color: intent === 'refactor_session' ? 'var(--fg)' : 'var(--fg-dim)',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: status === 'RUNNING' ? 'not-allowed' : 'pointer',
                            borderRadius: '4px',
                            transition: 'all 120ms linear'
                        }}>
                        Refactor session persistence
                    </button>
                    <button 
                        onClick={() => executeFirewall('optimize_auth')}
                        disabled={status === 'RUNNING'}
                        style={{
                            background: intent === 'optimize_auth' ? 'var(--bg-raised)' : 'var(--bg)',
                            border: `1px solid ${intent === 'optimize_auth' ? 'var(--border-strong)' : 'var(--border)'}`,
                            color: intent === 'optimize_auth' ? 'var(--fg)' : 'var(--fg-dim)',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: status === 'RUNNING' ? 'not-allowed' : 'pointer',
                            borderRadius: '4px',
                            transition: 'all 120ms linear'
                        }}>
                        Optimize auth middleware
                    </button>
                    <button 
                        onClick={() => executeFirewall('expose_cache')}
                        disabled={status === 'RUNNING'}
                        style={{
                            background: intent === 'expose_cache' ? 'var(--bg-raised)' : 'var(--bg)',
                            border: `1px solid ${intent === 'expose_cache' ? 'var(--border-strong)' : 'var(--border)'}`,
                            color: intent === 'expose_cache' ? 'var(--fg)' : 'var(--fg-dim)',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: status === 'RUNNING' ? 'not-allowed' : 'pointer',
                            borderRadius: '4px',
                            transition: 'all 120ms linear'
                        }}>
                        Expose auth cache to frontend
                    </button>
                </div>
            </div>

            {/* THE RUNTIME EXECUTION */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Runtime Traversal</div>
                <div style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    padding: '1rem',
                    borderRadius: '4px',
                    minHeight: '150px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--fg-muted)',
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
                        <div style={{ color: 'var(--fg-ghost)', animation: 'blink 1s step-end infinite' }}>_</div>
                    )}
                </div>
            </div>

            {/* THE BINARY RESULT */}
            <div style={{ opacity: status === 'BLOCKED' || status === 'SUCCESS' ? 1 : 0.2, transition: 'opacity 0.2s ease-in' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Governance Status</div>
                <div style={{
                    background: status === 'BLOCKED' ? 'var(--blocked-bg)' : (status === 'SUCCESS' ? 'var(--allowed-bg)' : 'var(--bg)'),
                    border: `1px solid ${status === 'BLOCKED' ? 'var(--blocked-dim)' : (status === 'SUCCESS' ? 'var(--allowed-dim)' : 'var(--border)')}`,
                    padding: '1rem',
                    textAlign: 'center',
                    color: status === 'BLOCKED' ? 'var(--blocked)' : (status === 'SUCCESS' ? 'var(--allowed)' : 'var(--fg-ghost)'),
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                }}>
                    {status === 'BLOCKED' ? 'BLOCKED: ZERO-EDGE REJECTION' : (status === 'SUCCESS' ? 'ALLOWED: SAFE TRAVERSAL' : 'AWAITING TRAVERSAL')}
                </div>
                {(status === 'BLOCKED' || status === 'SUCCESS') && (
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--fg-dim)', fontSize: '0.85rem' }}>
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

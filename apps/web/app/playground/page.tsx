"use client";

import React, { useState, useEffect } from 'react';

const RUNTIME_LOGS = [
    "> Mapping intent to node: frontend.session",
    "> Resolving ownership constraints...",
    "> Traversing allowed edges: [owns, depends_on]",
    "> Agent attempting to access: server.auth.secrets",
    "> Boundary violation detected.",
    "> Traversal terminated."
];

export default function ContextFirewallPlayground() {
    const [requestInput, setRequestInput] = useState('Refactor session persistence to optimize speed.');
    const [logs, setLogs] = useState<string[]>([]);
    const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'BLOCKED'>('IDLE');

    const executeFirewall = () => {
        setLogs([]);
        setStatus('RUNNING');
        let currentIndex = 0;
        
        const interval = setInterval(() => {
            setLogs(prev => {
                const newLogs = [...prev, RUNTIME_LOGS[currentIndex]];
                currentIndex++;
                
                if (currentIndex >= RUNTIME_LOGS.length) {
                    clearInterval(interval);
                    setTimeout(() => setStatus('BLOCKED'), 200);
                }
                return newLogs;
            });
        }, 400); // 400ms staggered delay
    };

    // Auto-run on mount for dramatic effect
    useEffect(() => {
        executeFirewall();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            color: '#ededed',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#666' }}>
                        Semantic Runtime Firewall
                    </h1>
                </header>

                {/* THE AGENT REQUEST */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Agent Request</div>
                        <button 
                            onClick={status === 'RUNNING' ? undefined : executeFirewall}
                            style={{ 
                                background: 'transparent', 
                                border: '1px solid #333', 
                                color: '#888', 
                                padding: '0.2rem 0.5rem', 
                                fontSize: '0.7rem',
                                cursor: status === 'RUNNING' ? 'not-allowed' : 'pointer'
                            }}>
                            {status === 'RUNNING' ? 'EXECUTING...' : 'RE-RUN'}
                        </button>
                    </div>
                    <textarea 
                        value={requestInput}
                        onChange={(e) => setRequestInput(e.target.value)}
                        style={{
                            width: '100%',
                            background: '#111',
                            border: '1px solid #333',
                            color: '#fff',
                            padding: '1rem',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: '0.9rem',
                            resize: 'none',
                            outline: 'none',
                            borderRadius: '2px'
                        }}
                        rows={3}
                    />
                </div>

                {/* THE RUNTIME EXECUTION */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Runtime Traversal</div>
                    <div style={{
                        background: '#0a0a0a',
                        border: '1px solid #222',
                        padding: '1rem',
                        minHeight: '180px',
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '0.9rem',
                        color: '#a1a1aa',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        {logs.map((log, i) => (
                            <div key={i} style={{ 
                                color: log.includes('violation') || log.includes('terminated') ? '#ff4444' : 
                                       log.includes('server.auth.secrets') ? '#fff' : '#a1a1aa' 
                            }}>
                                {log}
                            </div>
                        ))}
                        {status === 'RUNNING' && (
                            <div style={{ color: '#444', animation: 'blink 1s step-end infinite' }}>_</div>
                        )}
                    </div>
                </div>

                {/* THE BINARY RESULT */}
                <div style={{ opacity: status === 'BLOCKED' ? 1 : 0.2, transition: 'opacity 0.2s ease-in' }}>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Governance Status</div>
                    <div style={{
                        background: status === 'BLOCKED' ? '#220000' : '#111',
                        border: `1px solid ${status === 'BLOCKED' ? '#ff0000' : '#333'}`,
                        padding: '1.5rem',
                        textAlign: 'center',
                        color: status === 'BLOCKED' ? '#ff4444' : '#444',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        borderRadius: '2px'
                    }}>
                        {status === 'BLOCKED' ? 'BLOCKED: ZERO-EDGE REJECTION' : 'AWAITING TRAVERSAL'}
                    </div>
                    {status === 'BLOCKED' && (
                        <div style={{ textAlign: 'center', marginTop: '1rem', color: '#888', fontSize: '0.85rem' }}>
                            Traversal denied by runtime scope policy.
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
        </div>
    );
}

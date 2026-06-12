"use client";

import React, { useState } from 'react';

export default function ContextFirewallPlayground() {
    const [requestInput, setRequestInput] = useState('Refactor session persistence to optimize speed.');

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
                        Context Firewall
                    </h1>
                </header>

                {/* THE AGENT REQUEST */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Agent Request</div>
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
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '0.9rem',
                        color: '#a1a1aa'
                    }}>
                        <div>&gt; Mapping intent to node: <span style={{ color: '#fff' }}>frontend.session</span></div>
                        <div style={{ marginTop: '0.5rem' }}>&gt; Discovering edges...</div>
                        <div style={{ marginTop: '0.5rem' }}>&gt; Agent attempting to access <span style={{ color: '#fff' }}>server.auth.secrets</span></div>
                    </div>
                </div>

                {/* THE BINARY RESULT */}
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Governance Status</div>
                    <div style={{
                        background: '#220000',
                        border: '1px solid #ff0000',
                        padding: '1.5rem',
                        textAlign: 'center',
                        color: '#ff4444',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        borderRadius: '2px'
                    }}>
                        BLOCKED: ZERO-EDGE REJECTION
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: '#888', fontSize: '0.85rem' }}>
                        The frontend cannot traverse into server boundaries. Context denied.
                    </div>
                </div>

            </div>
        </div>
    );
}

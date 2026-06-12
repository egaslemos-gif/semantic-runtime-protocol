"use client";

import React, { useState } from 'react';

export default function Playground() {
    const [agentRole, setAgentRole] = useState('Claude MCP');
    const [targetQuery, setTargetQuery] = useState('system.auth.runtime');
    const [viewMode, setViewMode] = useState('REPLAY'); // Enforcing Snapshot default

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#050505',
            color: '#00ff41',
            fontFamily: '"Fira Code", monospace',
            padding: '2rem',
            boxSizing: 'border-box'
        }}>
            <header style={{
                borderBottom: '1px solid #00ff41',
                paddingBottom: '1rem',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>SRP Operational Introspection</h1>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: '0.8rem' }}>Protocol v1alpha | Snapshot Mode Active</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    
                    {/* View Mode Selector */}
                    <div style={{ display: 'flex', border: '1px solid #333', background: '#0a0a0a' }}>
                        {['LIVE', 'REPLAY', 'ADVERSARIAL'].map(mode => (
                            <button 
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                style={{
                                    background: viewMode === mode ? '#00ff41' : 'transparent',
                                    color: viewMode === mode ? '#000' : '#00ff41',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                    fontWeight: viewMode === mode ? 'bold' : 'normal',
                                    fontSize: '0.8rem'
                                }}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>

                    <span style={{ fontSize: '0.8rem', opacity: 0.8, marginLeft: '1rem' }}>Adapter:</span>
                    <select 
                        value={agentRole}
                        onChange={(e) => setAgentRole(e.target.value)}
                        style={{
                            background: '#0a0a0a',
                            color: '#00ff41',
                            border: '1px solid #00ff41',
                            padding: '0.5rem',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="Claude MCP">Claude MCP</option>
                        <option value="Cursor IDE">Cursor IDE</option>
                        <option value="CI Bot">CI Audit Bot</option>
                    </select>
                </div>
            </header>

            <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                
                {/* Control Panel */}
                <section style={{ border: '1px solid #1a1a1a', padding: '1rem', background: '#0a0a0a' }}>
                    <h2 style={{ fontSize: '1rem', borderBottom: '1px dashed #333', paddingBottom: '0.5rem', marginTop: 0 }}>
                        {viewMode === 'REPLAY' ? 'Snapshot Selector' : viewMode === 'ADVERSARIAL' ? 'Attack Vectors' : 'Live Traversal'}
                    </h2>
                    
                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>Raw Intent</label>
                        <input 
                            type="text" 
                            value={targetQuery}
                            onChange={(e) => setTargetQuery(e.target.value)}
                            disabled={viewMode !== 'LIVE'}
                            style={{
                                width: '100%',
                                background: viewMode !== 'LIVE' ? '#111' : '#000',
                                color: '#00ff41',
                                border: '1px solid #333',
                                padding: '0.8rem',
                                boxSizing: 'border-box',
                                outline: 'none',
                                opacity: viewMode !== 'LIVE' ? 0.5 : 1
                            }} 
                        />
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#ff003c' }}>[CAPABILITY GATE ENFORCED]</h3>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem', opacity: 0.8, lineHeight: '1.5' }}>
                            <li>Max Depth: {agentRole === 'Cursor IDE' ? 2 : 5}</li>
                            <li>Budget: {agentRole === 'Cursor IDE' ? 200 : 500} Nodes</li>
                            <li>Allowed Edges: {agentRole === 'CI Bot' ? '[enforces]' : '[depends_on, owns]'}</li>
                        </ul>
                    </div>
                </section>

                {/* Graph / Payload Visualizer */}
                <section style={{ border: '1px solid #1a1a1a', padding: '1rem', background: '#0a0a0a', position: 'relative' }}>
                    <h2 style={{ fontSize: '1rem', borderBottom: '1px dashed #333', paddingBottom: '0.5rem', marginTop: 0 }}>
                        {viewMode} Output
                    </h2>
                    
                    {viewMode === 'ADVERSARIAL' && (
                        <div style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            border: '1px solid #ff003c',
                            background: 'rgba(255, 0, 60, 0.1)',
                            marginBottom: '1rem'
                        }}>
                            <h4 style={{ margin: 0, color: '#ff003c', fontSize: '0.9rem' }}>[ATTACK REJECTED]</h4>
                            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#ff003c', opacity: 0.9 }}>
                                Intent Canonicalizer blocked prompt injection attempt. No inference performed.
                            </p>
                        </div>
                    )}

                    <pre style={{
                        background: '#000',
                        padding: '1rem',
                        fontSize: '0.85rem',
                        overflowX: 'auto',
                        border: '1px solid #333',
                        minHeight: '200px'
                    }}>
                        {viewMode === 'ADVERSARIAL' ? 
`{
  "error": "QUERY_REJECTED",
  "reason": "STRICT_MODE_ACTIVE"
}` 
                        : agentRole === 'Claude MCP' ? 
`[SYSTEM GOVERNANCE]
STRICT CONSTRAINTS DETECTED:
- system.auth.rules enforces infrastructure.db.encryption

[CONTEXT GRAPH]
Node: system.auth.runtime
Score: 0.98
Data: {"constraint_level":"None","status":"Active"}` 
                        : 
`/* EPHEMERAL RULEPACK: system.auth.runtime */

//@context-dependencies: [system.auth.runtime, system.auth.rules]
//@budget-consumed: 2

// WARNING: DO NOT MODIFY UNLESS COMPLIANT WITH:
// - system.auth.rules enforces infrastructure.db.encryption
`
                        }
                    </pre>

                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.7rem', opacity: 0.5 }}>
                        {viewMode === 'REPLAY' ? 'Reading Immutable Snapshot Hash' : '0ms O(1) Memory Scan'}
                    </div>
                </section>

            </main>
        </div>
    );
}

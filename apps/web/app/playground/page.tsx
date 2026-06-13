"use client";

import React from 'react';
import FirewallConsole from '../../components/FirewallConsole';

export default function ContextFirewallPlayground() {
    return (
        <div style={{
            minHeight: 'calc(100vh - var(--nav-height))',
            backgroundColor: 'var(--bg)',
            color: 'var(--fg)',
            fontFamily: 'var(--font-sans)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '640px', width: '100%' }}>
                <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                        color: 'var(--fg-dim)',
                        marginBottom: '0.5rem',
                    }}>
                        Runtime Firewall
                    </h1>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--fg-ghost)',
                    }}>
                        Deterministic traversal simulation. Select an agent intent below.
                    </p>
                </header>

                <FirewallConsole />
            </div>
        </div>
    );
}

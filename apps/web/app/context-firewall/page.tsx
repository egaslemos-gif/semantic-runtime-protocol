"use client";

import React from 'react';
import FirewallConsole from '../../components/FirewallConsole';
import RuntimeGraph from '../../components/runtime/RuntimeGraph';
import TraceCard from '../../components/runtime/TraceCard';
import { useTraversalSimulator } from '../../lib/runtime/use-traversal';

export default function ContextFirewallPlayground() {
    const simulator = useTraversalSimulator();

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
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                        color: 'var(--fg-dim)',
                        marginBottom: '0.5rem',
                    }}>
                        SRP Context Firewall
                    </h1>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--fg-ghost)',
                    }}>
                        Deterministic traversal simulation. Select an agent intent below.
                    </p>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <RuntimeGraph events={simulator.renderedEvents} status={simulator.status} />
                    <TraceCard events={simulator.renderedEvents} status={simulator.status} />
                    <FirewallConsole 
                        intent={simulator.intent}
                        renderedEvents={simulator.renderedEvents}
                        status={simulator.status}
                        executeFirewall={simulator.executeFirewall}
                    />
                </div>
            </div>
        </div>
    );
}

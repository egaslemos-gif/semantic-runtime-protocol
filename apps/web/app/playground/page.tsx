"use client";

import React from 'react';
import FirewallConsole from '../../components/FirewallConsole';

export default function ContextFirewallPlayground() {
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

                <FirewallConsole />
            </div>
        </div>
    );
}

"use client";

import React from 'react';
import FirewallConsole from '../components/FirewallConsole';

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050505',
      color: '#ededed',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '4rem 2rem',
      lineHeight: '1.6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {/* NAVIGATION */}
        <nav style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginBottom: '4rem', 
          fontSize: '0.9rem', 
          color: '#888' 
        }}>
          <a href="https://github.com/egaslemos-gif/semantic-runtime-protocol" style={{ color: '#ededed', textDecoration: 'none' }}>GitHub</a>
          <a href="https://github.com/egaslemos-gif/semantic-runtime-protocol/tree/main/specs" style={{ color: '#ededed', textDecoration: 'none' }}>Specs</a>
          <a href="https://github.com/egaslemos-gif/semantic-runtime-protocol/tree/main/examples/nextjs-auth-demo" style={{ color: '#ededed', textDecoration: 'none' }}>Examples</a>
        </nav>

        {/* HERO SECTION */}
        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '600', 
            margin: '0 0 1rem 0',
            letterSpacing: '-0.04em',
            lineHeight: '1.1'
          }}>
            AI agents break architecture under complexity pressure.
          </h1>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '400', 
            margin: '0 0 2rem 0',
            color: '#a1a1aa'
          }}>
            SRP prevents that.
          </h2>

          {/* EMBEDDED FIREWALL DEMO COMPONENT */}
          <FirewallConsole />

          {/* 3 BULLETS */}
          <ul style={{ 
            listStyleType: 'none', 
            padding: 0, 
            margin: '0 0 2rem 0',
            color: '#ededed',
            fontSize: '1.1rem'
          }}>
            <li style={{ marginBottom: '0.5rem' }}>• Protect runtime boundaries</li>
            <li style={{ marginBottom: '0.5rem' }}>• Prevent scope leakage</li>
            <li style={{ marginBottom: '0.5rem' }}>• Enforce architectural constraints</li>
          </ul>

          {/* COMMAND & RESULT */}
          <div style={{ 
            fontFamily: '"Fira Code", monospace', 
            background: '#111', 
            padding: '1.5rem', 
            borderRadius: '4px',
            border: '1px solid #222',
            color: '#a1a1aa'
          }}>
            <div style={{ color: '#fff', marginBottom: '1rem' }}>$ srp protect auth-module</div>
            <div style={{ color: '#ef4444' }}>✓ Agent blocked from traversing server.auth.secrets</div>
          </div>
        </header>

        {/* HOW IT WORKS (Minimal) */}
        <section style={{ marginBottom: '4rem', paddingTop: '2rem', borderTop: '1px solid #222' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '1rem' }}>Deterministic Context Filtering</h3>
          <p style={{ color: '#a1a1aa', fontSize: '1rem', margin: '0 0 1.5rem 0' }}>
            Traditional AI systems retrieve context broadly. SRP blocks architectural violations before the agent receives context.
          </p>
          <a href="/playground" style={{ 
              background: '#ededed', 
              color: '#000', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.9rem',
              display: 'inline-block'
            }}>
              Open the Context Firewall Console
          </a>
        </section>

      </div>
    </div>
  );
}

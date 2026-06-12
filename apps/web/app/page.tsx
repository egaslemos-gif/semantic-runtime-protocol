"use client";

import React from 'react';

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

          {/* GIF PLACEHOLDER */}
          <div style={{ 
            width: '100%', 
            height: '300px', 
            background: '#111', 
            border: '1px solid #222', 
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#444',
            marginBottom: '2rem'
          }}>
            [REAL DEMO GIF: Agent blocked from accessing server.auth.secrets]
          </div>

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
            RAG retrieves data probabilistically. The Semantic Runtime Protocol (SRP) intercepts the agent's context window 
            and physically drops traversal paths that violate your architecture. It is a strict firewall for agent context.
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
              Test the Context Firewall
          </a>
        </section>

      </div>
    </div>
  );
}

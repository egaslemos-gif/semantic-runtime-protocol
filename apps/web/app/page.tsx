"use client";

import React from 'react';
import Link from 'next/link';
import FirewallConsole from '../components/FirewallConsole';

export default function HomePage() {
  const ctaStyle = {
    display: 'inline-block',
    padding: '0.6rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--fg)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    background: 'var(--bg-surface)',
  };

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* HERO */}
      <header style={{ marginBottom: '4rem' }}>
        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          AI agents break architecture{' '}
          <span style={{ color: 'var(--fg-dim)' }}>under complexity pressure.</span>
        </h1>
        <p style={{
          fontSize: '1.35rem',
          color: 'var(--fg-muted)',
          marginBottom: '2rem',
          maxWidth: '600px',
        }}>
          SRP prevents that. Deterministic runtime boundaries for AI-assisted engineering workflows.
        </p>

        {/* FIREWALL DEMO */}
        <FirewallConsole />

        {/* VALUE PROPS */}
        <ul style={{
          listStyleType: 'none',
          padding: 0,
          margin: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
        }}>
          <li style={{ color: 'var(--fg-muted)', fontSize: '1rem' }}>
            <span style={{ color: 'var(--allowed)', marginRight: '0.5rem' }}>→</span>
            Protect runtime boundaries
          </li>
          <li style={{ color: 'var(--fg-muted)', fontSize: '1rem' }}>
            <span style={{ color: 'var(--allowed)', marginRight: '0.5rem' }}>→</span>
            Prevent scope leakage
          </li>
          <li style={{ color: 'var(--fg-muted)', fontSize: '1rem' }}>
            <span style={{ color: 'var(--allowed)', marginRight: '0.5rem' }}>→</span>
            Enforce architectural constraints
          </li>
        </ul>

        {/* CLI DEMO */}
        <h2 style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--fg-dim)',
          marginBottom: '1rem',
          marginTop: '2rem',
        }}>
          Deterministic Context Filtering
        </h2>
        <div style={{
          fontFamily: 'var(--font-mono)',
          background: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: '4px',
          border: '1px solid var(--border)',
        }}>
          <div style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>$ srp protect auth-module</div>
          <div style={{ color: 'var(--blocked)' }}>✓ Agent blocked from traversing server.auth.secrets</div>
        </div>
      </header>

      {/* SECTION NAVIGATION */}
      <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
        <h2 style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--fg-dim)',
          marginBottom: '1rem',
        }}>
          Understand SRP
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2rem' }}>
          {[
            { href: '/docs/runtime-boundaries', title: 'Runtime Boundaries', desc: 'How SRP blocks invalid traversal paths before context assembly.' },
            { href: '/failure-modes', title: 'Failure Modes', desc: 'Real-world examples of AI agents corrupting architecture under complexity pressure.' },
            { href: '/examples/nextjs-auth-boundary', title: 'Next.js Auth Boundary', desc: 'Concrete example of SRP blocking frontend traversal into server.auth.secrets.' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="section-card"
            >
              <div className="section-card-title">{item.title}</div>
              <div className="section-card-description">{item.desc}</div>
            </Link>
          ))}
        </div>

        <h2 style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--fg-dim)',
          marginBottom: '1rem',
        }}>
          Why Existing Systems Fail
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { href: '/comparisons/rag-vs-srp', title: 'RAG vs SRP', desc: 'Retrieval systems retrieve context. They do not enforce architecture.' },
            { href: '/comparisons/guardrails-vs-srp', title: 'Guardrails vs SRP', desc: 'Guardrails validate outputs. SRP restricts traversal itself.' },
            { href: '/comparisons/mcp-vs-srp', title: 'MCP vs SRP', desc: 'Model Context Protocol connects tools. SRP governs what the agent can reach.' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="section-card"
            >
              <div className="section-card-title">{item.title}</div>
              <div className="section-card-description">{item.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER CTAs */}
      <section style={{
        borderTop: '1px solid var(--border)',
        marginTop: '3rem',
        paddingTop: '2rem',
      }}>
        <h2 style={{
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          color: 'var(--fg)',
        }}>
          Explore the Runtime Boundary System
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/docs" style={ctaStyle}>Read the Docs</Link>
          <Link href="/failure-modes" style={ctaStyle}>View Failure Modes</Link>
          <Link href="/context-firewall" style={ctaStyle}>Open Context Firewall</Link>
          <a href="https://github.com/egaslemos-gif/semantic-runtime-protocol" style={ctaStyle} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </div>
      </section>
    </div>
  );
}

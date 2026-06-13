"use client";

import React from 'react';
import Link from 'next/link';
import FirewallConsole from '../components/FirewallConsole';

export default function HomePage() {
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
          margin: '1.5rem 0',
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
        <div style={{
          fontFamily: 'var(--font-mono)',
          background: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: '4px',
          border: '1px solid var(--border)',
          marginTop: '1.5rem',
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
          Explore
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { href: '/docs', title: 'Docs', desc: 'Runtime boundaries, traversal engine, context firewall, constraints.' },
            { href: '/failure-modes', title: 'Failure Modes', desc: 'Prompt drift, scope leakage, context explosion, architectural drift.' },
            { href: '/comparisons', title: 'Comparisons', desc: 'RAG vs SRP, Guardrails vs SRP, MCP vs SRP, Harnesses vs SRP.' },
            { href: '/foundations', title: 'Foundations', desc: 'Context, agents, retrieval, runtime boundaries.' },
            { href: '/playground', title: 'Playground', desc: 'Interactive runtime firewall simulation.' },
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

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        marginTop: '3rem',
        paddingTop: '1.5rem',
        display: 'flex',
        gap: '1.5rem',
        fontSize: '0.85rem',
        color: 'var(--fg-dim)',
      }}>
        <a href="https://github.com/egaslemos-gif/semantic-runtime-protocol" style={{ color: 'var(--fg-dim)' }}>
          GitHub
        </a>
        <Link href="/docs" style={{ color: 'var(--fg-dim)' }}>Docs</Link>
        <Link href="/playground" style={{ color: 'var(--fg-dim)' }}>Playground</Link>
      </footer>
    </div>
  );
}

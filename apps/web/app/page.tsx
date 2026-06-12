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

export default function LandingPage() {
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
          <a href="https://github.com/egaslemos-gif/semantic-runtime-protocol/tree/main/specs" style={{ color: '#ededed', textDecoration: 'none' }}>Docs</a>
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

          {/* EMBEDDED FIREWALL DEMO */}
          <div style={{ 
            width: '100%', 
            background: '#000', 
            border: '1px solid #222', 
            borderRadius: '4px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
              {/* THE AGENT REQUEST */}
              <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>Agent Request</div>
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
                  <div style={{
                      width: '100%',
                      background: '#111',
                      border: '1px solid #333',
                      color: '#fff',
                      padding: '0.75rem',
                      fontFamily: '"Fira Code", monospace',
                      fontSize: '0.85rem',
                      borderRadius: '2px'
                  }}>
                      {requestInput}
                  </div>
              </div>

              {/* THE RUNTIME EXECUTION */}
              <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Runtime Traversal</div>
                  <div style={{
                      background: '#0a0a0a',
                      border: '1px solid #222',
                      padding: '0.75rem',
                      minHeight: '150px',
                      fontFamily: '"Fira Code", monospace',
                      fontSize: '0.85rem',
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
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Governance Status</div>
                  <div style={{
                      background: status === 'BLOCKED' ? '#220000' : '#111',
                      border: `1px solid ${status === 'BLOCKED' ? '#ff0000' : '#333'}`,
                      padding: '1rem',
                      textAlign: 'center',
                      color: status === 'BLOCKED' ? '#ff4444' : '#444',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      borderRadius: '2px',
                      fontSize: '0.9rem'
                  }}>
                      {status === 'BLOCKED' ? 'BLOCKED: ZERO-EDGE REJECTION' : 'AWAITING TRAVERSAL'}
                  </div>
                  {status === 'BLOCKED' && (
                      <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#888', fontSize: '0.8rem' }}>
                          Traversal denied by runtime scope policy.
                      </div>
                  )}
              </div>
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
      <style dangerouslySetInnerHTML={{__html: `
          @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
          }
      `}} />
    </div>
  );
}

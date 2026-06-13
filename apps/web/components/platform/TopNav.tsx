"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SECTIONS } from '@/lib/navigation';

export default function TopNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <Link href="/" className="nav-wordmark">
          SRP
        </Link>

        <div className="nav-links">
          {SECTIONS.map((section) => (
            <Link
              key={section.key}
              href={section.href}
              className={`nav-link ${isActive(section.href) ? 'active' : ''}`}
            >
              {section.title}
            </Link>
          ))}
          <Link href="/context-firewall" className={`nav-link ${isActive('/context-firewall') ? 'active' : ''}`}>
            Context Firewall
          </Link>
          <a
            href="https://github.com/egaslemos-gif/semantic-runtime-protocol"
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

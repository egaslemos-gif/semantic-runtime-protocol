"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavSection } from '@/lib/navigation';

interface SidebarProps {
  section: NavSection;
}

export default function Sidebar({ section }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-section-title">{section.title}</div>
      {section.pages.map((page) => {
        const href = `${section.href}/${page.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={page.slug}
            href={href}
            className={`sidebar-link ${active ? 'active' : ''}`}
          >
            {page.title}
          </Link>
        );
      })}
    </aside>
  );
}

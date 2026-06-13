"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/docs';
import { getSectionByKey } from '@/lib/navigation';

export default function KnowledgeLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Extract the top-level section from the pathname (e.g., /docs/runtime-boundaries -> docs)
  const segment = pathname.split('/')[1];
  const section = getSectionByKey(segment);

  if (!section) return <>{children}</>;

  return (
    <div>
      <Sidebar section={section} />
      <div className="page-with-sidebar">
        {children}
      </div>
    </div>
  );
}

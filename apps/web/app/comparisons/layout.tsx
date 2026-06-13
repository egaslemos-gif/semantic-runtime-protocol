"use client";

import React from 'react';
import Sidebar from '@/components/platform/Sidebar';
import { getSectionByKey } from '@/lib/navigation';

export default function ComparisonsLayout({ children }: { children: React.ReactNode }) {
  const section = getSectionByKey('comparisons');
  if (!section) return <>{children}</>;

  return (
    <div>
      <Sidebar section={section} />
      <div className="page-with-sidebar">{children}</div>
    </div>
  );
}

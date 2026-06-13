"use client";

import React from 'react';
import Sidebar from '@/components/platform/Sidebar';
import { getSectionByKey } from '@/lib/navigation';

export default function FailureModesLayout({ children }: { children: React.ReactNode }) {
  const section = getSectionByKey('failure-modes');
  if (!section) return <>{children}</>;

  return (
    <div>
      <Sidebar section={section} />
      <div className="page-with-sidebar">{children}</div>
    </div>
  );
}

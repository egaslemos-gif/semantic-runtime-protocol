import React from 'react';
import { notFound } from 'next/navigation';
import { getSectionByKey } from '@/lib/navigation';
import { SectionIndex } from '@/components/docs';

export default function DocsIndex() {
  const section = getSectionByKey('docs');
  if (!section) notFound();

  return (
    <SectionIndex 
      section={section} 
      description="Runtime boundaries, traversal engine, context firewall, constraints, and specifications."
    />
  );
}

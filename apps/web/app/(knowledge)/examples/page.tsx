import React from 'react';
import { notFound } from 'next/navigation';
import { getSectionByKey } from '@/lib/navigation';
import { SectionIndex } from '@/components/docs';

export default function ExamplesIndex() {
  const section = getSectionByKey('examples');
  if (!section) notFound();

  return (
    <SectionIndex 
      section={section} 
      description="Demonstrações de contenção de falhas: como o SRP bloqueia execuções nocivas."
    />
  );
}

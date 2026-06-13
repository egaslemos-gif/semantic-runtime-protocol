import React from 'react';
import { notFound } from 'next/navigation';
import { getSectionByKey } from '@/lib/navigation';
import { SectionIndex } from '@/components/docs';

export default function FoundationsIndex() {
  const section = getSectionByKey('foundations');
  if (!section) notFound();

  return (
    <SectionIndex 
      section={section} 
      description="Conceitos fundamentais sobre agentes, contexto e limites em arquiteturas de IA."
    />
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import { getSectionByKey } from '@/lib/navigation';
import { SectionIndex } from '@/components/docs';

export default function FailureModesIndex() {
  const section = getSectionByKey('failure-modes');
  if (!section) notFound();

  return (
    <SectionIndex 
      section={section} 
      description="Análise detalhada de como agentes de IA falham na ausência de limites arquiteturais."
    />
  );
}

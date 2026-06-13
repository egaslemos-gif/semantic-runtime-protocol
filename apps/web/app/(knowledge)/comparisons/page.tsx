import React from 'react';
import { notFound } from 'next/navigation';
import { getSectionByKey } from '@/lib/navigation';
import { SectionIndex } from '@/components/docs';

export default function ComparisonsIndex() {
  const section = getSectionByKey('comparisons');
  if (!section) notFound();

  return (
    <SectionIndex 
      section={section} 
      description="Análise comparativa entre SRP e outras abordagens como RAG, Guardrails e MCP."
    />
  );
}

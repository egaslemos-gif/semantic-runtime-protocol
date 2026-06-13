import React from 'react';
import KnowledgeLayoutClient from '@/components/docs/KnowledgeLayoutClient';

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <KnowledgeLayoutClient>
      {children}
    </KnowledgeLayoutClient>
  );
}

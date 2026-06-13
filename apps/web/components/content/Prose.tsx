import React from 'react';

interface ProseProps {
  children: React.ReactNode;
}

export default function Prose({ children }: ProseProps) {
  return <div className="prose">{children}</div>;
}

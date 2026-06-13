import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'critical';
  children: React.ReactNode;
}

const LABELS: Record<string, string> = {
  info: 'Note',
  warning: 'Warning',
  critical: 'Critical',
};

export default function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-label">{LABELS[type]}</div>
      {children}
    </div>
  );
}

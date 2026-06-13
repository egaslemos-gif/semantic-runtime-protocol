import React from 'react';
import TopNav from './TopNav';

interface PlatformShellProps {
  children: React.ReactNode;
}

export default function PlatformShell({ children }: PlatformShellProps) {
  return (
    <>
      <TopNav />
      <div className="page-container">
        {children}
      </div>
    </>
  );
}

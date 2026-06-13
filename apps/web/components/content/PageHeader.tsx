import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description: string;
  section: string;
  sectionHref: string;
}

export default function PageHeader({ title, description, section, sectionHref }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-breadcrumb">
        <Link href="/">SRP</Link>
        <span>/</span>
        <Link href={sectionHref}>{section}</Link>
        <span>/</span>
        {title}
      </div>
      <h1 className="page-title">{title}</h1>
      <p className="page-description">{description}</p>
    </div>
  );
}

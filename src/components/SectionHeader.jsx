import React from 'react';

export function SectionHeader({ eyebrow, title, text, className = "" }) {
  return (
    <div className={`reveal mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="font-brand mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground sm:text-lg">{text}</p>}
    </div>
  );
}


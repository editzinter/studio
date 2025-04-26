"use client";

import React from 'react';

interface GoldHeadingProps {
  text: string;
  className?: string;
}

export default function GoldHeading({ text, className = "" }: GoldHeadingProps) {
  return (
    <div className={`relative py-4 ${className}`}>
      {/* Main text with gold gradient */}
      <h1 
        className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 relative z-10 leading-tight"
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        {text}
      </h1>
      
      {/* Bottom shadow for 3D effect */}
      <h1
        className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent absolute top-0 left-0 right-0 bottom-0 z-0 leading-tight"
        style={{
          WebkitTextStroke: '2px rgba(100, 85, 0, 0.1)',
          filter: 'blur(8px)',
          transform: 'translateY(4px)',
          opacity: 0.5,
        }}
      >
        {text}
      </h1>
      
      {/* Top highlight for 3D effect */}
      <h1
        className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent absolute top-0 left-0 right-0 bottom-0 z-0 leading-tight"
        style={{
          WebkitTextStroke: '1px rgba(255, 235, 150, 0.3)',
          filter: 'blur(1px)',
          transform: 'translateY(-1px)',
          opacity: 0.8,
        }}
      >
        {text}
      </h1>
      
      {/* Hidden text for SEO */}
      <span className="sr-only">{text}</span>
    </div>
  );
} 
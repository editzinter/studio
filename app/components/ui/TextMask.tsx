"use client";

import React, { useRef, useEffect } from 'react';

interface TextMaskProps {
  videoSrc: string;
  text: string;
  className?: string;
}

export default function TextMask({ videoSrc, text, className = "" }: TextMaskProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ensure video plays when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`relative h-auto py-4 ${className}`}
    >
      {/* Container for the text mask effect */}
      <div className="relative">
        {/* The main heading with its text masked to show the video */}
        <h1 
          className="text-4xl sm:text-6xl font-bold tracking-tight lg:text-left relative z-0 p-2 sm:p-3"
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            backgroundImage: 'linear-gradient(45deg, #fff, #f0f0f0)',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {text}
        </h1>
        
        {/* Absolute positioned video container */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            WebkitMaskImage: 'linear-gradient(45deg, #000, #000)',
            maskImage: 'linear-gradient(45deg, #000, #000)',
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            style={{ 
              filter: 'brightness(1.5) contrast(1.2) saturate(1.3)', // Brighter and more vibrant
              mixBlendMode: 'screen',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Text outline for better definition - visible in dark mode */}
        <h1 
          className="text-4xl sm:text-6xl font-bold tracking-tight lg:text-left absolute inset-0 z-0 p-2 sm:p-3"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            color: 'transparent',
            mixBlendMode: 'overlay',
            opacity: 0.5
          }}
          aria-hidden="true"
        >
          {text}
        </h1>
      </div>
      
      {/* Hidden text for screen readers */}
      <span className="sr-only">{text}</span>
    </div>
  );
} 
"use client";

import React, { useRef, useEffect, useState } from 'react';

interface VideoHeadingProps {
  videoSrc: string;
  text: string;
  className?: string;
}

export default function VideoHeading({ videoSrc, text, className = "" }: VideoHeadingProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure component is mounted and video plays
  useEffect(() => {
    setIsMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }
  }, []);

  // Loading state
  if (!isMounted) {
    return (
      <div className={`relative h-32 sm:h-40 ${className} overflow-hidden rounded-lg bg-muted flex items-center justify-center lg:justify-start`}>
        <h1 className="text-4xl px-8 sm:text-6xl font-bold tracking-tight">
          {text}
        </h1>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`relative h-32 sm:h-40 ${className} overflow-hidden rounded-lg`}
    >
      {/* First approach: Video with mask */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center lg:justify-start"
        style={{
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Ctext x='50%25' y='50%25' font-size='80px' font-weight='bold' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E")`,
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Ctext x='50%25' y='50%25' font-size='80px' font-weight='bold' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E")`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover min-w-full min-h-full"
          autoPlay
          muted
          loop
          playsInline
          style={{ 
            filter: 'brightness(1.4) contrast(1.2)', // Increased brightness
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Background element for better text definition */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-start pointer-events-none">
        <h1 
          className="text-4xl px-8 sm:text-6xl font-bold tracking-tight text-transparent opacity-10"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.15)',
          }}
        >
          {text}
        </h1>
      </div>
      
      {/* Hidden text for screen readers */}
      <span className="sr-only">{text}</span>
    </div>
  );
} 
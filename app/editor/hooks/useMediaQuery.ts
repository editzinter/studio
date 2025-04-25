"use client";

import { useState, useEffect } from 'react';

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);
  
  useEffect(() => {
    // Create a media query list to watch for changes
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial match state
    setMatches(mediaQuery.matches);
    
    // Define a handler function for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup function to remove the event listener
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  
  return matches;
} 
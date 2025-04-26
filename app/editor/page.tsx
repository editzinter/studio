"use client";

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import useMediaQuery from './hooks/useMediaQuery';

// Dynamic imports to split the code for desktop and mobile
const DesktopEditor = dynamic(() => import('./components/DesktopEditor'), {
  ssr: false,
  loading: () => <EditorLoading />
});

const MobileEditor = dynamic(() => import('./components/MobileEditor'), {
  ssr: false,
  loading: () => <EditorLoading />
});

// Loading placeholder
function EditorLoading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-muted/20">
      <div className="text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-muted-foreground">Loading editor...</p>
      </div>
    </div>
  );
}

// Separate component to use search params within Suspense boundary
function EditorContent() {
  // Import useSearchParams inside the component to avoid SSR issues
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const templateId = searchParams?.get('template');
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // We're using client-side rendering to detect the device type,
  // so we need to handle the initial loading state
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <EditorLoading />;
  }
  
  // Log the template parameter to ensure it's being correctly passed
  console.log("Template ID:", templateId);

  return (
    <>
      {isMobile ? (
        <MobileEditor initialTemplate={templateId || undefined} />
      ) : (
        <DesktopEditor initialTemplate={templateId || undefined} />
      )}
    </>
  );
}

export default function EditorPage() {
  return (
    <main className="h-full flex-1">
      <Suspense fallback={<EditorLoading />}>
        <EditorContent />
      </Suspense>
    </main>
  );
} 
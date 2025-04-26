"use client";

import "./editor.css";
import { useEffect } from "react";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use effect to hide footer element when editor layout is mounted
  useEffect(() => {
    // Hide footer when editor layout mounts
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    // Show footer again when editor layout unmounts
    return () => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return (
    <div className="editor-layout h-screen flex flex-col">
      {children}
    </div>
  );
} 
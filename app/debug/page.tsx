"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DebugPage() {
  const [info, setInfo] = useState({
    url: '',
    path: '',
    userAgent: '',
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    setInfo({
      url: window.location.href,
      path: window.location.pathname,
      userAgent: window.navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Netlify Debug Page</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Environment Information</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
          {JSON.stringify(info, null, 2)}
        </pre>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Navigation Links</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-blue-500 hover:underline">
              Home Page
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="text-blue-500 hover:underline">
              Gallery Page
            </Link>
          </li>
          <li>
            <Link href="/editor" className="text-blue-500 hover:underline">
              Editor Page
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
} 
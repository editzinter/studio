"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTemplateById, Template } from '../../lib/templates';

export default function TemplatePreviewPage({ params }: { params: { id: string } }) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the template data
    setLoading(true);
    const templateData = getTemplateById(params.id);
    
    setTimeout(() => {
      setTemplate(templateData || null);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Template Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          We could not find the template you are looking for.
        </p>
        <Link
          href="/gallery"
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{template.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{template.description}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link
              href={`/editor?template=${template.id}`}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
            >
              Edit This Template
            </Link>
            <Link
              href="/gallery"
              className="px-5 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md border border-gray-300 dark:border-gray-700"
            >
              Back to Gallery
            </Link>
          </div>
        </div>

        {/* Template Preview */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex justify-center">
          <div className="relative max-w-3xl">
            <Image
              src={template.imageUrl}
              alt={template.title}
              width={800}
              height={1120}
              className="shadow-lg rounded-lg max-h-[calc(100vh-200px)] object-contain"
            />
          </div>
        </div>

        {/* Template Info */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Template Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">{template.category}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Added</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">
                {new Date(template.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Image, Square, Circle, Type, Undo, Redo, Save, Download, Menu, Layers, Plus, ChevronUp, X, InfoIcon, Smartphone } from 'lucide-react';
import { EditorState, MenuDesign } from '../types';
import Canvas from './canvas/Canvas';
import useEditor from '../hooks/useEditor';
import Link from 'next/link';

interface MobileEditorProps {
  initialTemplate?: string;
}

export default function MobileEditor({ initialTemplate }: MobileEditorProps) {
  const { objects } = useEditor(initialTemplate);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center p-6 border rounded-lg shadow-sm bg-background">
        <Smartphone className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Mobile Editing Coming Soon</h2>
        <p className="text-muted-foreground mb-6">
          For the best editing experience, please use a desktop or laptop computer.
          The full editor is currently optimized for larger screens.
        </p>
        {objects.length > 0 && (
          <div className="mb-6 p-4 bg-muted/30 rounded-md">
            <div className="flex items-center mb-2">
              <InfoIcon className="h-4 w-4 mr-2 text-blue-500" />
              <p className="text-sm font-medium">Template Loaded</p>
            </div>
            <p className="text-sm text-muted-foreground">
              You have loaded a template with {objects.length} objects. 
              Switch to desktop view to edit.
            </p>
          </div>
        )}
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/gallery">Browse Templates</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 
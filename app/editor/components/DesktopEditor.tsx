"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Text, Image, Square, Circle, Type, Undo, Redo, Save, Download, Layout, Layers, Share2, Settings, Plus } from 'lucide-react';
import { EditorState, MenuDesign } from '../types';
import Canvas from './canvas/Canvas';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useEditor from '../hooks/useEditor';
import { getTemplateDesign } from '../services/templates';

interface DesktopEditorProps {
  initialTemplate?: string;
}

export default function DesktopEditor({ initialTemplate }: DesktopEditorProps) {
  const {
    editorState,
    objects,
    selectObject,
    clearSelection,
    addTextObject,
    addImageObject,
    addShapeObject,
    updateObject,
    deleteObject,
    undo,
    redo,
    setZoom
  } = useEditor(initialTemplate);

  // Load template data if provided
  useEffect(() => {
    if (initialTemplate) {
      const templateDesign = getTemplateDesign(initialTemplate);
      if (templateDesign && templateDesign.objects.length > 0) {
        // Set objects from template design
        templateDesign.objects.forEach(obj => {
          if (obj.type === 'text') {
            addTextObject(obj.text, obj.x, obj.y);
          } else if (obj.type === 'shape') {
            addShapeObject(obj.shapeType, obj.x, obj.y);
          } else if (obj.type === 'image') {
            addImageObject(obj.src, obj.x, obj.y);
          }
        });
      }
    }
  }, [initialTemplate, addTextObject, addImageObject, addShapeObject]);

  // Toolbar action handlers
  const handleAddText = () => {
    addTextObject();
  };

  const handleAddImage = () => {
    // For demo purposes, use a placeholder image
    addImageObject('https://via.placeholder.com/300x200');
  };

  const handleAddShape = (shapeType: 'rectangle' | 'circle' | 'line' | 'path') => {
    addShapeObject(shapeType);
  };

  const handleUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  const handleSave = () => {
    console.log('Save', objects);
    // Implement save functionality
  };

  const handleDownload = () => {
    console.log('Download');
    // Implement download functionality
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="border-b bg-background">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleUndo} disabled={editorState.history.past.length === 0}>
              <Undo className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRedo} disabled={editorState.history.future.length === 0}>
              <Redo className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="default" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main editor area */}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-muted/10 border-r">
            <Tabs defaultValue="elements" className="h-full flex flex-col">
              <TabsList className="w-full rounded-none border-b bg-background justify-start px-4 pt-2">
                <TabsTrigger value="elements" className="data-[state=active]:bg-muted">Elements</TabsTrigger>
                <TabsTrigger value="templates" className="data-[state=active]:bg-muted">Templates</TabsTrigger>
                <TabsTrigger value="uploads" className="data-[state=active]:bg-muted">Uploads</TabsTrigger>
              </TabsList>
              
              <TabsContent value="elements" className="flex-1 p-4 overflow-y-auto space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Text</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start" onClick={handleAddText}>
                      <Type className="h-4 w-4 mr-2" />
                      Add Text
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={handleAddText}>
                      <Text className="h-4 w-4 mr-2" />
                      Heading
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Shapes</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="icon" className="aspect-square" onClick={() => handleAddShape('rectangle')}>
                      <Square className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="aspect-square" onClick={() => handleAddShape('circle')}>
                      <Circle className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="aspect-square" onClick={() => handleAddShape('line')}>
                      <div className="w-5 h-0.5 bg-current"></div>
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Images</h3>
                  <Button variant="outline" className="w-full justify-start" onClick={handleAddImage}>
                    <Image className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="templates" className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-sm font-medium mb-2">Templates</h3>
                <div className="grid grid-cols-2 gap-2">
                  {/* Template placeholders */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-muted rounded-md hover:bg-muted/80 cursor-pointer">
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="uploads" className="flex-1 p-4 overflow-y-auto">
                <div className="text-center py-8">
                  <Image className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">No uploads yet</h3>
                  <p className="text-xs text-muted-foreground mt-1">Upload images to use in your design</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          
          <ResizableHandle />
          
          {/* Canvas area */}
          <ResizablePanel defaultSize={60}>
            <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
              <div className="p-4 flex justify-center items-center flex-1 overflow-auto">
                <div className="shadow-lg bg-white dark:bg-gray-800 aspect-[3/4] max-h-full">
                  {/* Canvas component with objects */}
                  <Canvas 
                    objects={objects}
                    width={800}
                    height={1200}
                    onSelectObject={selectObject}
                  />
                </div>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle />
          
          {/* Right sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-muted/10 border-l">
            <Tabs defaultValue="properties" className="h-full flex flex-col">
              <TabsList className="w-full rounded-none border-b bg-background justify-start px-4 pt-2">
                <TabsTrigger value="properties" className="data-[state=active]:bg-muted">Properties</TabsTrigger>
                <TabsTrigger value="layers" className="data-[state=active]:bg-muted">Layers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="properties" className="flex-1 p-4 overflow-y-auto">
                {editorState.selectedObjects.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-medium mb-4">Element Properties</h3>
                    <div className="space-y-4">
                      {/* Properties would be rendered based on selected object type */}
                      <div>
                        <label className="text-xs font-medium">Position</label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">X</span>
                            <input type="number" className="w-full text-xs p-1 border rounded" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Y</span>
                            <input type="number" className="w-full text-xs p-1 border rounded" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium">Size</label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Width</span>
                            <input type="number" className="w-full text-xs p-1 border rounded" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Height</span>
                            <input type="number" className="w-full text-xs p-1 border rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Settings className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">No element selected</h3>
                    <p className="text-xs text-muted-foreground mt-1">Select an element to edit its properties</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="layers" className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Layers</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Layers className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Manage Layers</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="space-y-1">
                  {objects.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-xs text-muted-foreground">No layers yet</p>
                    </div>
                  ) : (
                    // Display layers
                    objects
                      .slice()
                      .sort((a, b) => b.zIndex - a.zIndex)
                      .map(obj => (
                        <div 
                          key={obj.id} 
                          className={`p-2 text-xs flex items-center justify-between border rounded ${
                            editorState.selectedObjects.includes(obj.id) ? 'bg-muted border-primary' : 'hover:bg-muted/50'
                          } cursor-pointer`}
                          onClick={() => selectObject(obj.id)}
                        >
                          <div className="flex items-center">
                            {obj.type === 'text' ? (
                              <Text className="h-3 w-3 mr-2" />
                            ) : obj.type === 'image' ? (
                              <Image className="h-3 w-3 mr-2" />
                            ) : (
                              <Square className="h-3 w-3 mr-2" />
                            )}
                            <span className="truncate max-w-[100px]">
                              {obj.type === 'text' 
                                ? (obj as any).text.substring(0, 15) 
                                : `${obj.type}-${obj.id.substring(0, 4)}`}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Layers className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
} 
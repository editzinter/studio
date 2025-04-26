"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Image, Square, Circle, Type, Undo, Redo, Save, Download, Menu, Layers, Plus, ZoomIn, ZoomOut, X, Settings, Share2, Move, Edit3, Eye, EyeOff, Trash2, Lock, Unlock, Copy } from 'lucide-react';
import Canvas from './canvas/Canvas';
import useEditor from '../hooks/useEditor';
import Link from 'next/link';
import { Label } from "@/components/ui/label";
import ImagePickerDialog from './ImagePickerDialog';
import ImageShapeDialog from './ImageShapeDialog';
import { ImageShapeOptions } from './ImageShapePicker';
import { ImageObject } from '../types';

interface MobileEditorProps {
  initialTemplate?: string;
}

export default function MobileEditor({ initialTemplate }: MobileEditorProps) {
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
    duplicateObject,
    undo,
    redo,
    setZoom
  } = useEditor(initialTemplate);

  const [activeTab, setActiveTab] = useState<'canvas' | 'elements' | 'properties'>('canvas');
  const [zoomLevel, setZoomLevel] = useState(0.9);
  const [draggedPosition, setDraggedPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isShapeDialogOpen, setIsShapeDialogOpen] = useState(false);
  
  // Handle touch gestures
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    
    let initialDistance = 0;
    let initialZoom = zoomLevel;
    let touchStartX = 0;
    let touchStartY = 0;
    let initialPositionX = draggedPosition.x;
    let initialPositionY = draggedPosition.y;
    
    const getDistance = (touches: TouchList) => {
      return Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch to zoom gesture
        initialDistance = getDistance(e.touches);
        initialZoom = zoomLevel;
        e.preventDefault();
      } else if (e.touches.length === 1) {
        // Single touch for panning
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        initialPositionX = draggedPosition.x;
        initialPositionY = draggedPosition.y;
        setIsDragging(true);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch zoom
        const currentDistance = getDistance(e.touches);
        const scale = currentDistance / initialDistance;
        const newZoom = Math.min(Math.max(initialZoom * scale, 0.5), 3);
        setZoomLevel(newZoom);
        setZoom(newZoom);
        e.preventDefault();
      } else if (e.touches.length === 1 && isDragging) {
        // Pan
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        setDraggedPosition({
          x: initialPositionX + dx,
          y: initialPositionY + dy
        });
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    
    canvasElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvasElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvasElement.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      canvasElement.removeEventListener('touchstart', handleTouchStart);
      canvasElement.removeEventListener('touchmove', handleTouchMove);
      canvasElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [zoomLevel, draggedPosition, setZoom]);
  
  // Handlers for editor actions
  const handleAddText = () => {
    addTextObject();
    setActiveTab('canvas'); // Return to canvas view after adding
  };

  const handleAddImage = () => {
    // No longer directly adding a placeholder image
  };

  const handleAddShape = (shapeType: 'rectangle' | 'circle' | 'line' | 'path') => {
    addShapeObject(shapeType);
    setActiveTab('canvas');
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 0.1, 2.5);
    setZoomLevel(newZoom);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.1, 0.4);
    setZoomLevel(newZoom);
    setZoom(newZoom);
  };

  const handleZoomReset = () => {
    setZoomLevel(0.9);
    setZoom(0.9);
    setDraggedPosition({ x: 0, y: 0 });
  };

  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    updateObject(id, { visible: !currentVisibility });
  };

  const handleToggleLock = (id: string, currentLock: boolean) => {
    updateObject(id, { locked: !currentLock });
  };

  const handleDuplicate = (id: string) => {
    if (duplicateObject) {
      duplicateObject(id);
    } else {
      // Fallback if duplicateObject isn't available: create a basic duplication
      const objToDuplicate = objects.find(obj => obj.id === id);
      if (objToDuplicate) {
        if (objToDuplicate.type === 'text') {
          addTextObject(
            (objToDuplicate as any).text,
            objToDuplicate.x + 20,
            objToDuplicate.y + 20
          );
        } else if (objToDuplicate.type === 'shape') {
          addShapeObject(
            (objToDuplicate as any).shapeType,
            objToDuplicate.x + 20, 
            objToDuplicate.y + 20
          );
        } else if (objToDuplicate.type === 'image') {
          addImageObject(
            (objToDuplicate as any).src,
            objToDuplicate.x + 20,
            objToDuplicate.y + 20
          );
        }
      }
    }
  };

  // When an object is selected, automatically switch to properties tab
  useEffect(() => {
    if (editorState.selectedObjects.length > 0) {
      setActiveTab('properties');
    }
  }, [editorState.selectedObjects]);

  // Find the currently selected object
  const selectedObject = editorState.selectedObjects.length > 0
    ? objects.find(obj => obj.id === editorState.selectedObjects[0])
    : null;

  const handleUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  // New function to handle image selection from the picker
  const handleImageSelected = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsShapeDialogOpen(true);
  };

  // Function to handle the image shape options
  const handleApplyImageShape = (options: ImageShapeOptions) => {
    // Add the image with customized shape properties
    const newImage: Partial<ImageObject> = {
      src: options.imageUrl,
      width: options.width,
      height: options.height,
      objectFit: options.objectFit,
      // Apply shape if not original
      shapeType: options.shape !== 'original' ? options.shape : undefined
    };
    
    addImageObject(options.imageUrl, 100, 100);
    
    // If the image has just been added, get the latest object and update it
    const latestObjectId = objects.length > 0 ? objects[objects.length - 1].id : null;
    if (latestObjectId) {
      updateObject(latestObjectId, newImage);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top toolbar */}
      <div className="border-b bg-background">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <X className="h-5 w-5" />
              </Link>
            </Button>
            <div className="text-sm font-medium">Menu Editor</div>
            {selectedObject && (
              <span className="ml-1">{selectedObject.type}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={handleUndo} disabled={editorState.history.past.length === 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRedo} disabled={editorState.history.future.length === 0}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={undo}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Canvas view */}
        {activeTab === 'canvas' && (
          <div className="flex-1 relative flex flex-col">
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md" onClick={handleZoomReset}>
                <Move className="h-4 w-4" />
              </Button>
            </div>
          
            <div 
              ref={canvasRef}
              className="flex-1 flex justify-center items-center bg-gray-50 dark:bg-gray-900 overflow-hidden touch-manipulation p-4 pt-8" 
              onClick={clearSelection}
            >
              <div 
                className="w-full max-w-md aspect-[3/4] shadow-xl bg-white dark:bg-gray-800 transform-gpu"
                style={{ 
                  transform: `scale(${zoomLevel}) translate(${draggedPosition.x}px, ${draggedPosition.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                  maxHeight: '80vh'
                }}
              >
                <Canvas 
                  objects={objects}
                  width={800}
                  height={1200}
                  onSelectObject={selectObject}
                  onObjectUpdate={updateObject}
                />
              </div>
            </div>
            
            {selectedObject && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm shadow-md rounded-full px-4 py-1 flex items-center space-x-2 border">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => deleteObject(selectedObject.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleToggleLock(selectedObject.id, selectedObject.locked)}>
                  {selectedObject.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleToggleVisibility(selectedObject.id, selectedObject.visible)}>
                  {selectedObject.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleDuplicate(selectedObject.id)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setActiveTab('properties')}>
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Elements panel */}
        {activeTab === 'elements' && (
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
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
            
            <div className="h-px bg-border my-4" />
            
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
            
            <div className="h-px bg-border my-4" />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Images</h3>
              <ImagePickerDialog 
                onSelectImage={handleImageSelected} 
                title="Add Image"
              />
            </div>
            
            <div className="h-px bg-border my-4" />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Layers</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {objects.length === 0 ? (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No elements yet
                  </div>
                ) : (
                  objects
                    .slice()
                    .sort((a, b) => b.zIndex - a.zIndex)
                    .map(obj => (
                      <div 
                        key={obj.id} 
                        className={`p-2 flex items-center justify-between border rounded-md ${
                          editorState.selectedObjects.includes(obj.id) ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectObject(obj.id);
                        }}
                      >
                        <div className="flex items-center">
                          {obj.type === 'text' ? (
                            <Type className="h-4 w-4 mr-2 flex-shrink-0" />
                          ) : obj.type === 'image' ? (
                            <Image className="h-4 w-4 mr-2 flex-shrink-0" />
                          ) : (
                            <Square className="h-4 w-4 mr-2 flex-shrink-0" />
                          )}
                          <span className="text-sm truncate max-w-[100px]">
                            {obj.type === 'text' 
                              ? (obj as any).text.substring(0, 15) 
                              : `${obj.type}-${obj.id.substring(0, 4)}`}
                          </span>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleVisibility(obj.id, obj.visible);
                            }}
                          >
                            {obj.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Properties panel */}
        {activeTab === 'properties' && (
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedObject ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center">
                    <span className="mr-2">
                      {selectedObject.type.charAt(0).toUpperCase() + selectedObject.type.slice(1)}
                    </span>
                    Properties
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => handleDuplicate(selectedObject.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-destructive" 
                      onClick={() => {
                        deleteObject(selectedObject.id);
                        setActiveTab('canvas');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Visible</Label>
                      <input 
                        type="checkbox" 
                        checked={selectedObject.visible} 
                        onChange={(e) => updateObject(selectedObject.id, { visible: e.target.checked })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Locked</Label>
                      <input 
                        type="checkbox" 
                        checked={selectedObject.locked} 
                        onChange={(e) => updateObject(selectedObject.id, { locked: e.target.checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Opacity</Label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="range"
                      className="flex-1"
                      value={Math.round(selectedObject.opacity * 100)}
                      min={0}
                      max={100}
                      step={1}
                      onChange={(e) => updateObject(selectedObject.id, { opacity: parseFloat(e.target.value) / 100 })}
                    />
                    <span className="text-xs w-8 text-right">{Math.round(selectedObject.opacity * 100)}%</span>
                  </div>
                </div>
                
                <div className="h-px bg-border my-3" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">X Position</Label>
                    <input 
                      type="number" 
                      className="w-full text-xs p-2 border rounded"
                      value={Math.round(selectedObject.x)} 
                      onChange={(e) => updateObject(selectedObject.id, { x: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Y Position</Label>
                    <input 
                      type="number" 
                      className="w-full text-xs p-2 border rounded"
                      value={Math.round(selectedObject.y)}
                      onChange={(e) => updateObject(selectedObject.id, { y: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Width</Label>
                    <input 
                      type="number" 
                      className="w-full text-xs p-2 border rounded"
                      value={Math.round(selectedObject.width)}
                      onChange={(e) => updateObject(selectedObject.id, { width: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Height</Label>
                    <input 
                      type="number" 
                      className="w-full text-xs p-2 border rounded"
                      value={Math.round(selectedObject.height)}
                      onChange={(e) => updateObject(selectedObject.id, { height: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Rotation ({selectedObject.rotation}°)</Label>
                  <input 
                    type="range"
                    className="w-full"
                    value={selectedObject.rotation}
                    min={0}
                    max={360}
                    step={1}
                    onChange={(e) => updateObject(selectedObject.id, { rotation: parseFloat(e.target.value) })}
                  />
                </div>
                
                {selectedObject.type === 'text' && (
                  <>
                    <div className="h-px bg-border my-3" />
                    <div className="space-y-2">
                      <Label className="text-xs">Text Content</Label>
                      <textarea 
                        className="w-full text-xs p-2 border rounded mt-1"
                        value={(selectedObject as any).text}
                        onChange={(e) => updateObject(selectedObject.id, { text: e.target.value })}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Font Size</Label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="range"
                          className="flex-1"
                          value={(selectedObject as any).fontSize}
                          min={8}
                          max={72}
                          step={1}
                          onChange={(e) => updateObject(selectedObject.id, { fontSize: parseFloat(e.target.value) })}
                        />
                        <span className="text-xs w-8 text-right">{(selectedObject as any).fontSize}px</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Text Color</Label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          className="w-full h-8"
                          value={(selectedObject as any).color}
                          onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {selectedObject.type === 'shape' && (
                  <>
                    <div className="h-px bg-border my-3" />
                    <div className="space-y-2">
                      <Label className="text-xs">Fill Color</Label>
                      <input 
                        type="color" 
                        className="w-full h-8"
                        value={(selectedObject as any).fill}
                        onChange={(e) => updateObject(selectedObject.id, { fill: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Stroke Color</Label>
                      <input 
                        type="color" 
                        className="w-full h-8"
                        value={(selectedObject as any).stroke}
                        onChange={(e) => updateObject(selectedObject.id, { stroke: e.target.value })}
                      />
                    </div>
                    
        <div className="space-y-2">
                      <Label className="text-xs">Stroke Width</Label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="range"
                          className="flex-1"
                          value={(selectedObject as any).strokeWidth}
                          min={0}
                          max={20}
                          step={1}
                          onChange={(e) => updateObject(selectedObject.id, { strokeWidth: parseFloat(e.target.value) })}
                        />
                        <span className="text-xs w-8 text-right">{(selectedObject as any).strokeWidth}px</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Settings className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <h3 className="text-sm font-medium">No Element Selected</h3>
                <p className="text-xs text-muted-foreground mt-1">Tap an element on the canvas to edit its properties</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setActiveTab('canvas')}
                >
                  Return to Canvas
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Bottom navigation */}
      <div className="border-t bg-background p-2 z-10">
        <div className="flex justify-around">
          <Button 
            variant={activeTab === 'elements' ? 'default' : 'ghost'} 
            size="sm" 
            className="flex-1 flex flex-col h-14 space-y-1"
            onClick={() => setActiveTab('elements')}
          >
            <Plus className="h-4 w-4" />
            <span className="text-xs">Elements</span>
          </Button>
          
          <Button 
            variant={activeTab === 'canvas' ? 'default' : 'ghost'} 
            size="sm" 
            className="flex-1 flex flex-col h-14 space-y-1"
            onClick={() => setActiveTab('canvas')}
          >
            <Layers className="h-4 w-4" />
            <span className="text-xs">Canvas</span>
          </Button>
          
          <Button 
            variant={activeTab === 'properties' ? 'default' : 'ghost'} 
            size="sm" 
            className="flex-1 flex flex-col h-14 space-y-1"
            onClick={() => setActiveTab('properties')}
            disabled={!selectedObject && activeTab !== 'properties'}
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs">Properties</span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 flex flex-col h-14 space-y-1"
              >
                <Menu className="h-4 w-4" />
                <span className="text-xs">Actions</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-72">
              <div className="space-y-4 py-2">
                <h3 className="text-lg font-semibold text-center">Menu Actions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" size="sm" className="flex flex-col h-20 space-y-1">
                    <Save className="h-5 w-5" />
                    <span className="text-xs">Save</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex flex-col h-20 space-y-1">
                    <Download className="h-5 w-5" />
                    <span className="text-xs">Download</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex flex-col h-20 space-y-1">
                    <Share2 className="h-5 w-5" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/gallery">Browse Templates</Link>
                </Button>
                
                <div className="flex justify-center">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/">Exit Editor</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
} 
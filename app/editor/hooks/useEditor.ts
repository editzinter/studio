"use client";

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EditorState, MenuDesign, EditorObject, TextObject, ImageObject, ShapeObject, CanvasSize, BackgroundObject } from '../types';

export default function useEditor(initialTemplate?: string) {
  // Default canvas size
  const defaultCanvasSize: CanvasSize = {
    width: 800,
    height: 1200,
    name: 'Menu'
  };

  // Default background
  const defaultBackground: BackgroundObject = {
    id: uuidv4(),
    type: 'background',
    x: 0,
    y: 0,
    width: defaultCanvasSize.width,
    height: defaultCanvasSize.height,
    rotation: 0,
    opacity: 1,
    locked: true,
    visible: true,
    zIndex: 0,
    fill: '#ffffff'
  };

  // Initialize state with proper MenuDesign structure
  const [editorState, setEditorState] = useState<EditorState>({
    currentDesign: initialTemplate ? {
      id: initialTemplate,
      name: 'Template Design',
      canvasSize: defaultCanvasSize,
      objects: [],
      background: defaultBackground
    } : null,
    selectedObjects: [],
    zoomLevel: 1,
    history: {
      past: [],
      future: []
    }
  });

  // Track objects separately for easier manipulation
  const [objects, setObjects] = useState<(TextObject | ImageObject | ShapeObject | BackgroundObject)[]>([]);

  // Helper to create a new design state for history
  const createDesignSnapshot = useCallback((): MenuDesign => {
    if (!editorState.currentDesign) {
      // Create a new design if none exists
      return {
        id: uuidv4(),
        name: 'New Design',
        canvasSize: defaultCanvasSize,
        objects: [...objects],
        background: defaultBackground
      };
    }
    
    return {
      ...editorState.currentDesign,
      objects: [...objects]
    };
  }, [editorState.currentDesign, objects, defaultBackground, defaultCanvasSize]);

  // Helper to update history before making changes
  const recordHistory = useCallback(() => {
    const snapshot = createDesignSnapshot();
    setEditorState(prev => ({
      ...prev,
      history: {
        past: [...prev.history.past, snapshot],
        future: []
      }
    }));
  }, [createDesignSnapshot]);

  // Object selection
  const selectObject = useCallback((id: string) => {
    setEditorState(prev => ({
      ...prev,
      selectedObjects: [id]
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setEditorState(prev => ({
      ...prev,
      selectedObjects: []
    }));
  }, []);

  // Add different types of objects
  const addTextObject = useCallback((text: string = 'Text', x: number = 100, y: number = 100) => {
    recordHistory();
    const newText: TextObject = {
      id: uuidv4(),
      type: 'text',
      x,
      y,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: objects.length + 1,
      text,
      fontFamily: 'Inter',
      fontSize: 24,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textAlign: 'left',
      color: '#000000',
      lineHeight: 1.2
    };
    setObjects(prev => [...prev, newText]);
    selectObject(newText.id);
    return newText.id;
  }, [objects, recordHistory, selectObject]);

  const addImageObject = useCallback((src: string, x: number = 100, y: number = 100) => {
    recordHistory();
    const newImage: ImageObject = {
      id: uuidv4(),
      type: 'image',
      x,
      y,
      width: 300,
      height: 200,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: objects.length + 1,
      src,
      objectFit: 'contain'
    };
    setObjects(prev => [...prev, newImage]);
    selectObject(newImage.id);
    return newImage.id;
  }, [objects, recordHistory, selectObject]);

  const addShapeObject = useCallback((shapeType: 'rectangle' | 'circle' | 'line' | 'path', x: number = 100, y: number = 100) => {
    recordHistory();
    const newShape: ShapeObject = {
      id: uuidv4(),
      type: 'shape',
      x,
      y,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: objects.length + 1,
      shapeType,
      fill: '#e2e2e2',
      stroke: '#000000',
      strokeWidth: 0
    };
    setObjects(prev => [...prev, newShape]);
    selectObject(newShape.id);
    return newShape.id;
  }, [objects, recordHistory, selectObject]);

  // Update object properties
  const updateObject = useCallback((id: string, properties: Partial<TextObject | ImageObject | ShapeObject | BackgroundObject>) => {
    recordHistory();
    setObjects(prev => 
      prev.map(obj => {
        if (obj.id !== id) return obj;
        
        // Make sure we're updating with type-safe properties
        switch (obj.type) {
          case 'text':
            return { ...obj, ...properties as Partial<TextObject> } as TextObject;
          case 'image':
            return { ...obj, ...properties as Partial<ImageObject> } as ImageObject;
          case 'shape':
            return { ...obj, ...properties as Partial<ShapeObject> } as ShapeObject;
          case 'background':
            return { ...obj, ...properties as Partial<BackgroundObject> } as BackgroundObject;
          default:
            return obj;
        }
      })
    );
  }, [recordHistory]);

  // Delete objects
  const deleteObject = useCallback((id: string) => {
    recordHistory();
    setObjects(prev => prev.filter(obj => obj.id !== id));
    setEditorState(prev => ({
      ...prev,
      selectedObjects: prev.selectedObjects.filter(objId => objId !== id)
    }));
  }, [recordHistory]);

  // History actions
  const undo = useCallback(() => {
    if (editorState.history.past.length === 0) return;
    
    const newPast = [...editorState.history.past];
    const lastState = newPast.pop();
    
    if (lastState) {
      const currentSnapshot = createDesignSnapshot();
      setEditorState(prev => ({
        ...prev,
        history: {
          past: newPast,
          future: [currentSnapshot, ...prev.history.future]
        }
      }));
      setObjects(lastState.objects);
    }
  }, [editorState.history.past, createDesignSnapshot]);

  const redo = useCallback(() => {
    if (editorState.history.future.length === 0) return;
    
    const newFuture = [...editorState.history.future];
    const nextState = newFuture.shift();
    
    if (nextState) {
      const currentSnapshot = createDesignSnapshot();
      setEditorState(prev => ({
        ...prev,
        history: {
          past: [...prev.history.past, currentSnapshot],
          future: newFuture
        }
      }));
      setObjects(nextState.objects);
    }
  }, [editorState.history.future, createDesignSnapshot]);

  // Zoom controls
  const setZoom = useCallback((level: number) => {
    setEditorState(prev => ({
      ...prev,
      zoomLevel: level
    }));
  }, []);

  return {
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
  };
} 
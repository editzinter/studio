// Basic types for editor objects
export interface EditorObject {
  id: string;
  type: 'text' | 'image' | 'shape' | 'background';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  zIndex: number;
}

export interface TextObject extends EditorObject {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textAlign: 'left' | 'center' | 'right';
  color: string;
  lineHeight: number;
}

export interface ImageObject extends EditorObject {
  type: 'image';
  src: string;
  cropX?: number;
  cropY?: number;
  cropWidth?: number;
  cropHeight?: number;
  objectFit: 'cover' | 'contain' | 'fill';
}

export interface ShapeObject extends EditorObject {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'line' | 'path';
  fill: string;
  stroke: string;
  strokeWidth: number;
  points?: number[];  // For custom paths
}

export interface BackgroundObject extends EditorObject {
  type: 'background';
  fill: string;
  image?: string;
}

// Canvas and design types
export interface CanvasSize {
  width: number;
  height: number;
  name: string;  // e.g., "A4", "Letter", "Menu", etc.
}

export interface MenuDesign {
  id: string;
  name: string;
  canvasSize: CanvasSize;
  objects: (TextObject | ImageObject | ShapeObject | BackgroundObject)[];
  background: BackgroundObject;
}

// Editor state
export interface EditorState {
  currentDesign: MenuDesign | null;
  selectedObjects: string[];  // Array of object IDs
  zoomLevel: number;
  history: {
    past: MenuDesign[];
    future: MenuDesign[];
  };
}

// Template type
export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  design: MenuDesign;
} 
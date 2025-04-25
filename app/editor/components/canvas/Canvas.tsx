"use client";

import { useRef, useEffect, useState } from 'react';
import { TextObject, ImageObject, ShapeObject, EditorObject } from '../../types';

interface CanvasProps {
  objects?: EditorObject[];
  width?: number;
  height?: number;
  onSelectObject?: (id: string) => void;
}

export default function Canvas({ 
  objects = [], 
  width = 400, 
  height = 600,
  onSelectObject
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width, height });

  // Adjust canvas size on container resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        // Calculate scale to fit the canvas within the container
        const scaleX = containerWidth / width;
        const scaleY = containerHeight / height;
        const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%
        
        setScale(newScale);
        setCanvasSize({
          width: width * newScale,
          height: height * newScale
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [width, height]);

  // Render objects on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    
    // Draw white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    
    // Set scale
    ctx.save();
    ctx.scale(scale, scale);
    
    // Sort objects by z-index
    const sortedObjects = [...objects].sort((a, b) => a.zIndex - b.zIndex);
    
    // Draw each object
    sortedObjects.forEach(obj => {
      if (!obj.visible) return;
      
      ctx.save();
      ctx.globalAlpha = obj.opacity;
      
      // Apply transformation
      ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
      ctx.rotate((obj.rotation * Math.PI) / 180);
      ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
      
      // Draw based on object type
      if (obj.type === 'text') {
        drawText(ctx, obj as TextObject);
      } else if (obj.type === 'shape') {
        drawShape(ctx, obj as ShapeObject);
      }
      
      ctx.restore();
    });
    
    ctx.restore();
  }, [objects, canvasSize, scale]);

  // Handle click on canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onSelectObject) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    // Find if any object was clicked (in reverse order for proper z-index handling)
    const reversedObjects = [...objects].reverse();
    for (const obj of reversedObjects) {
      if (isPointInObject(x, y, obj)) {
        onSelectObject(obj.id);
        return;
      }
    }
  };

  // Helper function to draw text
  const drawText = (ctx: CanvasRenderingContext2D, obj: TextObject) => {
    ctx.font = `${obj.fontStyle} ${obj.fontWeight} ${obj.fontSize}px ${obj.fontFamily}`;
    ctx.fillStyle = obj.color;
    ctx.textAlign = obj.textAlign as CanvasTextAlign;
    
    const textX = obj.textAlign === 'center' 
      ? obj.x + obj.width / 2 
      : obj.textAlign === 'right' 
        ? obj.x + obj.width 
        : obj.x;
        
    // Draw text with line wrapping (simplified)
    const words = obj.text.split(' ');
    let line = '';
    let lineY = obj.y;
    
    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > obj.width && line !== '') {
        ctx.fillText(line, textX, lineY);
        line = word + ' ';
        lineY += obj.fontSize * obj.lineHeight;
      } else {
        line = testLine;
      }
    }
    
    ctx.fillText(line, textX, lineY);
  };

  // Helper function to draw shapes
  const drawShape = (ctx: CanvasRenderingContext2D, obj: ShapeObject) => {
    ctx.fillStyle = obj.fill;
    ctx.strokeStyle = obj.stroke;
    ctx.lineWidth = obj.strokeWidth;
    
    if (obj.shapeType === 'rectangle') {
      ctx.beginPath();
      ctx.rect(obj.x, obj.y, obj.width, obj.height);
      ctx.fill();
      if (obj.strokeWidth > 0) {
        ctx.stroke();
      }
    } else if (obj.shapeType === 'circle') {
      ctx.beginPath();
      const radius = Math.min(obj.width, obj.height) / 2;
      ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, radius, 0, Math.PI * 2);
      ctx.fill();
      if (obj.strokeWidth > 0) {
        ctx.stroke();
      }
    } else if (obj.shapeType === 'line') {
      ctx.beginPath();
      ctx.moveTo(obj.x, obj.y);
      ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
      ctx.stroke();
    }
  };

  // Helper function to check if point is inside object
  const isPointInObject = (x: number, y: number, obj: EditorObject) => {
    // Simple rectangle hit test - would need to be more sophisticated for rotated objects
    return x >= obj.x && 
           x <= obj.x + obj.width && 
           y >= obj.y && 
           y <= obj.y + obj.height;
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onClick={handleCanvasClick}
        className="border border-border shadow-sm"
      />
    </div>
  );
} 
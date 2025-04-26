"use client";

import { useRef, useEffect, useState } from 'react';
import { TextObject, ImageObject, ShapeObject, EditorObject } from '../../types';

interface CanvasProps {
  objects?: EditorObject[];
  width?: number;
  height?: number;
  onSelectObject?: (id: string) => void;
  onObjectUpdate?: (id: string, properties: Partial<EditorObject>) => void;
}

export default function Canvas({ 
  objects = [], 
  width = 400, 
  height = 600,
  onSelectObject,
  onObjectUpdate
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width, height });
  const [initialized, setInitialized] = useState(false);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    objectId: string | null;
    startX: number;
    startY: number;
    objectStartX: number;
    objectStartY: number;
  }>({
    isDragging: false,
    objectId: null,
    startX: 0,
    startY: 0,
    objectStartX: 0,
    objectStartY: 0
  });

  // Debug output for mobile issue diagnosis
  useEffect(() => {
    console.log("Canvas objects:", objects.length);
  }, [objects]);

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
        
        setInitialized(true);
      }
    };

    updateSize();
    
    // Add a small delay to ensure proper sizing after DOM layout
    const timeoutId = setTimeout(updateSize, 100);
    
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timeoutId);
    };
  }, [width, height]);

  // Render objects on canvas
  useEffect(() => {
    // Only try to render once the canvas is properly sized
    if (!initialized) return;
    
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
      } else if (obj.type === 'image') {
        drawImage(ctx, obj as ImageObject);
      }
      
      ctx.restore();
    });
    
    ctx.restore();
  }, [objects, canvasSize, scale, initialized]);

  // Draw image function
  const drawImage = (ctx: CanvasRenderingContext2D, obj: ImageObject) => {
    // Create a new image instance
    const img = new Image();
    img.src = obj.src;
    
    // Draw the image when loaded
    img.onload = () => {
      if (!canvasRef.current) return;
      const context = canvasRef.current.getContext('2d');
      if (!context) return;
      
      context.save();
      context.globalAlpha = obj.opacity;
      
      // Apply transformations
      context.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
      context.rotate((obj.rotation * Math.PI) / 180);
      context.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
      
      // Apply shape clipping if specified
      if (obj.shapeType) {
        context.beginPath();
        
        switch (obj.shapeType) {
          case 'circle':
            // Draw a circular clip path
            const radius = Math.min(obj.width, obj.height) / 2;
            context.arc(
              obj.x + obj.width / 2,
              obj.y + obj.height / 2,
              radius,
              0,
              Math.PI * 2
            );
            break;
            
          case 'triangle':
            // Draw a triangular clip path
            context.moveTo(obj.x + obj.width / 2, obj.y);
            context.lineTo(obj.x, obj.y + obj.height);
            context.lineTo(obj.x + obj.width, obj.y + obj.height);
            break;
            
          case 'hexagon':
            // Draw a hexagonal clip path
            const hexSize = Math.min(obj.width, obj.height) / 2;
            const hexCenterX = obj.x + obj.width / 2;
            const hexCenterY = obj.y + obj.height / 2;
            
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = hexCenterX + hexSize * Math.cos(angle);
              const y = hexCenterY + hexSize * Math.sin(angle);
              
              if (i === 0) {
                context.moveTo(x, y);
              } else {
                context.lineTo(x, y);
              }
            }
            break;
            
          case 'star':
            // Draw a star clip path
            const starOuterRadius = Math.min(obj.width, obj.height) / 2;
            const starInnerRadius = starOuterRadius / 2;
            const starCenterX = obj.x + obj.width / 2;
            const starCenterY = obj.y + obj.height / 2;
            
            for (let i = 0; i < 10; i++) {
              const angle = (i * Math.PI) / 5;
              const radius = i % 2 === 0 ? starOuterRadius : starInnerRadius;
              const x = starCenterX + radius * Math.cos(angle - Math.PI / 2);
              const y = starCenterY + radius * Math.sin(angle - Math.PI / 2);
              
              if (i === 0) {
                context.moveTo(x, y);
              } else {
                context.lineTo(x, y);
              }
            }
            break;
            
          case 'heart':
            // Draw a heart clip path
            const heartSize = Math.min(obj.width, obj.height);
            const heartCenterX = obj.x + obj.width / 2;
            const heartCenterY = obj.y + obj.height / 2 - heartSize * 0.05;
            
            // Based on a bezier curve heart shape
            context.moveTo(heartCenterX, heartCenterY + heartSize * 0.3);
            // Left curve
            context.bezierCurveTo(
              heartCenterX - heartSize * 0.5, heartCenterY, 
              heartCenterX - heartSize * 0.5, heartCenterY - heartSize * 0.3,
              heartCenterX, heartCenterY - heartSize * 0.3
            );
            // Right curve
            context.bezierCurveTo(
              heartCenterX + heartSize * 0.5, heartCenterY - heartSize * 0.3,
              heartCenterX + heartSize * 0.5, heartCenterY,
              heartCenterX, heartCenterY + heartSize * 0.3
            );
            break;
            
          default:
            // Rectangle or default case - no special clipping needed
            context.rect(obj.x, obj.y, obj.width, obj.height);
        }
        
        context.closePath();
        context.clip();
      }
      
      // Draw the image based on objectFit
      if (obj.objectFit === 'contain') {
        // Calculate aspect ratio preserving dimensions
        const imgRatio = img.width / img.height;
        const objRatio = obj.width / obj.height;
        
        let drawWidth = obj.width;
        let drawHeight = obj.height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (imgRatio > objRatio) {
          drawHeight = obj.width / imgRatio;
          offsetY = (obj.height - drawHeight) / 2;
        } else {
          drawWidth = obj.height * imgRatio;
          offsetX = (obj.width - drawWidth) / 2;
        }
        
        context.drawImage(img, obj.x + offsetX, obj.y + offsetY, drawWidth, drawHeight);
      } else {
        // Cover or fill
        context.drawImage(img, obj.x, obj.y, obj.width, obj.height);
      }
      
      context.restore();
    };
  };

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

  // Improve the text rendering function with better word wrapping and alignment
  const drawText = (ctx: CanvasRenderingContext2D, obj: TextObject) => {
    // Use a more robust font string with fallbacks
    const fontFamily = obj.fontFamily.includes(',') ? obj.fontFamily : `${obj.fontFamily}, serif, sans-serif`;
    const fontString = `${obj.fontStyle} ${obj.fontWeight} ${obj.fontSize}px ${fontFamily}`;
    ctx.font = fontString;
    ctx.fillStyle = obj.color;
    ctx.textAlign = obj.textAlign as CanvasTextAlign;
    
    // Ensure proper baseline alignment
    ctx.textBaseline = 'top';
    
    const textX = obj.textAlign === 'center' 
      ? obj.x + obj.width / 2 
      : obj.textAlign === 'right' 
        ? obj.x + obj.width 
        : obj.x;
        
    // Improved text wrapping
    const words = obj.text.split(' ');
    let line = '';
    let lineY = obj.y;
    const lineHeight = obj.fontSize * (obj.lineHeight || 1.2); // Ensure line height
    
    // Special handling for titles and headers (bigger text)
    if (obj.fontSize >= 24) {
      // For titles, ensure they're nicely centered and visible
      if (obj.textAlign === 'center') {
        ctx.fillText(obj.text, textX, lineY);
        return;
      }
    }
    
    // Normal text wrapping for smaller text or left-aligned text
    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > obj.width && line !== '') {
        ctx.fillText(line, textX, lineY);
        line = word + ' ';
        lineY += lineHeight;
      } else {
        line = testLine;
      }
    }
    
    // Draw the final line
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

  // Handle mouse/touch events for dragging
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onSelectObject) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    // Find if any object was clicked (in reverse order for proper z-index handling)
    const reversedObjects = [...objects].reverse();
    for (const obj of reversedObjects) {
      if (isPointInObject(x, y, obj)) {
        // Start dragging
        setDragState({
          isDragging: true,
          objectId: obj.id,
          startX: e.clientX,
          startY: e.clientY,
          objectStartX: obj.x,
          objectStartY: obj.y
        });
        
        onSelectObject(obj.id);
        return;
      }
    }
    
    // No object clicked, clear selection
    if (onSelectObject && typeof onSelectObject === 'function') {
      // If there's a clearSelection function available
      const clearSelection = (onSelectObject as any).clearSelection;
      if (clearSelection && typeof clearSelection === 'function') {
        clearSelection();
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragState.isDragging || !dragState.objectId) return;
    
    const dx = (e.clientX - dragState.startX) / scale;
    const dy = (e.clientY - dragState.startY) / scale;
    
    // Find the object being dragged
    const objectToUpdate = objects.find(obj => obj.id === dragState.objectId);
    if (objectToUpdate && !objectToUpdate.locked) {
      // Update object position
      // We use the onObjectUpdate callback to ensure changes are tracked properly
      if (onObjectUpdate) {
        onObjectUpdate(dragState.objectId, {
          x: dragState.objectStartX + dx,
          y: dragState.objectStartY + dy
        });
      }
    }
  };

  const handleCanvasMouseUp = () => {
    if (dragState.isDragging && dragState.objectId) {
      setDragState(prev => ({
        ...prev,
        isDragging: false
      }));
      
      // Notify parent about object position update
      if (onObjectUpdate) {
        const draggedObject = objects.find(obj => obj.id === dragState.objectId);
        if (draggedObject) {
          onObjectUpdate(dragState.objectId, {
            x: draggedObject.x,
            y: draggedObject.y
          });
        }
      }
    }
  };

  // Add touch event handlers for mobile
  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onSelectObject || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / scale;
    const y = (touch.clientY - rect.top) / scale;
    
    // Find if any object was touched
    const reversedObjects = [...objects].reverse();
    for (const obj of reversedObjects) {
      if (isPointInObject(x, y, obj)) {
        // Start dragging
        setDragState({
          isDragging: true,
          objectId: obj.id,
          startX: touch.clientX,
          startY: touch.clientY,
          objectStartX: obj.x,
          objectStartY: obj.y
        });
        
        onSelectObject(obj.id);
        return;
      }
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!dragState.isDragging || !dragState.objectId || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const dx = (touch.clientX - dragState.startX) / scale;
    const dy = (touch.clientY - dragState.startY) / scale;
    
    // Find the object being dragged
    const objectToUpdate = objects.find(obj => obj.id === dragState.objectId);
    if (objectToUpdate && !objectToUpdate.locked) {
      // Update object position
      if (onObjectUpdate) {
        onObjectUpdate(dragState.objectId, {
          x: dragState.objectStartX + dx,
          y: dragState.objectStartY + dy
        });
      }
    }
    
    // Prevent scrolling when dragging objects
    e.preventDefault();
  };

  const handleCanvasTouchEnd = () => {
    if (dragState.isDragging && dragState.objectId) {
      setDragState(prev => ({
        ...prev,
        isDragging: false
      }));
      
      // Notify parent about object position update
      if (onObjectUpdate) {
        const draggedObject = objects.find(obj => obj.id === dragState.objectId);
        if (draggedObject) {
          onObjectUpdate(dragState.objectId, {
            x: draggedObject.x,
            y: draggedObject.y
          });
        }
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        onTouchStart={handleCanvasTouchStart}
        onTouchMove={handleCanvasTouchMove}
        onTouchEnd={handleCanvasTouchEnd}
        className={`border border-border shadow-sm ${dragState.isDragging ? 'cursor-move' : 'cursor-default'}`}
      />
    </div>
  );
} 
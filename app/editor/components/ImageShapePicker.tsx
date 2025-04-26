"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Circle, 
  Square, 
  Triangle, 
  Hexagon, 
  Star, 
  Heart, 
  Image as ImageIcon
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ImageShapePickerProps {
  imageUrl: string;
  onApply: (options: ImageShapeOptions) => void;
  onCancel: () => void;
}

export interface ImageShapeOptions {
  shape: 'rectangle' | 'circle' | 'triangle' | 'hexagon' | 'star' | 'heart' | 'original';
  width: number;
  height: number;
  objectFit: 'cover' | 'contain' | 'fill';
  imageUrl: string;
}

export default function ImageShapePicker({ 
  imageUrl, 
  onApply, 
  onCancel 
}: ImageShapePickerProps) {
  const [options, setOptions] = useState<ImageShapeOptions>({
    shape: 'original',
    width: 300,
    height: 200,
    objectFit: 'contain',
    imageUrl
  });

  const handleShapeChange = (shape: ImageShapeOptions['shape']) => {
    let newOptions = { ...options, shape };
    
    // Auto-adjust dimensions based on shape
    if (shape === 'circle' || shape === 'hexagon' || shape === 'star' || shape === 'heart') {
      newOptions.width = 200;
      newOptions.height = 200;
    } else if (shape === 'triangle') {
      newOptions.width = 250;
      newOptions.height = 200;
    }
    
    setOptions(newOptions);
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: number[]) => {
    setOptions({
      ...options,
      [dimension]: value[0]
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-6">
        <div 
          className="relative"
          style={{
            width: `${options.width}px`,
            height: `${options.height}px`,
            maxWidth: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: options.objectFit === 'cover' ? 'cover' : 
                            options.objectFit === 'contain' ? 'contain' : '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: options.shape === 'circle' ? '50%' : 
                          options.shape === 'rectangle' ? '4px' : '0',
              clipPath: options.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                      options.shape === 'hexagon' ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' :
                      options.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                      options.shape === 'heart' ? 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")' :
                      'none',
            }}
          />
        </div>
      </div>

      <Tabs defaultValue="shape">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="shape">Shape</TabsTrigger>
          <TabsTrigger value="size">Size</TabsTrigger>
          <TabsTrigger value="fit">Fit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shape" className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant={options.shape === 'original' ? "default" : "outline"} 
              className="aspect-square flex flex-col items-center justify-center py-2"
              onClick={() => handleShapeChange('original')}
            >
              <ImageIcon className="h-10 w-10 mb-1" />
              <span className="text-xs">Original</span>
            </Button>
            
            <Button 
              variant={options.shape === 'rectangle' ? "default" : "outline"} 
              className="aspect-square flex flex-col items-center justify-center py-2"
              onClick={() => handleShapeChange('rectangle')}
            >
              <Square className="h-10 w-10 mb-1" />
              <span className="text-xs">Rectangle</span>
            </Button>
            
            <Button 
              variant={options.shape === 'circle' ? "default" : "outline"} 
              className="aspect-square flex flex-col items-center justify-center py-2"
              onClick={() => handleShapeChange('circle')}
            >
              <Circle className="h-10 w-10 mb-1" />
              <span className="text-xs">Circle</span>
            </Button>
            
            <Button 
              variant={options.shape === 'triangle' ? "default" : "outline"} 
              className="aspect-square flex flex-col items-center justify-center py-2"
              onClick={() => handleShapeChange('triangle')}
            >
              <Triangle className="h-10 w-10 mb-1" />
              <span className="text-xs">Triangle</span>
            </Button>
            
            <Button 
              variant={options.shape === 'hexagon' ? "default" : "outline"} 
              className="aspect-square flex flex-col items-center justify-center py-2"
              onClick={() => handleShapeChange('hexagon')}
            >
              <Hexagon className="h-10 w-10 mb-1" />
              <span className="text-xs">Hexagon</span>
            </Button>
            
            <Button 
              variant={options.shape === 'star' ? "default" : "outline"} 
              className="aspect-square flex flex-col items-center justify-center py-2"
              onClick={() => handleShapeChange('star')}
            >
              <Star className="h-10 w-10 mb-1" />
              <span className="text-xs">Star</span>
            </Button>
            
            <Button 
              variant={options.shape === 'heart' ? "default" : "outline"} 
              className="aspect-square flex flex-col items-center justify-center py-2"
              onClick={() => handleShapeChange('heart')}
            >
              <Heart className="h-10 w-10 mb-1" />
              <span className="text-xs">Heart</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="size" className="space-y-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Width: {options.width}px</Label>
              </div>
              <Slider
                defaultValue={[options.width]}
                min={50}
                max={800}
                step={10}
                value={[options.width]}
                onValueChange={(value) => handleSizeChange('width', value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Height: {options.height}px</Label>
              </div>
              <Slider
                defaultValue={[options.height]}
                min={50}
                max={800}
                step={10}
                value={[options.height]}
                onValueChange={(value) => handleSizeChange('height', value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setOptions({...options, width: 300, height: 200})}
            >
              Reset to Default
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="fit" className="space-y-4">
          <div className="space-y-4">
            <Label>Object Fit</Label>
            <Select
              value={options.objectFit}
              onValueChange={(value: 'cover' | 'contain' | 'fill') => 
                setOptions({...options, objectFit: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fit style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contain">Contain (preserve ratio)</SelectItem>
                <SelectItem value="cover">Cover (fill and crop)</SelectItem>
                <SelectItem value="fill">Fill (stretch to fit)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-sm text-muted-foreground">
              <p className="mb-1"><strong>Contain:</strong> Preserves aspect ratio, fits entire image.</p>
              <p className="mb-1"><strong>Cover:</strong> Fills the entire area, might crop image.</p>
              <p><strong>Fill:</strong> Stretches the image to fill the area.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onApply(options)}>
          Apply
        </Button>
      </div>
    </div>
  );
} 
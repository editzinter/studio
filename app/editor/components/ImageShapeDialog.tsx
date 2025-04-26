"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageShapePicker, { ImageShapeOptions } from './ImageShapePicker';

interface ImageShapeDialogProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onApply: (options: ImageShapeOptions) => void;
  title?: string;
}

export default function ImageShapeDialog({
  imageUrl,
  isOpen,
  onClose,
  onApply,
  title = "Customize Image"
}: ImageShapeDialogProps) {
  const handleApply = (options: ImageShapeOptions) => {
    onApply(options);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ImageShapePicker 
          imageUrl={imageUrl} 
          onApply={handleApply} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
} 
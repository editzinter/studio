"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image, X } from 'lucide-react';
import ImagePicker from './ImagePicker';

interface ImagePickerDialogProps {
  onSelectImage: (imageUrl: string) => void;
  trigger?: React.ReactNode;
  title?: string;
}

export default function ImagePickerDialog({
  onSelectImage,
  trigger,
  title = "Add Image"
}: ImagePickerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    onSelectImage(imageUrl);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start">
            <Image className="h-4 w-4 mr-2" />
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[80vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-4 py-2 flex flex-row justify-between items-center">
          <DialogTitle>{title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ImagePicker onSelectImage={handleImageSelect} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, Upload } from 'lucide-react';
import { getCuratedPhotos, searchPexelsPhotos, PexelsPhoto } from '../services/pexels';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface ImagePickerProps {
  onSelectImage: (imageUrl: string) => void;
}

export default function ImagePicker({ onSelectImage }: ImagePickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('curated');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load curated photos initially
  useEffect(() => {
    async function loadInitialPhotos() {
      setIsLoading(true);
      try {
        const result = await getCuratedPhotos(1, 30);
        setPhotos(result.photos);
        setHasMore(result.photos.length >= 30);
      } catch (error) {
        console.error('Error loading curated photos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialPhotos();
  }, []);

  // Handle search
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setPage(1);
    
    try {
      const result = await searchPexelsPhotos(searchQuery, 1, 30);
      setPhotos(result.photos);
      setHasMore(result.photos.length >= 30);
      setActiveTab('search');
    } catch (error) {
      console.error('Error searching photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more photos
  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    
    try {
      const result = activeTab === 'search' 
        ? await searchPexelsPhotos(searchQuery, nextPage, 30)
        : await getCuratedPhotos(nextPage, 30);
      
      setPhotos(prev => [...prev, ...result.photos]);
      setPage(nextPage);
      setHasMore(result.photos.length >= 30);
    } catch (error) {
      console.error('Error loading more photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = async (value: string) => {
    if (value === activeTab) return;
    
    setActiveTab(value);
    setIsLoading(true);
    setPage(1);
    
    try {
      if (value === 'curated') {
        const result = await getCuratedPhotos(1, 30);
        setPhotos(result.photos);
        setHasMore(result.photos.length >= 30);
      } else if (value === 'search' && searchQuery) {
        const result = await searchPexelsPhotos(searchQuery, 1, 30);
        setPhotos(result.photos);
        setHasMore(result.photos.length >= 30);
      }
    } catch (error) {
      console.error('Error changing tabs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image select
  const handleImageSelect = (photo: PexelsPhoto) => {
    onSelectImage(photo.src.medium);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search images..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
          </Button>
        </form>
      </div>
      
      <Tabs 
        defaultValue="curated" 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="flex-1 flex flex-col"
      >
        <div className="border-b px-4">
          <TabsList className="h-10">
            <TabsTrigger value="curated" className="flex-1">Curated</TabsTrigger>
            <TabsTrigger value="search" className="flex-1" disabled={!searchQuery}>
              Search Results
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex-1">Upload</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="curated" className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {isLoading && photos.length === 0 ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : photos.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map((photo) => (
                      <div 
                        key={photo.id} 
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-md hover:opacity-90 transition-opacity"
                        onClick={() => handleImageSelect(photo)}
                      >
                        <Image
                          src={photo.src.medium}
                          alt={photo.alt || 'Pexels image'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {hasMore && (
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        onClick={loadMore}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : null}
                        Load More
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No images found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="search" className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {isLoading && photos.length === 0 ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : photos.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map((photo) => (
                      <div 
                        key={photo.id} 
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-md hover:opacity-90 transition-opacity"
                        onClick={() => handleImageSelect(photo)}
                      >
                        <Image
                          src={photo.src.medium}
                          alt={photo.alt || 'Pexels image'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {hasMore && (
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        onClick={loadMore}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : null}
                        Load More
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No search results found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="upload" className="flex-1">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              <div className="mb-4 border-2 border-dashed rounded-lg p-8 border-muted-foreground/20">
                <Upload className="h-10 w-10 mb-2 text-muted-foreground mx-auto" />
                <p className="mb-2">Drag & drop an image here</p>
                <p className="text-sm text-muted-foreground mb-4">or</p>
                <Button>
                  Choose File
                </Button>
              </div>
              <Label className="text-xs text-muted-foreground">
                Supported formats: JPEG, PNG, GIF. Max size: 5MB.
              </Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-3 text-center border-t">
        <p className="text-xs text-muted-foreground">
          Images provided by <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline">Pexels</a>
        </p>
      </div>
    </div>
  );
} 
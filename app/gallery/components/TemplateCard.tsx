"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  menuItems?: MenuSection[];
}

interface TemplateCardProps {
  template: Template;
  imageAvailable?: boolean;
}

export default function TemplateCard({ template, imageAvailable = false }: TemplateCardProps) {
  // Generate a unique but consistent pattern based on template ID for placeholders
  const patternColors = {
    "template-1": "from-indigo-500 to-purple-500",
    "template-2": "from-cyan-500 to-blue-500",
    "template-3": "from-orange-500 to-red-500",
    "template-4": "from-green-500 to-teal-500",
    "template-5": "from-pink-500 to-rose-500",
    "template-6": "from-amber-500 to-yellow-500",
  };
  
  // Get template-specific gradient or fallback
  const gradientClass = patternColors[template.id as keyof typeof patternColors] || "from-slate-500 to-slate-700";
  
  // Check if this template has menu items
  const hasMenuItems = template.menuItems && template.menuItems.length > 0;
  
  return (
    <div className="group bg-background rounded-lg overflow-hidden border border-border transition-all duration-300 hover:shadow-md flex flex-col h-full">
      <div className="aspect-[3/4] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300 z-10" />
        
        <Link href={`/gallery/${template.id}`} className="absolute inset-0 z-20">
          <span className="sr-only">View {template.title}</span>
        </Link>
        
        {imageAvailable ? (
          <Image
            src={template.imageUrl}
            alt={template.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : hasMenuItems && template.menuItems ? (
          <div className="h-full w-full bg-white flex items-center justify-center p-3">
            <div className="w-full h-full border border-gray-200 rounded-sm p-4 flex flex-col">
              <div className="text-center mb-4">
                <h4 className="text-lg font-serif">{template.title}</h4>
                <div className="w-8 h-0.5 bg-black mx-auto mt-1"></div>
              </div>
              
              {/* Show just the first section as a preview */}
              {template.menuItems[0] && (
                <div>
                  <h5 className="text-sm font-medium text-center mb-2">{template.menuItems[0].section}</h5>
                  <div className="space-y-2">
                    {template.menuItems[0].items.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex justify-between text-xs border-b border-gray-100 pb-1">
                        <span className="font-medium">{item.name}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                    {template.menuItems[0].items.length > 2 && (
                      <div className="text-xs text-center text-gray-400 mt-1">
                        + more items
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            {/* Menu template placeholder design */}
            <div className="w-3/4 h-3/4 border-2 border-white/20 rounded-md flex flex-col items-center justify-center p-4">
              <div className="w-1/2 h-2 bg-white/40 rounded-full mb-4"></div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-3/4 h-1 bg-white/30 rounded-full mb-2"></div>
              ))}
              <div className="w-1/3 h-6 bg-white/40 rounded-md mt-4"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg">{template.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{template.description}</p>
        
        <div className="mt-4 flex justify-between items-center mt-auto">
          <span className="text-xs px-2 py-1 bg-muted rounded-full">{template.category}</span>
          <Button asChild variant="ghost" size="sm" className="gap-1 relative z-10">
            <Link href={`/gallery/${template.id}`}>
              View
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Download, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  menuItems?: {
    section: string;
    items: {
      name: string;
      description: string;
      price: string;
    }[];
  }[];
}

// Sample template data (to be replaced with actual data fetching)
const templates: Template[] = [
  {
    id: "template-1",
    title: "Classic Bistro",
    description: "A clean, elegant menu for upscale restaurants",
    category: "Fine Dining",
    imageUrl: "/templates/classic-bistro.jpg",
    menuItems: [
      {
        section: "Appetizers",
        items: [
          {
            name: "Truffle Arancini",
            description: "Crispy risotto balls with black truffle and parmesan",
            price: "$14"
          },
          {
            name: "Beef Carpaccio",
            description: "Thinly sliced raw beef with capers and arugula",
            price: "$16"
          },
          {
            name: "French Onion Soup",
            description: "Rich beef broth with caramelized onions and gruyère",
            price: "$12"
          }
        ]
      },
      {
        section: "Main Courses",
        items: [
          {
            name: "Filet Mignon",
            description: "8oz grass-fed beef with red wine reduction",
            price: "$38"
          },
          {
            name: "Seared Scallops",
            description: "Wild-caught scallops with cauliflower purée",
            price: "$34"
          },
          {
            name: "Duck Confit",
            description: "Crispy duck leg with cherry gastrique",
            price: "$36"
          }
        ]
      },
      {
        section: "Desserts",
        items: [
          {
            name: "Crème Brûlée",
            description: "Classic vanilla custard with caramelized sugar",
            price: "$10"
          },
          {
            name: "Chocolate Soufflé",
            description: "Warm chocolate soufflé with vanilla ice cream",
            price: "$12"
          }
        ]
      }
    ]
  },
  {
    id: "template-2",
    title: "Modern Cafe",
    description: "Contemporary design for casual dining spots",
    category: "Cafe",
    imageUrl: "/templates/modern-cafe.jpg"
  },
  {
    id: "template-3",
    title: "Street Food",
    description: "Bold and vibrant menu for food trucks and casual eateries",
    category: "Casual",
    imageUrl: "/templates/street-food.jpg"
  },
  {
    id: "template-4",
    title: "Italian Trattoria",
    description: "Rustic design for authentic Italian restaurants",
    category: "Italian",
    imageUrl: "/templates/italian-trattoria.jpg"
  },
  {
    id: "template-5", 
    title: "Asian Fusion",
    description: "Sleek and modern design for contemporary Asian restaurants",
    category: "Asian",
    imageUrl: "/templates/asian-fusion.jpg"
  },
  {
    id: "template-6",
    title: "Cocktail Bar",
    description: "Sophisticated menu for bars and lounges",
    category: "Bar",
    imageUrl: "/templates/cocktail-bar.jpg"
  },
];

// Helper function to find template by ID
const getTemplateById = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};

// Gradient patterns mapping
const patternColors = {
  "template-1": "from-indigo-500 to-purple-500",
  "template-2": "from-cyan-500 to-blue-500",
  "template-3": "from-orange-500 to-red-500",
  "template-4": "from-green-500 to-teal-500",
  "template-5": "from-pink-500 to-rose-500",
  "template-6": "from-amber-500 to-yellow-500",
};

export default function TemplateDetailsPage({ params }: { params: { id: string } }) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the template data
    setLoading(true);
    
    setTimeout(() => {
      const foundTemplate = getTemplateById(params.id);
      setTemplate(foundTemplate || null);
      setLoading(false);
    }, 500); // Simulate network delay
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
            </div>
            
            <div className="w-full md:w-1/3">
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-6" />
              
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The template you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/gallery">
            <Button>Back to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get template-specific gradient or fallback
  const gradientClass = patternColors[template.id as keyof typeof patternColors] || "from-slate-500 to-slate-700";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Back button and template info */}
        <div className="mb-8">
          <Link href="/gallery" className="inline-block">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Gallery
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold">{template.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{template.description}</p>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Template preview */}
          <div className="w-full md:w-2/3 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
            {template.menuItems ? (
              <div className="bg-white p-8 w-full h-full aspect-[3/4] overflow-auto">
                <div className="border-2 border-gray-200 p-10 h-full rounded-sm flex flex-col">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-serif mb-2">{template.title}</h2>
                    <div className="w-16 h-1 bg-black mx-auto"></div>
                  </div>
                  
                  {template.menuItems.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h3 className="text-xl font-serif mb-4 text-center">{section.section}</h3>
                      <div className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between pb-2 border-b border-gray-100">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <div className="ml-4 font-medium">{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`relative aspect-[3/4] w-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                {/* Menu template placeholder design */}
                <div className="w-2/3 h-3/4 border-4 border-white/20 rounded-md flex flex-col items-center justify-center p-8">
                  <div className="w-1/2 h-4 bg-white/40 rounded-full mb-8"></div>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-4/5 h-2 bg-white/30 rounded-full mb-3"></div>
                  ))}
                  <div className="w-1/3 h-10 bg-white/40 rounded-md mt-6"></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Actions sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="space-y-4">
              <Link href={`/editor?template=${template.id}`} className="block w-full">
                <Button className="w-full" size="lg">
                  <Edit className="h-4 w-4 mr-2" />
                  Customize This Template
                </Button>
              </Link>
              
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium mb-2">Template Information</h3>
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="text-muted-foreground w-24">Category:</dt>
                  <dd>{template.category}</dd>
                </div>
                <div className="flex">
                  <dt className="text-muted-foreground w-24">ID:</dt>
                  <dd className="font-mono text-sm">{template.id}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
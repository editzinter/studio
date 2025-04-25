"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import TemplateCard from "./components/TemplateCard";

// Sample template data (to be replaced with actual data later)
const templates = [
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

const categories = ["All", "Fine Dining", "Cafe", "Casual", "Italian", "Asian", "Bar"];

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Menu Templates Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of professionally designed menu templates for your restaurant or cafe.
            Customize any template to match your brand.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Gallery Grid - Responsive with different columns based on screen size */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium">No templates found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
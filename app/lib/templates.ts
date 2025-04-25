export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

// Sample template data
const templates: Template[] = [
  {
    id: "template-1",
    title: "Classic Bistro",
    description: "A clean, elegant menu for upscale restaurants",
    category: "Fine Dining",
    imageUrl: "/templates/classic-bistro.jpg",
    createdAt: "2023-10-15"
  },
  {
    id: "template-2",
    title: "Modern Cafe",
    description: "Contemporary design for casual dining spots",
    category: "Cafe",
    imageUrl: "/templates/modern-cafe.jpg",
    createdAt: "2023-10-20"
  },
  {
    id: "template-3",
    title: "Street Food",
    description: "Bold and vibrant menu for food trucks and casual eateries",
    category: "Casual",
    imageUrl: "/templates/street-food.jpg",
    createdAt: "2023-11-05"
  },
  {
    id: "template-4",
    title: "Italian Trattoria",
    description: "Rustic design for authentic Italian restaurants",
    category: "Italian",
    imageUrl: "/templates/italian-trattoria.jpg",
    createdAt: "2023-11-15"
  },
  {
    id: "template-5", 
    title: "Asian Fusion",
    description: "Sleek and modern design for contemporary Asian restaurants",
    category: "Asian",
    imageUrl: "/templates/asian-fusion.jpg",
    createdAt: "2023-12-01"
  },
  {
    id: "template-6",
    title: "Cocktail Bar",
    description: "Sophisticated menu for bars and lounges",
    category: "Bar",
    imageUrl: "/templates/cocktail-bar.jpg",
    createdAt: "2023-12-15"
  },
];

export function getAllTemplates(): Template[] {
  return templates;
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  if (category === 'All') {
    return templates;
  }
  return templates.filter(template => template.category === category);
} 
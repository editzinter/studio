import { MenuDesign, TextObject, ImageObject, ShapeObject, BackgroundObject } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Template data
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
  }
];

/**
 * Converts a template into editor objects
 */
export const getTemplateDesign = (templateId: string): MenuDesign | null => {
  const template = templates.find(t => t.id === templateId);
  if (!template) return null;
  
  // Default canvas size
  const canvasSize = {
    width: 800,
    height: 1200,
    name: 'Menu'
  };
  
  // Create background
  const background: BackgroundObject = {
    id: uuidv4(),
    type: 'background',
    x: 0,
    y: 0,
    width: canvasSize.width,
    height: canvasSize.height,
    rotation: 0,
    opacity: 1,
    locked: true,
    visible: true,
    zIndex: 0,
    fill: '#ffffff'
  };
  
  const objects: (TextObject | ImageObject | ShapeObject | BackgroundObject)[] = [];
  
  // Add title
  const titleObject: TextObject = {
    id: uuidv4(),
    type: 'text',
    x: canvasSize.width / 2 - 150,
    y: 80,
    width: 300,
    height: 60,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    zIndex: 1,
    text: template.title,
    fontFamily: 'Playfair Display, serif',
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#000000',
    lineHeight: 1.2
  };
  
  objects.push(titleObject);
  
  // Add divider
  const divider: ShapeObject = {
    id: uuidv4(),
    type: 'shape',
    x: canvasSize.width / 2 - 50,
    y: 150,
    width: 100,
    height: 2,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    zIndex: 2,
    shapeType: 'rectangle',
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 0
  };
  
  objects.push(divider);
  
  // If there are menu items, add them to the design
  if (template.menuItems) {
    let yPosition = 200;
    
    template.menuItems.forEach((section, sectionIndex) => {
      // Add section header
      const sectionHeader: TextObject = {
        id: uuidv4(),
        type: 'text',
        x: canvasSize.width / 2 - 100,
        y: yPosition,
        width: 200,
        height: 40,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        zIndex: 3 + sectionIndex,
        text: section.section,
        fontFamily: 'Playfair Display, serif',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#000000',
        lineHeight: 1.2
      };
      
      objects.push(sectionHeader);
      yPosition += 60;
      
      // Add menu items
      section.items.forEach((item, itemIndex) => {
        // Item name
        const itemName: TextObject = {
          id: uuidv4(),
          type: 'text',
          x: 100,
          y: yPosition,
          width: 300,
          height: 30,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          zIndex: 10 + sectionIndex * 10 + itemIndex,
          text: item.name,
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          fontWeight: 'medium',
          fontStyle: 'normal',
          textAlign: 'left',
          color: '#000000',
          lineHeight: 1.2
        };
        
        objects.push(itemName);
        
        // Item price
        const itemPrice: TextObject = {
          id: uuidv4(),
          type: 'text',
          x: canvasSize.width - 150,
          y: yPosition,
          width: 100,
          height: 30,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          zIndex: 10 + sectionIndex * 10 + itemIndex,
          text: item.price,
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          fontWeight: 'medium',
          fontStyle: 'normal',
          textAlign: 'right',
          color: '#000000',
          lineHeight: 1.2
        };
        
        objects.push(itemPrice);
        
        // Item description
        const itemDescription: TextObject = {
          id: uuidv4(),
          type: 'text',
          x: 100,
          y: yPosition + 30,
          width: 500,
          height: 30,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          zIndex: 10 + sectionIndex * 10 + itemIndex,
          text: item.description,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textAlign: 'left',
          color: '#666666',
          lineHeight: 1.2
        };
        
        objects.push(itemDescription);
        
        yPosition += 80;
      });
      
      // Add spacing between sections
      yPosition += 40;
    });
  }
  
  return {
    id: template.id,
    name: template.title,
    canvasSize,
    objects,
    background
  };
}; 
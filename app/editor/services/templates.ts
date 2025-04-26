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
  },
  {
    id: "template-3",
    title: "Sweet Delights",
    description: "Elegant dessert menu with watercolor aesthetic",
    category: "Desserts",
    imageUrl: "/templates/dessert-menu.jpg",
    menuItems: [
      {
        section: "CAKES",
        items: [
          {
            name: "Red velvet cake",
            description: "Classic red velvet with cream cheese frosting",
            price: "$8.95"
          },
          {
            name: "Chocolate lava cake",
            description: "Warm cake with molten chocolate center",
            price: "$9.95"
          },
          {
            name: "Carrot cake",
            description: "Spiced carrot cake with cream cheese frosting",
            price: "$8.95"
          },
          {
            name: "Lemon drizzle cake",
            description: "Light sponge cake with lemon glaze",
            price: "$7.95"
          }
        ]
      },
      {
        section: "ICE CREAM",
        items: [
          {
            name: "Cookies and cream",
            description: "Vanilla ice cream with cookie pieces",
            price: "$6.95"
          },
          {
            name: "Mint chocolate chip",
            description: "Fresh mint ice cream with chocolate chips",
            price: "$6.95"
          },
          {
            name: "Strawberry cheesecake",
            description: "Strawberry ice cream with cheesecake chunks",
            price: "$7.95"
          },
          {
            name: "Rocky road",
            description: "Chocolate ice cream with marshmallows and nuts",
            price: "$7.95"
          }
        ]
      },
      {
        section: "COOKIES",
        items: [
          {
            name: "Oatmeal raisin cookies",
            description: "Chewy oatmeal cookies with raisins",
            price: "$3.95"
          },
          {
            name: "Peanut butter cookies",
            description: "Soft peanut butter cookies with criss-cross pattern",
            price: "$3.95"
          },
          {
            name: "Snickerdoodle cookies",
            description: "Soft cookies coated in cinnamon sugar",
            price: "$3.95"
          },
          {
            name: "Macadamia nut cookies",
            description: "White chocolate cookies with macadamia nuts",
            price: "$4.95"
          }
        ]
      }
    ]
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
    fill: template.id === 'template-3' ? '#FFF6F7' : '#ffffff'  // Pink background for dessert menu
  };
  
  const objects: (TextObject | ImageObject | ShapeObject | BackgroundObject)[] = [];
  
  // For the dessert menu template, use a special layout
  if (template.id === 'template-3') {
    // Create watercolor decoration circles
    const decorCircle1: ShapeObject = {
      id: uuidv4(),
      type: 'shape',
      x: 50,
      y: 100,
      width: 200,
      height: 200,
      rotation: 0,
      opacity: 0.3,
      locked: false,
      visible: true,
      zIndex: 1,
      shapeType: 'circle',
      fill: '#FFCAD4',
      stroke: '#FFCAD4',
      strokeWidth: 0
    };
    
    const decorCircle2: ShapeObject = {
      id: uuidv4(),
      type: 'shape',
      x: 550,
      y: 100,
      width: 180,
      height: 180,
      rotation: 0,
      opacity: 0.25,
      locked: false,
      visible: true,
      zIndex: 1,
      shapeType: 'circle',
      fill: '#FFCAD4',
      stroke: '#FFCAD4',
      strokeWidth: 0
    };
    
    const decorCircle3: ShapeObject = {
      id: uuidv4(),
      type: 'shape',
      x: 620,
      y: 950,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 0.2,
      locked: false,
      visible: true,
      zIndex: 1,
      shapeType: 'circle',
      fill: '#FFCAD4',
      stroke: '#FFCAD4',
      strokeWidth: 0
    };
    
    objects.push(decorCircle1, decorCircle2, decorCircle3);
    
    // Add company name
    const companyName: TextObject = {
      id: uuidv4(),
      type: 'text',
      x: 250,
      y: 80,
      width: 300,
      height: 40,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: 10,
      text: "SALFORD & CO.",
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 18,
      fontWeight: 'bold',
      fontStyle: 'normal',
      textAlign: 'center',
      color: '#4A2222',
      lineHeight: 1.2
    };
    
    objects.push(companyName);
    
    // Add title
    const titleObject: TextObject = {
      id: uuidv4(),
      type: 'text',
      x: 250,
      y: 130,
      width: 300,
      height: 60,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: 10,
      text: "Dessert",
      fontFamily: 'Playfair Display, serif',
      fontSize: 72,
      fontWeight: 'normal',
      fontStyle: 'italic',
      textAlign: 'center',
      color: '#4A2222',
      lineHeight: 1.2
    };
    
    objects.push(titleObject);
    
    // Add "MENU" text
    const menuText: TextObject = {
      id: uuidv4(),
      type: 'text',
      x: 250,
      y: 220,
      width: 300,
      height: 40,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: 10,
      text: "MENU",
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 28,
      fontWeight: 'bold',
      fontStyle: 'normal',
      textAlign: 'center',
      color: '#4A2222',
      lineHeight: 1.2
    };
    
    objects.push(menuText);
    
    // Special positioning for dessert menu
    if (template.menuItems) {
      let yPosition = 300;
      
      template.menuItems.forEach((section, sectionIndex) => {
        // Add section header with underline
        const sectionHeader: TextObject = {
          id: uuidv4(),
          type: 'text',
          x: 120,
          y: yPosition,
          width: 560,
          height: 40,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          zIndex: 3 + sectionIndex,
          text: section.section,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 24,
          fontWeight: 'bold',
          fontStyle: 'normal',
          textAlign: 'left',
          color: '#D48A9D',
          lineHeight: 1.2
        };
        
        objects.push(sectionHeader);
        
        // Add underline for section
        const sectionDivider: ShapeObject = {
          id: uuidv4(),
          type: 'shape',
          x: 120,
          y: yPosition + 45,
          width: 560,
          height: 1,
          rotation: 0,
          opacity: 0.7,
          locked: false,
          visible: true,
          zIndex: 3 + sectionIndex,
          shapeType: 'rectangle',
          fill: '#D48A9D',
          stroke: '#D48A9D',
          strokeWidth: 0
        };
        
        objects.push(sectionDivider);
        yPosition += 70;
        
        // Add menu items with dessert-specific layout
        section.items.forEach((item, itemIndex) => {
          // Item name
          const itemName: TextObject = {
            id: uuidv4(),
            type: 'text',
            x: 120,
            y: yPosition,
            width: 400,
            height: 30,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
            zIndex: 10 + sectionIndex * 10 + itemIndex,
            text: item.name,
            fontFamily: 'Playfair Display, serif',
            fontSize: 18,
            fontWeight: 'medium',
            fontStyle: 'normal',
            textAlign: 'left',
            color: '#4A2222',
            lineHeight: 1.2
          };
          
          objects.push(itemName);
          
          // Item price for dessert menu (right aligned)
          const itemPrice: TextObject = {
            id: uuidv4(),
            type: 'text',
            x: 530,
            y: yPosition,
            width: 150,
            height: 30,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
            zIndex: 10 + sectionIndex * 10 + itemIndex,
            text: item.price,
            fontFamily: 'Playfair Display, serif',
            fontSize: 18,
            fontWeight: 'bold',
            fontStyle: 'normal',
            textAlign: 'right',
            color: '#4A2222',
            lineHeight: 1.2
          };
          
          objects.push(itemPrice);
          
          // Item description for dessert menu
          const itemDescription: TextObject = {
            id: uuidv4(),
            type: 'text',
            x: 120,
            y: yPosition + 30,
            width: 400,
            height: 30,
            rotation: 0,
            opacity: 0.8,
            locked: false,
            visible: true,
            zIndex: 10 + sectionIndex * 10 + itemIndex,
            text: item.description,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 14,
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'left',
            color: '#666666',
            lineHeight: 1.2
          };
          
          objects.push(itemDescription);
          
          // Increase vertical spacing for dessert menu
          yPosition += 65;
        });
        
        // Add more spacing between sections for dessert menu
        yPosition += 35;
      });
      
      // Add footer info
      const footerInfo: TextObject = {
        id: uuidv4(),
        type: 'text',
        x: 120,
        y: 1120,
        width: 560,
        height: 20,
        rotation: 0,
        opacity: 0.7,
        locked: false,
        visible: true,
        zIndex: 20,
        text: "123 Anywhere St., Any City",
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#4A2222',
        lineHeight: 1.2
      };
      
      objects.push(footerInfo);
      
      // Add website
      const websiteInfo: TextObject = {
        id: uuidv4(),
        type: 'text',
        x: 120,
        y: 1120,
        width: 560,
        height: 20,
        rotation: 0,
        opacity: 0.7,
        locked: false,
        visible: true,
        zIndex: 20,
        text: "www.reallygreatsite.com",
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'right',
        color: '#4A2222',
        lineHeight: 1.2
      };
      
      objects.push(websiteInfo);
    }
    
    return {
      id: templateId,
      name: template.title,
      canvasSize,
      objects,
      background
    };
  }
  
  // Original template processing for other templates
  
  // Add title with improved positioning
  const titleObject: TextObject = {
    id: uuidv4(),
    type: 'text',
    x: 200,
    y: 80,
    width: 400,
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
    x: 350,
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
  
  // If there are menu items, add them to the design with improved layout
  if (template.menuItems) {
    let yPosition = 200;
    
    template.menuItems.forEach((section, sectionIndex) => {
      // Add section header
      const sectionHeader: TextObject = {
        id: uuidv4(),
        type: 'text',
        x: 250, 
        y: yPosition,
        width: 300,
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
      
      // Add menu items with clearer layout
      section.items.forEach((item, itemIndex) => {
        // Item name
        const itemName: TextObject = {
          id: uuidv4(),
          type: 'text',
          x: 120,
          y: yPosition,
          width: 250,
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
        
        // Item description with improved width and positioning
        const itemDescription: TextObject = {
          id: uuidv4(),
          type: 'text',
          x: 120,
          y: yPosition + 30,
          width: 450,
          height: 30,
          rotation: 0,
          opacity: 0.8,
          locked: false,
          visible: true,
          zIndex: 10 + sectionIndex * 10 + itemIndex,
          text: item.description,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textAlign: 'left',
          color: '#555555',
          lineHeight: 1.2
        };
        
        objects.push(itemDescription);
        
        // Item price with consistent positioning
        const itemPrice: TextObject = {
          id: uuidv4(),
          type: 'text',
          x: 630,
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
        
        // Increase vertical spacing
        yPosition += 70;
      });
      
      // Add more spacing between sections
      yPosition += 30;
    });
  }
  
  return {
    id: templateId,
    name: template.title,
    canvasSize,
    objects,
    background
  };
}; 
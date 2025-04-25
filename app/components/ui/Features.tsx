import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutTemplate, 
  Paintbrush, 
  Smartphone, 
  Image as ImageIcon, 
  Download, 
  BadgeDollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Features() {
  const features = [
    {
      name: 'Pre-made Templates',
      description:
        'Choose from our collection of beautifully designed menu templates to get started quickly.',
      icon: <LayoutTemplate className="h-5 w-5" />,
      color: 'bg-blue-500/90',
    },
    {
      name: 'Powerful Editor',
      description:
        'Our intuitive editor lets you customize everything from colors to fonts to layout.',
      icon: <Paintbrush className="h-5 w-5" />,
      color: 'bg-amber-500/90',
    },
    {
      name: 'Mobile Optimized',
      description:
        'Edit your menu cards on any device with our responsive design that works on desktop and mobile.',
      icon: <Smartphone className="h-5 w-5" />,
      color: 'bg-green-500/90',
    },
    {
      name: 'Customizable Designs',
      description:
        'Add your own images, change colors, adjust layouts, and make your menu uniquely yours.',
      icon: <ImageIcon className="h-5 w-5" />,
      color: 'bg-purple-500/90',
    },
    {
      name: 'Easy Export',
      description:
        'Download your finished menu designs as high-quality printable files or share them digitally.',
      icon: <Download className="h-5 w-5" />,
      color: 'bg-red-500/90',
    },
    {
      name: 'Free to Use',
      description:
        'Get started today at no cost. Create and customize your first menu card without any fees.',
      icon: <BadgeDollarSign className="h-5 w-5" />,
      color: 'bg-teal-500/90',
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fadeIn">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">
            Powerful Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to create perfect menus
          </h2>
          <Separator className="my-6 max-w-[100px] mx-auto" />
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg mx-auto">
            STUDIO EDIT makes it easy to design professional-looking menus for any occasion in minutes.
          </p>
        </div>

        <div className="mt-16 animate-fadeIn">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={feature.name}
                className="animate-fadeIn"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <Card className="h-full border border-muted hover:border-primary/20 transition-colors duration-300 bg-card/50 backdrop-blur-sm group hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${feature.color} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-medium">{feature.name}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
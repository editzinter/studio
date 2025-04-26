import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowRight, Sparkles, Zap, Star, InfoIcon } from "lucide-react";

export default function CTA() {
  return (
    <div className="relative overflow-hidden border-t">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-1/3 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white dark:bg-black shadow-xl shadow-primary/10 ring-1 ring-primary/5 dark:ring-primary/20" />
        
        <div className="absolute left-1/2 top-0 h-[180%] w-[300px] -translate-x-1/2 bg-gradient-to-b from-primary/20 to-transparent opacity-20 blur-3xl" />
        
        <svg
          className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform opacity-20 sm:left-1/2 sm:translate-y-0 sm:translate-x-0 md:translate-x-1/4 lg:translate-x-1/2"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-primary/30" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#pattern-circles)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between animate-fadeIn">
          <div className="max-w-xl relative">
            <div 
              className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" 
              aria-hidden="true"
            />
            <span className="inline-flex items-center px-3 py-1 text-sm rounded-full border bg-background shadow-sm backdrop-blur-sm mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-primary" />
              Create Your Own Design
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl relative">
              <span className="block text-foreground">Ready to create your menu?</span>
              <span className="block text-primary mt-1">Get started today for free.</span>
            </h2>
            <Separator className="my-6 max-w-[100px] hidden lg:block" />
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of restaurants, cafes, and event planners who use our platform to create beautiful, professional menus in minutes.
            </p>
            
            <div className="flex gap-2 mt-6">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs font-normal bg-background/80 shadow-sm backdrop-blur-sm">
                    <Star className="h-3 w-3 text-amber-500" />
                    Loved by 1,000+ businesses
                    <InfoIcon className="h-3 w-3 ml-1 text-muted-foreground" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Customer testimonials</h4>
                    <div className="space-y-2">
                      <Card className="bg-muted/40">
                        <CardContent className="p-3 text-xs">
                          "This editor saved us so much time. We changed our menu seasonally and it's so easy to update now!"
                          <div className="mt-1 text-primary font-medium">- Bistro Nouveau</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/40">
                        <CardContent className="p-3 text-xs">
                          "The templates are professional and easy to customize. Our customers love our new menu design."
                          <div className="mt-1 text-primary font-medium">- Cafe Milano</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs font-normal bg-background/80 shadow-sm backdrop-blur-sm">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    Quick & easy to use
                    <InfoIcon className="h-3 w-3 ml-1 text-muted-foreground" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Design in minutes, not hours</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <Badge variant="secondary" className="mr-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">1</Badge>
                        <span>Choose a template or start from scratch</span>
                      </li>
                      <li className="flex items-center">
                        <Badge variant="secondary" className="mr-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">2</Badge>
                        <span>Customize with your content and branding</span>
                      </li>
                      <li className="flex items-center">
                        <Badge variant="secondary" className="mr-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">3</Badge>
                        <span>Download or share your professional menu</span>
                      </li>
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:ml-10 gap-4 animate-fadeIn animate-delay-200 relative">
            <div 
              className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl hidden lg:block" 
              aria-hidden="true"
            />
            <Link href="/editor" className="contents">
              <Button size="lg" className="px-8 gap-2 group shadow-md">
                Create Your Menu
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/gallery" className="contents">
              <Button variant="outline" size="lg" className="gap-2 group">
                <Sparkles className="h-4 w-4 mr-1 transition-transform group-hover:rotate-12" />
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
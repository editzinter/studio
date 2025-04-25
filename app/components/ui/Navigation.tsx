"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sparkles, Menu, X, FilePenLine, Book, Home, Images, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4 mr-2" /> },
    { href: '/gallery', label: 'Template Gallery', icon: <Images className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-200",
      isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-border" : "bg-background border-transparent"
    )}>
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-lg">STUDIO EDIT</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "px-4 gap-1.5",
                        isActive(link.href) && "bg-primary/10 text-primary"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button asChild className="ml-2 gap-1.5 group">
            <Link href="/editor">
              <FilePenLine className="h-4 w-4 transition-transform group-hover:scale-110" />
              Create a Menu
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(300px,_80vw)]">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  STUDIO EDIT
                </SheetTitle>
                <SheetDescription>
                  Create beautiful menus for your business
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link 
                      href={link.href}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-md transition-colors",
                        isActive(link.href) 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted"
                      )}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                      {isActive(link.href) && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-2 pt-2 border-t">
                  <SheetClose asChild>
                    <Button asChild className="w-full gap-2 mt-2">
                      <Link href="/editor">
                        <FilePenLine className="h-4 w-4" />
                        Create a Menu
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
} 
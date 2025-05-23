"use client";

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, ArrowUpRight, Mail, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState({
    quickLinks: false,
    helpSupport: false,
    subscribe: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        {/* Desktop and tablet footer */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                STUDIO EDIT
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Create beautiful menus for your restaurant, cafe, bar, or special event with our easy-to-use editor.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>123 Design Street, Creative City</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-1" />
              <a href="mailto:hello@studio-edit.com" className="hover:text-primary transition-colors">
                hello@studio-edit.com
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  Home
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  Template Gallery
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/editor"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  Create Menu
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Help & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  How It Works
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  FAQ
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  Contact Us
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  Privacy Policy
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center">
              Subscribe
              <Badge variant="outline" className="ml-2 px-2 py-0 text-[10px]">
                New
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">
              Get the latest templates and updates directly to your inbox.
            </p>
            <Card className="bg-muted/30 border-muted-foreground/20">
              <CardContent className="p-4">
                <form className="flex flex-col gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="text-sm bg-background focus:ring-2 focus:ring-primary/30 transition-colors"
                    required
                  />
                  <Button type="submit" size="sm" className="w-full gap-1">
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">
                  No spam, only template updates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile footer with accordion sections */}
        <div className="sm:hidden space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                STUDIO EDIT
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Create beautiful menus for your restaurant, cafe, bar, or special event with our easy-to-use editor.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-xs sm:text-sm">123 Design Street, Creative City</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-1" />
              <a href="mailto:hello@studio-edit.com" className="text-xs sm:text-sm hover:text-primary transition-colors">
                hello@studio-edit.com
              </a>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* Quick Links - Mobile */}
          <div className="space-y-3">
            <button 
              onClick={() => toggleSection('quickLinks')}
              className="w-full flex justify-between items-center"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Quick Links
              </h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.quickLinks ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.quickLinks && (
              <ul className="space-y-3 pt-2 pl-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    Template Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/editor"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    Create Menu
                  </Link>
                </li>
              </ul>
            )}
          </div>
          
          <Separator className="my-4" />
          
          {/* Help & Support - Mobile */}
          <div className="space-y-3">
            <button 
              onClick={() => toggleSection('helpSupport')}
              className="w-full flex justify-between items-center"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Help & Support
              </h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.helpSupport ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.helpSupport && (
              <ul className="space-y-3 pt-2 pl-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            )}
          </div>
          
          <Separator className="my-4" />
          
          {/* Subscribe - Mobile */}
          <div className="space-y-3">
            <button 
              onClick={() => toggleSection('subscribe')}
              className="w-full flex justify-between items-center"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center">
                Subscribe
                <Badge variant="outline" className="ml-2 px-2 py-0 text-[10px]">
                  New
                </Badge>
              </h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.subscribe ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.subscribe && (
              <div className="pt-3">
                <p className="text-sm text-muted-foreground">
                  Get the latest templates and updates directly to your inbox.
                </p>
                <div className="mt-3">
                  <form className="flex flex-col gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="text-sm bg-background focus:ring-2 focus:ring-primary/30 transition-colors"
                      required
                    />
                    <Button type="submit" size="sm" className="w-full gap-1">
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-2">
                    No spam, only template updates.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-6 sm:my-10" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} STUDIO EDIT. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-4 sm:space-x-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary">
                    <a href="#" aria-label="Facebook">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow us on Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary">
                    <a href="#" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />  
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow us on Instagram</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary">
                    <a href="#" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow us on Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  );
} 
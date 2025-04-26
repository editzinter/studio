"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Globe } from "@/components/magicui/globe";
import { VideoText } from './VideoText';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-2 rounded-full px-4 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-primary/20 hover:ring-primary/60 transition-all">
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs rounded-sm font-medium">New</Badge>
              <span className="inline-flex items-center space-x-1">
                Chalkboard template just released
                <ArrowRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
          <div className="mt-10 text-center lg:text-left animate-fadeIn">
            <div className="h-60 sm:h-72 relative mb-6 w-full border border-slate-700/10 dark:border-slate-200/10 rounded-lg shadow-lg overflow-hidden">
              <VideoText 
                src="/videos/main.mp4"
                className="w-full h-full"
                fontSize={13.5}
                fontWeight="bold"
                textAnchor="start"
                dominantBaseline="middle"
              >
                {'Design Beautiful\nMenus in Minutes'}
              </VideoText>
            </div>
            <Separator className="my-6 max-w-[100px] mx-auto lg:mx-0" />
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Create stunning menus for your restaurant, cafe, bar, or special event with our professional templates. Customize colors, fonts, and layout to match your brand.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/gallery" className="contents">
                <Button size="lg" className="px-8 gap-2 group shadow-md">
                  Browse Templates
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/editor" className="contents">
                <Button variant="outline" size="lg" className="gap-2 group">
                  <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  Create Your Own
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Globe component */}
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 animate-fadeIn animate-delay-200 relative">
          <div className="relative w-[500px] h-[350px] rounded-xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            {/* Floating decorative circle */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/20 blur-xl pointer-events-none z-10"></div>
            
            <div className="relative h-full w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              {/* Globe positioned in the background */}
              <Globe 
                className="opacity-90 scale-[1.2]" 
                config={{
                  width: 800,
                  height: 800,
                  devicePixelRatio: 2,
                  phi: 0,
                  theta: 0.3,
                  dark: 0,
                  diffuse: 0.4,
                  mapSamples: 16000,
                  mapBrightness: 1.2,
                  baseColor: [1, 1, 1],
                  markerColor: [251 / 255, 100 / 255, 21 / 255],
                  glowColor: [1, 1, 1],
                  markers: [
                    // Markers for major food cities around the world
                    { location: [40.7128, -74.006], size: 0.1 },   // New York
                    { location: [48.8566, 2.3522], size: 0.1 },    // Paris
                    { location: [35.6762, 139.6503], size: 0.1 },  // Tokyo
                    { location: [19.4326, -99.1332], size: 0.1 },  // Mexico City
                    { location: [41.9028, 12.4964], size: 0.1 },   // Rome
                    { location: [31.2304, 121.4737], size: 0.1 },  // Shanghai
                    { location: [13.7563, 100.5018], size: 0.1 },  // Bangkok
                    { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
                    { location: [37.7749, -122.4194], size: 0.1 }, // San Francisco
                    { location: [51.5074, -0.1278], size: 0.1 },   // London
                  ],
                }}
              />
              
              {/* Menu representation overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width="380" height="280" viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 relative z-20">
                  <path d="M20 0H360C371.046 0 380 8.95431 380 20V260C380 271.046 371.046 280 360 280H20C8.95431 280 0 271.046 0 260V20C0 8.95431 8.95431 0 20 0Z" fill="currentColor" fillOpacity="0.05"/>
                  <path d="M190 30H340C345.523 30 350 34.4772 350 40V240C350 245.523 345.523 250 340 250H190V30Z" fill="currentColor" fillOpacity="0.08"/>
                  <path d="M40 70H140V90H40V70Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M40 110H140V115H40V110Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M40 125H140V130H40V125Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M40 140H140V145H40V140Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M40 180H140V185H40V180Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M40 195H140V200H40V195Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M40 210H140V215H40V210Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 70H332V73H208V70Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 85H332V88H208V85Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 100H293V103H208V100Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 130H332V133H208V130Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 145H332V148H208V145Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 160H293V163H208V160Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 190H332V193H208V190Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 205H332V208H208V205Z" fill="currentColor" fillOpacity="0.15"/>
                  <path d="M208 220H293V223H208V220Z" fill="currentColor" fillOpacity="0.15"/>
                </svg>
              </div>
              
              {/* Floating highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent z-30"></div>
            </div>
          </div>
          
          {/* Annotation badge */}
          <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-8 bg-background shadow-lg rounded-lg px-3 py-2 text-sm font-medium border flex items-center gap-2 animate-bounce animate-delay-500 animate-duration-2000 z-40">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Try our templates!</span>
          </div>
        </div>
      </div>
      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-600 to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
} 
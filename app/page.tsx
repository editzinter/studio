import Hero from './components/ui/Hero';
import Features from './components/ui/Features';
import CTA from './components/ui/CTA';
import { Separator } from '@/components/ui/separator';
import { Marquee } from '@/components/magicui/marquee';
import { ArrowRightIcon } from 'lucide-react'; 

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
          <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:opacity-20 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/20 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
              <svg aria-hidden="true" className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/5 stroke-black/5 dark:fill-white/10 dark:stroke-white/10">
                <defs>
                  <pattern id="pattern-1" width="40" height="40" patternUnits="userSpaceOnUse" x="50%" y="100%">
                    <path d="M.5 40V.5H40" fill="none"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern-1)"></rect>
                <svg x="50%" y="100%" className="overflow-visible">
                  <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0"></path>
                </svg>
              </svg>
            </div>
          </div>
        </div>
        
        <Hero />
      </div>
      
      {/* Marquee section with logos */}
      <div className="py-16 border-y border-border/20 bg-gradient-to-r from-background via-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Trusted by restaurants worldwide</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Join thousands of restaurants creating beautiful menus with STUDIO EDIT</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4">
          <Marquee className="py-6" pauseOnHover repeat={6}>
            <div className="flex items-center mx-10">
              <div className="flex items-center justify-center h-12 w-auto px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300">
                <span className="font-bold text-xl flex items-center group">
                  Bistro Elite 
                  <ArrowRightIcon className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
            <div className="flex items-center mx-10">
              <div className="flex items-center justify-center h-12 w-auto px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300">
                <span className="font-bold text-xl flex items-center group">
                  Gourmet Garden 
                  <ArrowRightIcon className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
            <div className="flex items-center mx-10">
              <div className="flex items-center justify-center h-12 w-auto px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300">
                <span className="font-bold text-xl flex items-center group">
                  Flavors & Co 
                  <ArrowRightIcon className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
            <div className="flex items-center mx-10">
              <div className="flex items-center justify-center h-12 w-auto px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300">
                <span className="font-bold text-xl flex items-center group">
                  Urban Plate 
                  <ArrowRightIcon className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
            <div className="flex items-center mx-10">
              <div className="flex items-center justify-center h-12 w-auto px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300">
                <span className="font-bold text-xl flex items-center group">
                  Seaside Bites 
                  <ArrowRightIcon className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>
          </Marquee>
        </div>
      </div>
      
      {/* Elegant divider with gradient */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30"></div>
      </div>
      
      <div className="relative bg-muted/30 py-16 md:py-24">
        <Features />
      </div>
      
      {/* Elegant divider with gradient */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background"></div>
      </div>
      
      <div className="relative bg-gradient-to-b from-background to-muted/30 pt-12">
        <CTA />
      </div>
    </div>
  );
}

"use client";

import React, { ElementType, ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none";
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode;
  /**
   * Font size for the text mask (in viewport width units)
   * @default 10
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string;
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string;
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string;
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 7,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");
  const content = React.Children.toArray(children).join("");

  useEffect(() => {
    const updateSvgMask = () => {
      // Responsive font size calculation
      let responsiveFontSize;
      if (typeof fontSize === "number") {
        // Adjust font size based on screen width
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
          // Mobile: slightly smaller to fit on smaller screens
          responsiveFontSize = `${fontSize * 0.8}vw`;
        } else if (screenWidth < 1024) {
          // Tablet: slightly reduced size
          responsiveFontSize = `${fontSize * 0.85}vw`;
        } else {
          // Desktop: more reduced to fit well
          responsiveFontSize = `${fontSize * 0.75}vw`;
        }
      } else {
        responsiveFontSize = fontSize;
      }
      
      // Process content to handle newlines
      let processedContent = content;
      if (content.includes('\n')) {
        // Replace newlines with SVG tspan elements for multi-line text
        const lines = content.split('\n');
        
        // Determine text anchor and position based on screen width
        const screenWidth = window.innerWidth;
        const effectiveTextAnchor = screenWidth < 1024 ? 'middle' : textAnchor;
        const xPosition = effectiveTextAnchor === 'middle' ? '50%' : '10%';
        
        processedContent = lines
          .map((line, i) => 
            `<tspan x="${xPosition}" dy="${i === 0 ? 0 : 1.05}em" font-size="${i === 1 ? '0.85em' : '1em'}" stroke="rgba(255,255,255,0.8)" stroke-width="1px" paint-order="stroke fill">${line}</tspan>`
          )
          .join('');
        
        // For multi-line text, adjust the vertical position
        const yPosition = screenWidth < 640 ? '30%' : '35%';
        
        const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <text x="${xPosition}" y="${yPosition}" font-size="${responsiveFontSize}" font-weight="${fontWeight}" 
          text-anchor="${effectiveTextAnchor}" dominant-baseline="${dominantBaseline}" 
          font-family="${fontFamily}" stroke="rgba(255,255,255,0.8)" stroke-width="1px" paint-order="stroke fill">${processedContent}</text>
        </svg>`;
        
        setSvgMask(newSvgMask);
      } else {
        // Single line text
        const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' 
          text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' 
          font-family='${fontFamily}' stroke="rgba(255,255,255,0.8)" stroke-width="1px" paint-order="stroke fill">${content}</text>
        </svg>`;
        
        setSvgMask(newSvgMask);
      }
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return (
    <Component className={cn(`relative size-full`, className)}>
      {/* Create a container that masks the video to only show within text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element for SEO/accessibility */}
      <span className="sr-only">{content}</span>
    </Component>
  );
} 
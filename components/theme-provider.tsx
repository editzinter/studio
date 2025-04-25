"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// All theme parameters are set directly on the NextThemesProvider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system" 
      enableSystem
    >
      {children}
    </NextThemesProvider>
  )
} 
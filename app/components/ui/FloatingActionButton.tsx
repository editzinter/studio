"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

type FloatingActionButtonProps = {
  href: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function FloatingActionButton({
  href,
  icon = <PlusIcon className="h-5 w-5" />,
  className,
  children,
}: FloatingActionButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg",
        "flex items-center justify-center",
        "bg-primary hover:bg-primary/90",
        "transition-all duration-200 ease-in-out",
        "md:h-16 md:w-16 md:bottom-8 md:right-8",
        className
      )}
    >
      <Link href={href}>
        {children || icon}
      </Link>
    </Button>
  )
} 
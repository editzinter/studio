"use client";

import * as React from "react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
}

const ResizablePanelGroup = ({
  className,
  children,
  direction = "horizontal",
  ...props
}: ResizablePanelGroupProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

ResizablePanelGroup.displayName = "ResizablePanelGroup";

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className, children, defaultSize = 25, minSize = 10, maxSize = 50, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-grow", className)}
        style={{ flexBasis: `${defaultSize}%` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResizablePanel.displayName = "ResizablePanel";

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
}

const ResizableHandle = ({
  className,
  withHandle = true,
  ...props
}: ResizableHandleProps) => {
  return (
    <div
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[active]:bg-primary",
        className
      )}
      data-active={false}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <DragHandleDots2Icon className="h-2.5 w-2.5" />
        </div>
      )}
    </div>
  );
};

ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }; 
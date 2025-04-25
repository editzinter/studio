import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu Template Gallery | STUDIO EDIT",
  description: "Browse our collection of professionally designed menu templates for your restaurant or cafe.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
} 
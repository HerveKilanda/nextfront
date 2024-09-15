import Image from "next/image";
import { ReactNode } from "react";
import titans from "public/titans.jpg";

/**
 * React component that wraps its children with a styled div including a background image.
 * Uses Next.js's Image component for optimized image rendering.
 * @param children - The content to be wrapped by the LayoutPage component.
 * @param className - Additional classes for custom styling.
 * @returns A styled div containing a background image and the provided children components.
 */
export default function Layout({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen ${className}`}>
      <Image
        src={titans}
        alt="A beautiful blue lock background image"
        className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"
        priority
        fill
      />
      <div className=" bg-opacity-90 p-8 rounded-lg shadow-lg z-10">
        {children}
      </div>
    </div>
  );
}

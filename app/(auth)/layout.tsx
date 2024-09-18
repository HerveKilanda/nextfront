import Image from "next/image";
import { ReactNode } from "react";
import bluelock from "../../public/bluelock.jpg";

/**
 * React component that wraps its children with a styled div including a background image.
 * Uses Next.js's Image component for optimized image rendering.
 * @param children - The content to be wrapped by the LayoutPage component.
 * @param className - Additional classes for custom styling.
 * @returns A styled div containing a background image and the provided children components.
 */

type LayoutPageProps = {
  children: React.ReactNode;
};

export default function LayoutPage({ children}: LayoutPageProps): JSX.Element {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <Image
        src={bluelock}
        alt="A beautiful blue lock background image"
        className="absolute inset-0  object-cover -z-10 brightness-50"
        priority
        fill
        sizes="(100vw)"
        
        
      />
      <div className=" bg-opacity-90 p-8 rounded-lg shadow-lg z-10">
        {children}
      </div>
    </div>
  );
}

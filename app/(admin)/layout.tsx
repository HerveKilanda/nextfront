import Image from "next/image";
import { ReactNode } from "react";
import titans from "../../public/titans.jpg";

// Exportez l'interface si vous en avez besoin ailleurs
export interface LayoutPageProps {
  children: ReactNode;
  className?: string;
}

export default function LayoutPage({ children, className = "" }: LayoutPageProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen ${className}`}>
      <Image
        src={titans}
        alt="A beautiful blue lock background image"
        className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"
        priority
        fill
      />
      <div className="bg-opacity-90 p-8 rounded-lg shadow-lg z-10">
        {children}
      </div>
    </div>
  );
}
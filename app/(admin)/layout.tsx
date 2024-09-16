import React from 'react';
import Image from "next/image";
import titans from "../../public/titans.jpg";

type LayoutPageProps = {
  children: React.ReactNode;
};

export default function LayoutPage({ children }: LayoutPageProps): JSX.Element {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
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
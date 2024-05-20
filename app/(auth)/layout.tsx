// app/(auth)/inscription/page.tsx

import Image from "next/image";
import { ReactNode } from "react";
import bluelock from "../../public/bluelock.jpg";
export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex w-screen flex-col md:items-center md:justify-center md:bg-transparent"
    >
      <Image
        src={bluelock}
        alt="background image"
        className="hidden sm:flex sm:object-cover -z-10 brightness-50 mt-4 fixed"
        priority
        layout="fill"
      />
      {children}
    </div>
  );
}
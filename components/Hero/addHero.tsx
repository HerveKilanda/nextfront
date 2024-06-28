// components/Hero.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative mt-7 -z-10">
      <Image
        src="/bluelock.jpg"
        alt="Image de fond"
        className="object-cover w-full h-screen"
        priority
        width={800}
        height={800}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 z-10">
        <h2 className="text-5xl font-bold text-white opacity-75 mb-4">
          Manga disponible
        </h2>
        <p className="text-2xl text-purple-300 mb-8">
          Découvrez notre collection de mangas disponibles dès maintenant!
        </p>
        <Link href="/manga">
          <Button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Voir la collection
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

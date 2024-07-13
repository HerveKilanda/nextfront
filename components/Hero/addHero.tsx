// components/Hero.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center bg-black bg-opacity-50 p-4">
      <Image
        src="/bluelock.jpg"
        alt="A beautiful blue lock background image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-[-1] brightness-50"
        priority
      />
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Manga disponible
        </h2>
        <p className="text-sm sm:text-md md:text-lg lg:text-xl text-white mb-8">
          Découvrez notre collection de mangas disponibles dès maintenant!
        </p>
        <Link href="/manga" passHref>
          <Button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            Voir la collection
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
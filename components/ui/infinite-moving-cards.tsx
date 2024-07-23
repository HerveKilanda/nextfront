import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    mal_id: number;
    image_url: string;
    title: string;
    synopsis: string;
    type: string;
    status: string;
    genres: { name: string }[]; // Mettez à jour pour refléter la structure des genres
    episodes?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const router = useRouter();

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "20000s");
      }
      // containerRef.current.style.setProperty("--animation-delay", "3000s");
    }
  };

  const handleCardClick = (mal_id: number) => {
    router.push(`/manga/${mal_id}`);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
            onClick={() => handleCardClick(item.mal_id)}
          >
            <Image src={item.image_url} alt={item.title} className="object-cover rounded-lg d-flex" width={300} height={200} />
            <blockquote>
              <span className="relative z-20 text-lg leading-[1.6] text-gray-100 font-bold">
                {item.title}
              </span>
              <p className="relative z-20 mt-2 text-sm leading-[1.6] text-gray-400 font-normal">
                {item.synopsis}
              </p>
              <p className="relative z-20 mt-2 text-sm leading-[1.6] text-gray-400 font-normal">
                Genres: {item.genres.map(genre => genre.name).join(', ')}
              </p>
              <Button
                rel="noopener noreferrer"
                className="relative z-20 mt-4 inline-block text-sm bg-blueivy text-white"
              >
                Plus de détails
              </Button>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

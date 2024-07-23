import React from "react";
import Image from "next/image";

type MangaCardProps = {
  manga: {
    image_url: string;
    title: string;
    synopsis: string;
    type: string;
    status: string;
    genres: string;
  };
};

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {manga.image_url ? (
        <Image
          className="w-full"
          src={manga.image_url}
          alt={manga.title}
          width={450}
          height={600}
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p>Image non disponible</p>
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{manga.title}</div>
        <p className="text-gray-700 text-base">{manga.synopsis}</p>
        <p className="text-gray-700 text-base">Type: {manga.type}</p>
        <p className="text-gray-700 text-base">Status: {manga.status}</p>
        <p className="text-gray-700 text-base">Genres: {manga.genres}</p>
      </div>
    </div>
  );
};

export default MangaCard;

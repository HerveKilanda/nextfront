/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import MangaCard from "@/components/MangaCard/addMangaCard";

export default function SearchResultsPage({ params }: { params: { title: string } }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const results = searchParams.get('results');
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    if (query && results) {
      setMangas(JSON.parse(decodeURIComponent(results)));
    }
  }, [params.title,query, results]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-redivy text-center">
        Résultats de recherche pour "{query}"
      </h1>
      <div className="flex flex-col items-center">
        {mangas.length > 0 ? (
          mangas.map((manga) => (
            <MangaCard
              key={manga.mal_id}
              manga={{
                image_url: manga.image_url,
                title: manga.title,
                synopsis: manga.synopsis,
                type: manga.type,
                status: manga.status,
                genres: Array.isArray(manga.genres)
                  ? manga.genres.map((genre) => genre.name).join(", ")
                  : "Aucun genre",
              }}
            />
          ))
        ) : (
          <p>Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}

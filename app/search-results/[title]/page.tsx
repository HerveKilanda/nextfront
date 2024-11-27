/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import MangaCard from "@/components/MangaCard/addMangaCard";
import { getMe } from "@/utils/get-me";
import { API_URL } from "@/app/constants/api";
import { Button } from "@/components/ui/button";
import { getCsrf } from "@/utils/csrf";

export default function SearchResultsPage({ params }: { params: { title: string } }) {
  const searchParams = useSearchParams();
  const [csrfToken, setCsrfToken] = useState('');
  const query = searchParams.get('query');
  const results = searchParams.get('results');
  const [mangas, setMangas] = useState([]);
  const [me, setMe] = useState()

  useEffect(() => {
    if (query && results) {
      setMangas(JSON.parse(decodeURIComponent(results)));
    }
  }, [params.title, query, results]);
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const protection = await getCsrf();
      setCsrfToken(protection);
    };

    fetchCsrfToken();
  }, []);


  const handleBorrowClick = async (mangaId) => {
    const me = await getMe();
    setMe(me)
    try {
      const response = await fetch(`${API_URL}/emprunt/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-csrf-token': csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ mal_id: mangaId }),
      });

      if (response.ok) {
        alert("Manga emprunté avec succès !");
      } else {
        alert("Échec de l'emprunt du manga.");
      }
    } catch (error) {
      console.error("Erreur lors de l'emprunt du manga:", error);
      alert("Erreur lors de l'emprunt du manga.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-redivy text-center">
        Résultats de recherche pour "{query}"
      </h1>
      <div className="flex justify-center gap-4 items-center">
        {mangas.length > 0 ? (
          mangas.map((manga) => (
            <div key={manga.mal_id} className="mb-6">
              <MangaCard
                manga={{
                  image_url: manga.image_url,
                  title: manga.title,
                  synopsis: manga.synopsis,
                  type: manga.type,
                  status: manga.status,
                  genres: manga.genres,
                }}
              />
              <Button
                onClick={() => handleBorrowClick(manga.mal_id)}
                className="mt-4 bg-blueivy text-white flex justify-center items-center"
              >
                Emprunter
              </Button>
            </div>
          ))
        ) : (
          <p>Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MangaCard from "@/components/MangaCard/addMangaCard";
import { getMe } from "@/utils/get-me";
import { Button } from "@/components/ui/button";
import { API_URL } from "../../constants/api";

export default function MangaDetails({ params }) {
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMangaDetails = async () => {
      const me = await getMe();
      try {
        const response = await fetch(`${API_URL}/manga/${params.mangaId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${me.token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setManga(data);
        } else {
          throw new Error("Failed to fetch manga details");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [params.mangaId]);

  const handleBorrowClick = async () => {
    const me = await getMe();
    try {
      const mangaId = parseInt(params.mangaId, 10);
      const response = await fetch(`${API_URL}/emprunt/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${me.token}`,
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

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!manga) {
    return <p>Aucun manga trouvé.</p>;
  }

  // Vérifiez que manga.genres est un tableau avant d'utiliser map
  const genres = Array.isArray(manga.genres) ? manga.genres.map(genre => genre.name).join(", ") : "Aucun genre";

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-redivy  text-center">Détails du manga</h1>
      <div className="flex flex-col items-center">
        <MangaCard
          manga={{
            image_url: manga.image_url,
            title: manga.title,
            synopsis: manga.synopsis,
            type: manga.type,
            status: manga.status,
            genres: genres,
          }}
        />
        <Button onClick={handleBorrowClick} className="mt-4 bg-blueivy text-white">
          Emprunter
        </Button>
      </div>
    </div>
  );
}

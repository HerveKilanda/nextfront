"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { getMe } from "@/utils/get-me";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { API_URL } from "../constants/api";

export default function MangaPage() {
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchManga = async () => {
      const me = await getMe();
      try {
        const response = await fetch(`${API_URL}/manga`, {
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
          throw new Error("Failed to fetch manga");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchManga();
  }, []);
  if (loading) {
    return <p>Chargement...</p>;
  }
  if (error) {
    return <p>Erreur : {error}</p>;
  }
  if (!manga) {
    return <p>Aucun manga trouvé.</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <InfiniteMovingCards
        items={manga}
        direction="left"
        speed="slow"
        pauseOnHover={true}
        className="w-full h-full"
      />
    </div>
  );
}

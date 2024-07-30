// pages/emprunts.tsx
"use client";

import { useState, useEffect } from "react";
import { getMe } from "@/utils/get-me";
import { API_URL } from "../constants/api";
import EmpruntCard from "@/components/empruntCard";


const UserEmprunts = () => {
  const [emprunts, setEmprunts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmprunts = async () => {
      const me = await getMe();
      try {
        const response = await fetch(`${API_URL}/emprunt/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${me.token}`,
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setEmprunts(data);
        } else {
          throw new Error("Échec de la récupération des emprunts de l'utilisateur");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmprunts();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (emprunts.length === 0) {
    return <p>Aucun emprunt trouvé.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Mes Emprunts</h1>
      <div className="flex flex-wrap justify-center">
        {emprunts.map((emprunt) => (
          <EmpruntCard key={emprunt.empruntId} emprunt={emprunt} />
        ))}
      </div>
    </div>
  );
};

export default UserEmprunts;

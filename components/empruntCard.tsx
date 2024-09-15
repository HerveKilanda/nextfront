/* eslint-disable react/no-unescaped-entities */
// components/EmpruntCard.tsx
import React from "react";
import Image from "next/image";


const EmpruntCard = ({ emprunt }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2 p-4">
      {emprunt.Manga.image_url ? (
        <Image src={emprunt.Manga.image_url} alt={emprunt.Manga.title} className="w-full h-64 object-cover" />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <p>Image non disponible</p>
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-black mb-2">{emprunt.Manga.title}</div>
        <p className="text-gray-700 text-base">Date d'emprunt: {new Date(emprunt.dateEmprunt).toLocaleDateString()}</p>
        <p className="text-gray-700 text-base">Date de retour: {emprunt.dateRetour ? new Date(emprunt.dateRetour).toLocaleDateString() : "Non retourné"}</p>
      </div>
    </div>
  );
};

export default EmpruntCard;

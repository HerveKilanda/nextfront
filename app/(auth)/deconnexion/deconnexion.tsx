"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Composant fonctionnel Deconnexion qui gère le processus de déconnexion.
 */
export  const Deconnexion:React.FC = () =>  {
    // État pour suivre si la déconnexion est en cours
    const [isLoading, setIsLoading] = useState(false)

    // Hook pour accéder à l'objet Router et gérer les redirections
    const router = useRouter();

    /**
     * Fonction asynchrone pour gérer la déconnexion.
     * Elle envoie une requête POST à l'API pour déconnecter l'utilisateur.
     * Si la requête est réussie, l'utilisateur est redirigé vers la page de connexion.
     * Si la requête échoue, une erreur est consignée dans la console.
     */
    const handleDeconnexion = async () => {
        // Mise à jour de l'état pour indiquer que la déconnexion est en cours
        setIsLoading(true)
        try {
            // URL de l'API pour la déconnexion
            const apiUrl = process.env.API_URL || "http://localhost:8000/deconnexion";

            // Envoi de la requête POST avec les headers et les informations d'identification nécessaires
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            // Si la requête est réussie (code HTTP 200)
            if (response.ok) {
                console.log("La déconnexion est réussie");
                // Redirection vers la page de connexion
                router.push("/connexion");
            } else {
                // Si la requête échoue, récupération des données d'erreur
                const errorData = await response.json();
                console.log("La déconnexion a échoué", errorData);
            }
        } catch (error) {
            // Si une erreur survient lors de la requête, consignation de l'erreur dans la console
            console.error("Erreur lors de la déconnexion:", error);
        } finally {
            // Mise à jour de l'état pour indiquer que la déconnexion est terminée
            setIsLoading(false)
        }
    };
    
    // Retourne un bouton qui, lorsqu'il est cliqué, appelle la fonction handleDeconnexion
    return (
        <button onClick={handleDeconnexion} disabled={isLoading}>
            {/* Si la déconnexion est en cours, affiche "Loading...", sinon affiche "Déconnexion" */}
            {isLoading ? "Loading..." : "Déconnexion"}
        </button>
    );
}
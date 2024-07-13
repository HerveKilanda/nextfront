import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function Deconnexion() {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    fetch(`http://localhost:5000/auth/deconnexion`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion", error);
      });
  }, [router]);

  return (
    <div>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

// app/adminEmprunt/modifier/modification.t
import { cookies } from "next/headers";
import { API_URL } from "@/app/constants/api";

export async function modifEmprunt(mal_id: string) {
  const token = cookies().get("token")?.value;

  if (!token) {
    console.log("no token");
    return null;
  } else {
    console.log("token", token);
  }

  try {
    const response = await fetch(`${API_URL}/emprunt/${mal_id}/return`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    

    return response; // Return the complete response object
  } catch (error) {
    console.error("Error modifying emprunt:", error);
    return null;
  }
}

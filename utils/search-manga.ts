import { API_URL } from "../app/constants/api";

export const searchManga = async (title: string) => {
  try {
    const response = await fetch(`${API_URL}/manga/getByTitle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch manga");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching manga:", error);
    throw error;
  }
};

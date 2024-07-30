// utils/search-manga.ts

import { API_URL } from "../app/constants/api";

export const searchManga = async (query: string) => {
  try {
    const response = await fetch(`${API_URL}/manga?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

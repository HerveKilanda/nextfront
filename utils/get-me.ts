"use server";

import { cookies } from "next/headers";
import { API_URL } from "../app/constants/api";


/**
 * Fetches the authenticated user's data from the API.
 *
 * @return {Promise<Object | null>} The user's data, or null if the user is not authenticated.
 * @throws {Error} If the user's data cannot be fetched.
 */
export async function getMe() {
  // Get the authentication token from the cookies
  const token = cookies().get("token")?.value;

  // If there's no token, return null
  if (!token) {
    console.log("il n'y a pas de token");
    return null;
  }

  try {
    // Fetch the user's data from the API, including the token in the request headers
    const me = await fetch(`${API_URL}/auth/me`, {
      headers: { Cookie: `token=${token}` },
      method: "GET",
    });

    // If the API request fails, throw an error
    if (!me.ok) {
      throw new Error("Failed to fetch user");
    }

    // Return the user's data as a JSON object
    return await me.json();
  } catch (error) {
    // Log any errors that occur during the API request
    console.error("Error fetching user:", error);
    return null;
  }
}

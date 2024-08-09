// utils/csrf.js

import { API_URL } from "@/app/constants/api";

export async function getCsrf() {
  const response = await fetch(`${API_URL}/auth/token`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    console.log('La protection à été recuperé avec success');
    const data = await response.json();
    return data.csrfToken;
  } else {
    console.error('Erreur lors de la recuperation de la protection');
  }
}

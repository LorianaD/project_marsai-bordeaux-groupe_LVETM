

/* ==================================================================================
  Service d'authentification : envoie email/password au backend et gère les erreur
===================================================================================*/
const API = import.meta.env.VITE_API_URL || "";

export async function loginUser(email, password) {
  const res = await fetch(`${API}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({ email, password }),
  });
  
  if (!res.ok) {
    const text = await res.text();
    
    try {
      const data = JSON.parse(text);
      throw new Error(data.details || data.error || `Erreur ${res.status}`);
    } catch (error) {
      throw new Error(`Erreur ${res.status}: ${text}`);

    }
  }
  
  return res.json()

}

// URL de base de l’API (depuis les variables d’environnement)
import { getAuthHeaders } from "../../utils/authHeaders.js";

const API = import.meta.env.VITE_API_URL || "";

// Fonction pour enregistrer un utilisateur 
export async function registerUser(data, role) {
  const res = await fetch(`${API}/api/users/${role}/register`, {
    method: "POST",
    headers: getAuthHeaders({ 
      "Content-Type": "application/json", 
      Accept: "application/json",
    }),
    body: JSON.stringify(data),
  });

  if(!res.ok) {
    const data = await res.json();
    throw new Error(data.error || `Register Failed -> ${res.status}`);
  }

  return res.json()

}

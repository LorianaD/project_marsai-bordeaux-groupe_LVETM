// URL de base de l’API (depuis les variables d’environnement)
const API = import.meta.env.VITE_API_URL || "";

// Fonction pour enregistrer un utilisateur 
export async function registerUser(data, role) {
  const res = await fetch(`${API}/api/users/${role}/register`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json", 
        Accept: "application/json" ,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if(!res.ok) {
    const data = await res.json();
    throw new Error(data.error || `Register Failed -> ${res.status}`);
  }

  return res.json()

}

// fonction pour s'inscrire et faire le lien entre le front et le back
const API = import.meta.env.VITE_API_BASE_URL || "";

// Fonction pour enregistrer un utilisateur
export async function registerUser(data, role) {
  const res = await fetch(`${API}/api/users/${role}/register`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json", 
        Accept: "application/json" },

    body: JSON.stringify(data),
  });

  if(!res.ok) {
    const data = await res.json();
    throw new Error(data.error || `Register Failed -> ${res.status}`);
  }

  return res.json()

}

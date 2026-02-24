

/* ==================================================================================
  Service d'authentification : envoie email/password au backend et gère les erreurs
===================================================================================*/
const API = import.meta.env.VITE_API_URL || "";

function getApiBase() {
  if (API && API.trim() !== "") return API.trim().replace(/\/$/, "");
  return ""; // Vide = URL relative, utilise le proxy Vite (/api -> backend)
}

export async function loginUser(email, password) {
  const base = getApiBase();
  const url = base ? `${base}/api/users/login` : "/api/users/login";

  const res = await fetch(url, {
    method: "POST",
    headers: {

      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();

  
  return res.json()
  if (!res.ok) {
  
  return res.json()
    let message = `Erreur ${res.status}`;
    try {
      const data = JSON.parse(text);
      message = data.details || data.error || message;
    } catch (_) {
      if (text) message = `${message}: ${text.slice(0, 100)}`;
    }
    throw new Error(message);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Réponse invalide du serveur");
  }
}

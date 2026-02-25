

/* ==================================================================================
  Service d'authentification : envoie email/password au backend et gère les erreurs
===================================================================================*/
const API = import.meta.env.VITE_API_URL || "";


/* ========================================================================================
  URL de base de l'API. Vide = requêtes relatives, le proxy Vite redirige vers le backend 
=========================================================================================*/
function getApiBase() {
  return (API || "").trim().replace(/\/$/, "");
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

  if (!res.ok) {
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

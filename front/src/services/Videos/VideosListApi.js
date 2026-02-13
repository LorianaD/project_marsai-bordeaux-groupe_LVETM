// URL de l’API (fallback en local si variable d’environnement absente)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Récupère la liste des vidéos depuis le backend
 */
export async function fetchVideos() {
  const res = await fetch(`${API_URL}/api/videos`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  // Si la réponse HTTP n’est pas OK → on construit une erreur détaillée
  if (!res.ok) {
    let msg = "";

    try {
      // On tente de lire la réponse comme du JSON (cas API classique)
      const data = await res.json();
      msg = data?.details || data?.error || JSON.stringify(data);
    } catch {
      // Si ce n’est pas du JSON (ex: erreur HTML), on récupère le texte brut
      msg = await res.text().catch(() => "");
    }

    throw new Error(`Erreur API videos (${res.status}) ${msg}`);
  }

  // Retourne la liste des vidéos au format JSON
  return res.json();
}

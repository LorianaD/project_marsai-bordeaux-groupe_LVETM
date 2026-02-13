// URL de l’API définie dans les variables d’environnement
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Envoie une vidéo au backend via un FormData
 */
export async function uploadVideo(formData) {
  const response = await fetch(`${API_URL}/api/videos`, {
    method: "POST",
    // Le FormData contient le fichier + éventuelles métadonnées
    body: formData,
  });

  // On tente de récupérer la réponse JSON (même en cas d’erreur)
  const data = await response.json().catch(() => null);

  // Si le serveur renvoie une erreur HTTP
  if (!response.ok) {
    throw new Error(data?.error || "Erreur upload vidéo");
  }

  // Retourne la réponse du backend (ex: vidéo créée)
  return data;
}

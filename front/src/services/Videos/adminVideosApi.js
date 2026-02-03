// On récupère l’URL de l’API depuis les variables d’environnement
// Exemple : http://localhost:3000
const API = import.meta.env.VITE_API_URL || "";

// ----------------------------
// Récupérer toutes les vidéos côté admin
// ----------------------------
export async function getAdminVideos() {

  // On appelle l’API pour récupérer les vidéos admin
  const r = await fetch(`${API}/api/videos/admin`, {
    // On précise qu’on attend du JSON en réponse
    headers: { Accept: "application/json" },
  });

  // Si la réponse n’est pas OK (status ≠ 200–299)
  // on lève une erreur claire
  if (!r.ok) {
    throw new Error(`GET /api/videos/admin -> ${r.status}`);
  }

  // On retourne le JSON parsé
  // Format attendu : { videos: [...] }
  return r.json();
}

// ----------------------------
// Mettre à jour le statut d’une vidéo (upload_status)
// ----------------------------
export async function patchAdminVideoStatus(id, upload_status) {

  // Appel PATCH pour modifier le statut d’une vidéo précise
  const r = await fetch(`${API}/api/videos/admin/${id}/status`, {
    // On précise que c’est une requête de mise à jour
    method: "PATCH",

    // Headers classiques pour envoyer du JSON
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    // Corps de la requête :
    // on envoie le nouveau statut
    body: JSON.stringify({ upload_status }),
  });

  // Si l’API répond avec une erreur
  if (!r.ok) {
    throw new Error(
      `PATCH /api/videos/admin/${id}/status -> ${r.status}`
    );
  }

  // On retourne la réponse JSON de l’API
  return r.json();
}

// ----------------------------
// Mettre à jour le flag "featured" (mise en avant)
// ----------------------------
export async function patchAdminVideoFeatured(id, featured) {

  // Appel PATCH pour activer ou désactiver la mise en avant
  const r = await fetch(`${API}/api/videos/admin/${id}/featured`, {
    method: "PATCH",

    // On envoie toujours du JSON
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    // Corps : true ou false pour la mise en avant
    body: JSON.stringify({ featured }),
  });

  // Gestion d’erreur si l’API ne répond pas correctement
  if (!r.ok) {
    throw new Error(
      `PATCH /api/videos/admin/${id}/featured -> ${r.status}`
    );
  }

  // On retourne le résultat de l’API
  return r.json();
}

// URL de l'API (définie dans .env)
const API = import.meta.env.VITE_API_URL || "";

/**
 * Récupère toutes les vidéos côté admin
 */
export async function getAdminVideos() {
  const r = await fetch(`${API}/api/videos/admin`, {
    headers: { Accept: "application/json" },
  });

  // Si la requête échoue → on stoppe avec une erreur explicite
  if (!r.ok) {
    throw new Error(`GET /api/videos/admin -> ${r.status}`);
  }

  // Retourne les données JSON : { videos: [...] }
  return r.json();
}

/**
 * Met à jour le statut d’upload d’une vidéo
 */
export async function patchAdminVideoStatus(id, upload_status) {
  const r = await fetch(`${API}/api/videos/admin/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Envoi du nouveau statut au backend
    body: JSON.stringify({ upload_status }),
  });

  if (!r.ok) {
    throw new Error(`PATCH /api/videos/admin/${id}/status -> ${r.status}`);
  }

  return r.json();
}

/**
 * Active ou désactive la mise en avant (featured)
 */
export async function patchAdminVideoFeatured(id, featured) {
  const r = await fetch(`${API}/api/videos/admin/${id}/featured`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Envoi du flag true / false
    body: JSON.stringify({ featured }),
  });

  if (!r.ok) {
    throw new Error(`PATCH /api/videos/admin/${id}/featured -> ${r.status}`);
  }

  return r.json();
}

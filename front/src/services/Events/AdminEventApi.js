

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";



// ADMIN — récupérer tous les events (publiés + brouillons)
export async function getAdminEvents() {
  const res = await fetch(`${API_BASE}/admin/events`);
  if (!res.ok) throw new Error("Erreur chargement events admin");
  return res.json();
}

// ADMIN — créer un event
export async function createEvent(payload) {
  const res = await fetch(`${API_BASE}/admin/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur création event");
  return res.json();
}

// ADMIN — modifier un event
export async function updateEvent(id, payload) {
  const res = await fetch(`${API_BASE}/admin/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur update event");
  return res.json();
}

// ADMIN — supprimer
export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/admin/events/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur suppression event");
  return true;
}

// ADMIN — publier / dépublier
export async function togglePublish(id, published) {
  const res = await fetch(`${API_BASE}/admin/events/${id}/publish`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ published }),
  });
  if (!res.ok) throw new Error("Erreur publication");
  return res.json();
}

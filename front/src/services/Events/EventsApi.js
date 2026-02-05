const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

/**
 * Récupère la liste des événements / ateliers (avec stock = places restantes).
 * @returns {Promise<Array<{ id, title, description, date, length, stock, illustration, location }>>}
 */
export async function getEvents() {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error("Erreur lors du chargement des événements");
  return res.json();
}

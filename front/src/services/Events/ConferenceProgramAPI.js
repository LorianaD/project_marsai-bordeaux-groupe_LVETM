const base = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const API_BASE = base.endsWith("/api") ? base : `${base}/api`;

/**  (page Events publique) */
export async function getProgram() {
  const res = await fetch(`${API_BASE}/conference-program`);
  if (!res.ok) throw new Error("Erreur chargement programme");
  return res.json();
}

/** Liste admin */
export async function getProgramAdmin() {
  const res = await fetch(`${API_BASE}/admin/conference-program`);
  if (!res.ok) throw new Error("Erreur chargement programme");
  return res.json();
}

/** Creer programme */
export async function createItem(payload) {
  const res = await fetch(`${API_BASE}/admin/conference-program`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur création");
  return res.json();
}

/** Modifier  */
export async function updateItem(id, payload) {
  const res = await fetch(`${API_BASE}/admin/conference-program/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur modification");
  return res.json();
}

/** Supprimer  */
export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/admin/conference-program/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur suppression");
}
/**
 * Retourne les headers avec le token Bearer pour les requêtes API authentifiées.
 */
export function getAuthHeaders(extra = {}) {
  const token = localStorage.getItem("token");
  const headers = Object.assign({}, extra);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

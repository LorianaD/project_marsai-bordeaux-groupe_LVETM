/**
 * Retourne les headers avec le token Bearer pour les requêtes API authentifiées.
 */
export function getAuthHeaders(extra = {}) {
  const token = localStorage.getItem("token");
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

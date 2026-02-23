// Lit le payload du token stocké dans localStorage (id, email, role, name, last_name) pour l'utilisateur connecté.

export function decodeToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
}

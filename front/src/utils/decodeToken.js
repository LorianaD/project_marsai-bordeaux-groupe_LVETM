// Decode le token JWT stocké dans le localStorage pour récupérer les infos de l'utilisateur connecté (id, email, role)
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

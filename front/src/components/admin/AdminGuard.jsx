import { Navigate } from "react-router-dom";
import { decodeToken } from "../../utils/decodeToken.js";

/**
 * Bloque l'accès aux routes /admin/* pour les selectors et les utilisateurs non connectés.
 * Les selectors sont redirigés vers /selector/videos.
 */
export default function AdminGuard({ children }) {
  const user = decodeToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "selector") {
    return <Navigate to="/selector/videos" replace />;
  }

  return children;
}

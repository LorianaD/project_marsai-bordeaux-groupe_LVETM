import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { decodeToken } from "../../utils/decodeToken.js";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();


  // Bloque l'accès aux routes /admin pour les sélectionneurs
  useEffect(() => {
    const user = decodeToken();
    if (
      user?.role === "selector" && location.pathname.startsWith("/admin") &&
      location.pathname !== "/admin/login"
    ) {
      alert("Vous n'avez pas l'autorisation d'accéder à cette page.");
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Outlet />
    </div>
  );
}

export default AdminLayout;

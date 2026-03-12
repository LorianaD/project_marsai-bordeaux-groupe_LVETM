import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../utils/decodeToken";

// Code qui permet de sécuriser les routes et evité que le publique ai accés au pages "admin" et "selector"
function RequireAuth() {

    const user = decodeToken();

    return user ? <Outlet /> : <Navigate to="/login" replace />
    
}

export default RequireAuth
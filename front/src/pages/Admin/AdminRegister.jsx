import RegisterForm from "../../components/admin/RegisterForm.jsx";
import { Navigate, useSearchParams } from "react-router-dom";

// ==================================
// Page d'enregistrement utilisateurs
// ==================================

function AdminRegister() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("token") || "";

  /* evite d'ouvrir /register sans invitation par token */
  if (!inviteToken) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegisterForm inviteToken={inviteToken} />
    </div>
  );
}

export default AdminRegister;

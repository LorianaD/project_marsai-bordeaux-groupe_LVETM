import RegisterForm from "../../components/admin/RegisterForm.jsx";
import { useSearchParams } from "react-router-dom";

// ==================================
// Page d'enregistrement utilisateurs
// ==================================

function AdminRegister() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("token") || "";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegisterForm inviteToken={inviteToken} />
    </div>
  );
}

export default AdminRegister;

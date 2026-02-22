import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/decodeToken.js";

function AdminEntryButton() {
    const navigate = useNavigate();

    const handleGo = () => {
        const user = decodeToken(); // relu maintenant
        navigate(user ? "/admin" : "/login");
    };

    return (
        <button type="button" onClick={handleGo} className="text-[10px] font-bold tracking-[5px] uppercase cursor-pointer" >
            Espace administrateur
        </button>
    );
}

export default AdminEntryButton;
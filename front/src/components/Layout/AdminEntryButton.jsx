import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/decodeToken.js";

function AdminEntryButton() {
    const navigate = useNavigate();

    const handleGo = () => {
        const user = decodeToken();
        if (!user) {
            navigate("/login");
            return;
        }
        if (user.role === "selector") {
            navigate("/selector/videos");
        } else {
            navigate("/admin");
        }
    };

    return (
        <button type="button" onClick={handleGo} className="text-[10px] font-bold tracking-[5px] uppercase cursor-pointer" >
            Espace administrateur
        </button>
    );
}

export default AdminEntryButton;
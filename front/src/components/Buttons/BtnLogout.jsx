import { useNavigate } from "react-router";
import logout from "../../utils/logout";

function BtnLogout() {

    const navigate = useNavigate();

    return(
        <button type="button" onClick={() => { logout(); navigate("/login", { replace: true }); }}
            className="h-full rounded-xl bg-black/10 px-3 py-2 text-sm text-black/80 hover:bg-black/15 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
        >
            Déconnexion
        </button>
    )
}

export default BtnLogout
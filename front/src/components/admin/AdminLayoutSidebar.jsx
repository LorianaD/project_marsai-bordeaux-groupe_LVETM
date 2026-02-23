import { useNavigate } from "react-router-dom";
import { ADMIN_NAV } from "./adminNav.js";
import { useEffect, useState } from "react";
import { decodeToken } from "../../utils/decodeToken.js";
import logout from "../../utils/logout.js";


const API_URL = import.meta.env.VITE_API_URL;

export default function AdminLayoutSidebar({ active }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  /*=======================================================
    Décodage du token pour récupérer l'utilisateur courant
  =======================================================*/
  useEffect(() => {
    setCurrentUser(decodeToken());
  }, []);

  return (
<<<<<<< HEAD
    <aside className="hidden w-[270px] shrink-0 flex-col rounded-3xl border border-black/10 bg-black/5 p-4 dark:border-[#F6339A]/60 dark:bg-white/5 md:flex">
      {/*======================================================================
         Profil : affiche avatar nom prénom et email de l'utilisateur connecté
      =======================================================================*/}
      <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/10 p-3 dark:border-[#F6339A]/60 dark:bg-black/30">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F6339A]/15 text-lg">
          👤
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-black dark:text-white">
            {currentUser
              ? `${currentUser.name || ""} ${currentUser.last_name || ""}`
              : "..."}
          </p>
          <p className="truncate text-xs text-black/60 dark:text-white/60">
            {currentUser?.email || ""}
          </p>
=======
    <aside className="hidden w-[270px] flex shrink-0 flex-col rounded-3xl border border-black/10 bg-black/5 p-4 dark:border-[#FFFFFF]/10 dark:bg-white/5 md:flex h-full gap-[100px] justify-between">
      <div>
        {/* Profil */}
        <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/10 p-3 dark:border-[#FFFFFF]/20 dark:bg-black/30">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F6339A]/15 text-lg">
            👤
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-black dark:text-white">
              {currentUser
                ? `${currentUser.name || ""} ${currentUser.last_name || ""}`
                : "..."}
            </p>
            <p className="truncate text-xs text-black/60 dark:text-white/60">
              {currentUser?.email || ""}
            </p>
          </div>
>>>>>>> main
        </div>

        {/* Menu */}
        <nav className="mt-4 space-y-1">
          {ADMIN_NAV.map((link) => {
            const isActive = link.id === active;

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => link.path && navigate(link.path)}
                className={[
                  "group w-full rounded-xl px-3 py-2 text-left text-sm transition",
                  isActive
                    ? "bg-black/10 text-black dark:bg-white/10 dark:text-white"
                    : "text-black/70 hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  {/* Icône */}
                  {link.id === "overview" ? (
                    // Garde l’icône d’origine pour "Vue d'ensemble"
                    <div className="grid h-5 w-5 shrink-0 place-items-center">
                      {/* Si tu avais déjà un autre SVG ici, remplace celui-ci par le tien */}
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-black dark:text-white"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="8" height="8" rx="2" />
                        <rect x="13" y="3" width="8" height="5" rx="2" />
                        <rect x="13" y="10" width="8" height="11" rx="2" />
                        <rect x="3" y="13" width="8" height="8" rx="2" />
                      </svg>
                    </div>
                  ) : (
                    link.icon && (
                      <img
                        src={`${API_URL}/uploads/adminsidebar/${link.icon}`}
                        alt=""
                        className={[
                          "h-5 w-5 shrink-0",
                          "dark:invert",
                          isActive
                            ? "opacity-100"
                            : "opacity-80 group-hover:opacity-100",
                        ].join(" ")}
                        loading="lazy"
                        draggable={false}
                      />
                    )
                  )}

                  <span className="truncate">{link.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
        

        {/* Spacer invisible (garde la hauteur, clair + dark) */}
        {/* <div className="mt-4 flex-1 opacity-0 pointer-events-none" aria-hidden="true" /> */}


      </div>
      {/* Bloc Mars AI */}
      <div className="mt-4 rounded-2xl border border-black/10 bg-black/10 p-3 dark:border-[#FFFFFF]/20 dark:bg-black/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-black dark:text-white">
              Mars AI
            </p>
            <p className="text-xs text-black/60 dark:text-white/60">
              Collaborateur
            </p>
          </div>

          <span className="rounded-full bg-black/10 px-3 py-1 text-xs text-black/80 dark:bg-white/10 dark:text-white/80">
            {currentUser?.role || ""}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
          className="mt-3 w-full rounded-xl bg-black/10 px-3 py-2 text-sm text-black/80 hover:bg-black/15 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

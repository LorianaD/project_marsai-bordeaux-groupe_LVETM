import { Link, useNavigate } from "react-router-dom";
import { ADMIN_NAV } from "./adminNav.js";
import { useState, useEffect } from "react";
import { decodeToken } from "../../utils/decodeToken.js";

/**
 * Sidebar admin commune (Overview, Gestion films, Événements, etc.).
 * Utilisée avec le même design : profil, nav, spacer invisible, bloc Mars AI.
 */
export default function AdminLayoutSidebar({ active }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(decodeToken());
  }, []);

  return (
    <aside className="hidden w-[270px] shrink-0 flex-col rounded-3xl border border-black/10 bg-black/5 p-4 dark:border-[#F6339A]/60 dark:bg-white/5 md:flex">
      {/* Profil */}
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
        </div>
      </Link>

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
                "w-full rounded-xl px-3 py-2 text-left text-sm transition",
                isActive
                  ? "bg-black/10 text-black dark:bg-white/10 dark:text-white"
                  : "text-black/70 hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white",
              ].join(" ")}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Spacer invisible (garde la hauteur, clair + dark) */}
      <div
        className="mt-4 flex-1 opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="mt-4 rounded-2xl border border-black/10 bg-black/10 p-3 dark:border-[#F6339A]/60 dark:bg-black/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Mars AI</p>
            <p className="text-xs text-black/60 dark:text-white/60">
              Collaborateur
            </p>
          </div>
          <span className="rounded-full bg-black/10 px-3 py-1 text-xs dark:bg-white/10">
            {currentUser?.role || ""}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin/login");
          }}
          className="mt-3 w-full rounded-xl bg-black/10 px-3 py-2 text-sm text-black/80 hover:bg-black/15 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
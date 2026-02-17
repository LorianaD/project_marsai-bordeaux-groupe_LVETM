import { useNavigate } from "react-router-dom";
import { ADMIN_NAV } from "./adminNav.js";
import { useState, useEffect } from "react";
import { decodeToken } from "../../utils/decodeToken.js";

export default function AdminSidebarModal({
  open,
  onClose,
  active = "leaderboard",
}) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(decodeToken());
  }, []);

  if (!open) return null;

  const handleItemClick = (path) => {
    if (path) navigate(path);
    onClose();
  };

  // Élément de menu
  const Item = ({ id, label, path, badge }) => {
    const isActive = id === active;

    return (
      <button
        type="button"
        onClick={() => handleItemClick(path)}
        className={[
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition",
          isActive
            ? "bg-[#2F6BFF]/20 text-[#8FB1FF] ring-1 ring-[#2F6BFF]/25"
            : "text-white/70 hover:bg-white/5 hover:text-white/85",
        ].join(" ")}
      >
        <span className="flex items-center gap-3">
          <span
            className={[
              "h-2 w-2 rounded-full",
              isActive ? "bg-[#2F6BFF]" : "bg-white/20",
            ].join(" ")}
          />
          {label}
        </span>

        {badge ? (
          <span className="rounded-full bg-[#2F6BFF] px-2 py-0.5 text-xs font-semibold text-white">
            {badge}
          </span>
        ) : null}
      </button>
    );
  };

  return (
    // Conteneur plein écran de la modal
    <div className="fixed inset-0 z-50">
      {/* Overlay cliquable */}
      <button
        onClick={onClose}
        aria-label="Close sidebar"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />

      {/* Panneau de la sidebar */}
      <aside className="absolute left-6 top-6 h-[calc(100vh-48px)] w-[320px] overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="text-sm font-semibold text-white/85">Mars AI</div>

          <button
            onClick={onClose}
            className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10"
          >
            Fermer
          </button>
        </div>

        {/* Profil */}
                        <div className="flex flex-col items-center px-5 pb-5 pt-4">
          <div className="relative">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-[#F6339A]/15 text-3xl ring-2 ring-[#B84DFF]/60">
              👤
            </div>
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-[#1AFF7A] ring-2 ring-black" />
          </div>

          <div className="mt-3 text-sm font-semibold text-white/90">
            {currentUser ? `${currentUser.name || ""} ${currentUser.last_name || ""}` : "..."}
          </div>
          <div className="mt-1 text-[11px] tracking-widest text-white/45">
            {currentUser?.role?.toUpperCase() || ""}
          </div>
        </div>

        {/* Navigation — même liste que AdminLayoutSidebar (adminNav.js) */}
        <div className="space-y-2 px-5">
          {ADMIN_NAV.map((link) => (
            <Item
              key={link.id}
              id={link.id}
              label={link.label}
              path={link.path}
            />
          ))}
        </div>

        {/* Carte footer */}
        <div className="mx-5 mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
          <div className="text-sm font-semibold text-white/85">Mars AI</div>
          <div className="mt-1 text-xs text-white/45">Dashboard</div>

          <button onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin/login");
          }}
          className="mt-4 w-full rounded-xl bg-[#0E1628] py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 hover:bg-[#111c34]"
          >
            Déconnexion
          </button>
        </div>
      </aside>
    </div>
  );
}

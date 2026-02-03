import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ active = "overview" }) {
  const navigate = useNavigate();

  const Item = ({ id, label, to }) => {
    const isActive = id === active;

    return (
      <button
        type="button"
        onClick={() => to && navigate(to)}
        className={[
          "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
          // LIGHT
          isActive
            ? "bg-[#2F6BFF]/15 text-[#2F6BFF] ring-1 ring-[#2F6BFF]/15"
            : "text-black/70 hover:bg-black/5 hover:text-black/85",
          // DARK overrides
          "dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white/90",
          isActive
            ? "dark:bg-[#2F6BFF]/20 dark:text-[#8FB1FF] dark:ring-[#2F6BFF]/25"
            : "",
        ].join(" ")}
      >
        {/* petit dot (pas une “lettre”) */}
        <span
          className={[
            "h-2 w-2 rounded-full",
            isActive ? "bg-[#2F6BFF]" : "bg-black/15",
            "dark:bg-white/20",
            isActive ? "dark:bg-[#2F6BFF]" : "",
          ].join(" ")}
        />
        {label}
      </button>
    );
  };

  return (
    <aside
      className="
       h-[calc(100vh-40px)] w-[290px] px-4
      "
    >
      <div className="flex h-full flex-col px-5 py-6">
        {/* PROFILE CARD */}
        <div className="rounded-[18px] bg-white p-5 ring-1 ring-black/5 shadow-sm dark:bg-white/5 dark:ring-white/10">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="h-[86px] w-[86px] overflow-hidden rounded-full ring-2 ring-[#B84DFF]/70 bg-black/5 dark:bg-white/10">
                <img
                  src="/imgs/avatar.png"
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  draggable="false"
                />
              </div>
              <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-[#1AFF7A] ring-2 ring-white dark:ring-black" />
            </div>

            <div className="mt-4 text-base font-semibold text-black/85 dark:text-white/90">
              Ocean Breeze
            </div>
            <div className="mt-1 text-[11px] tracking-widest text-black/40 dark:text-white/45">
              RÉALISATEUR STUDIO
            </div>
          </div>
        </div>

        {/* NAV CARD */}
        <div
          className="mt-5 rounded-[18px] bg-white p-3 ring-1 ring-black/5 shadow-sm
                dark:bg-white/5 dark:ring-white/10"
        >
          <div className="space-y-1">
            <Item id="overview" label="Overview" to="/admin" />
            <Item id="gestion-films" label="Gestion films" to="/admin/videos" />
            <Item
              id="distribution-jury"
              label="Distribution & Jury"
              to="/admin/jury"
            />
            <Item
              id="resultats"
              label="Resultats & classement"
              to="/admin/results"
            />
            <Item
              id="leaderboard"
              label="Leaderboard officiel"
              to="/admin/leaderboard"
            />
            <Item id="events" label="Evenements" to="/admin/events" />
            <Item id="messages" label="Messages" to="/admin/messages" />
            <Item
              id="festival-box"
              label="Festival Box"
              to="/admin/festival-box"
            />
            <Item
              id="config"
              label="Configuration Festival"
              to="/admin/config"
            />
          </div>
        </div>

        {/* BOTTOM CARD */}
        <div className="mt-auto pt-6">
          <div className="rounded-[18px] bg-white p-4 ring-1 ring-black/5 shadow-sm dark:bg-white/10 dark:ring-white/10">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2F6BFF]" />
              </span>
              <div className="text-sm font-semibold text-black/85 dark:text-white/85">
                Mars AI
              </div>
            </div>

            <div className="mt-1 text-xs text-black/45 dark:text-white/45">
              Dashboard
            </div>

            <button
              type="button"
              className="
                mt-4 w-full rounded-xl bg-[#0E1628] py-3 text-sm font-semibold text-white
                hover:bg-[#111c34]
              "
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

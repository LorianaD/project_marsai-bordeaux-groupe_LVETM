export default function AdminSidebarModal({
  open,
  onClose,
  active = "gestion-films",
}) {
  if (!open) return null;

  const Item = ({ id, label, badge }) => {
    const isActive = id === active;
    return (
      <button
        onClick={onClose}
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
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        aria-label="Close sidebar"
      />

      {/* panel */}
      <aside className="absolute left-6 top-6 h-[calc(100vh-48px)] w-[320px] overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="text-sm font-semibold text-white/85">Mars AI</div>
          <button
            onClick={onClose}
            className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10"
          >
            Fermer
          </button>
        </div>

        {/* profile */}
        <div className="flex flex-col items-center px-5 pb-5 pt-4">
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#B84DFF]/60">
              <img
                src="/assets/avatar.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-[#1AFF7A] ring-2 ring-black" />
          </div>

          <div className="mt-3 text-sm font-semibold text-white/90">
            Ocean Breeze
          </div>
          <div className="mt-1 text-[11px] tracking-widest text-white/45">
            RÉALISATEUR STUDIO
          </div>
        </div>

        {/* nav */}
        <div className="space-y-2 px-5">
          <Item id="overview" label="Overview" />
          <Item id="gestion-films" label="Gestion films" />
          <Item id="distribution-jury" label="Distribution & Jury" />
          <Item id="resultats" label="Résultats & classement" />
          <Item id="leaderboard" label="Leaderboard officiel" />
          <Item id="events" label="Evenements" />
          <Item id="messages" label="Messages" badge="2" />
          <Item id="festival-box" label="Festival Box" />
          <Item id="config" label="Configuration Festival" />
        </div>

        {/* bottom card */}
        <div className="mx-5 mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
          <div className="text-sm font-semibold text-white/85">Mars AI</div>
          <div className="mt-1 text-xs text-white/45">Dashboard</div>
          <button className="mt-4 w-full rounded-xl bg-[#0E1628] py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 hover:bg-[#111c34]">
            Log out
          </button>
        </div>
      </aside>
    </div>
  );
}

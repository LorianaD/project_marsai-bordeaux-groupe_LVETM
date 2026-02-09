export default function AdminHero({ name = "Ocean" }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/10 dark:border-white/10 min-h-[240px]">
      {/* Image de fond */}
      <img
        src="/imgs/admin-hero.jpg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      {/* Overlay léger pour éviter les zones noires et améliorer lisibilité */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenu */}
      <div className="relative flex h-full items-center justify-between gap-8 px-10 py-10 md:px-14 md:py-12">
        <div>
          <h1 className="text-[36px] font-extrabold leading-tight tracking-tight text-white md:text-[42px]">
            Heureux de vous revoir,{" "}
            <span className="text-[#3B82F6]">{name}</span>
          </h1>

          <p className="mt-3 max-w-[720px] text-sm text-white/90">
            Le festival approche. N&apos;oubliez pas de finaliser vos
            soumissions avant le{" "}
            <span className="font-medium text-white">15 Mai</span>.
          </p>
        </div>

        <button className="group relative flex items-center gap-3 rounded-full bg-[#22C55E]/90 px-7 py-3 text-sm font-semibold text-black ring-1 ring-white/30 transition hover:bg-[#22C55E]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="text-black"
            >
              <path
                d="M12 12a5 5 0 100-10 5 5 0 000 10z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M3 22a9 9 0 0118 0"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          ADMIN MANAGEMENT
        </button>
      </div>
    </div>
  );
}

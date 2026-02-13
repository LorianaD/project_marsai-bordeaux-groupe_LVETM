/**
 * Barre du haut commune à toutes les pages admin : MARS AI + Administration — [page] + sous-titre.
 */
export default function AdminTopBar({ pageTitle, subtitle }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-3xl border border-black/10 bg-black/5 px-5 py-3 dark:border-[#F6339A]/60 dark:bg-white/5">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-black/10 px-4 py-2 text-[20px] font-semibold tracking-[0.22em] uppercase dark:bg-white/10">
          MARS <span className="text-[#F6339A]">AI</span>
        </span>
        <div className="hidden md:block">
          <p className="text-[16px] font-semibold">
            Administration — <span className="text-black/70 dark:text-white/70">{pageTitle}</span>
          </p>
          {subtitle && (
            <p className="text-[15px] text-black/60 dark:text-white/60">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

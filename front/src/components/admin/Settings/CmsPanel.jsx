function CmsPanel({ pageLabel, sectionLabel, forcedLocale, children }) {
    return(
        <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5 md:p-6">
            
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-[18px] font-bold text-black dark:text-white">
                        {pageLabel ?? "—"} · {sectionLabel ?? "—"}
                    </h2>
                    <p className="text-[12px] text-black/60 dark:text-white/60">
                        Langue d’édition : <span className="font-semibold">{forcedLocale.toUpperCase()}</span>
                    </p>
                </div>
            </div>

            {children}

        </div>
    )
}

export default CmsPanel
function CmsTopNav({ registry, activePageId, onSelectPage, forcedLocale, onLocaleChange }) {
    return (
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        
            {/* MOBILE: select pages */}
            <div className="md:hidden">
                <label className="mb-1 block text-[12px] text-black/60 dark:text-white/60">
                    Page
                </label>
                <select value={activePageId} onChange={(e) => onSelectPage(e.target.value)}
                    className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-[14px] dark:bg-white/5 dark:text-white dark:border-white/15"
                >
                    {registry.map((p) => (
                        <option key={p.pageId} value={p.pageId}>
                            {p.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* DESKTOP: tabs pages */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">

                {registry.map((p) => {

                    const active = p.pageId === activePageId;

                    return (

                        <button key={p.pageId} type="button" onClick={() => onSelectPage(p.pageId)}
                            className={[
                                "px-4 py-2 rounded-full border text-[14px] transition",
                                active ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-transparent text-black border-black/15 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5",
                            ].join(" ")}
                        >
                            {p.label}
                        </button>

                    );

                })}

            </div>

        </div>
        
    );
}

export default CmsTopNav;
function CmsLanguageTabs({ value, onChange }) {
    return(
        <div className="">
            <button type="button" onClick={() => onChange("fr")}
                className={[ "px-4 py-2 rounded-full border text-[14px] transition",
                    value === "fr" ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-transparent text-black border-black/15 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5", 
                ].join(" ")}
            >
                🇫🇷 FR
            </button>

            <button type="button" onClick={() => onChange("en")}
                className={[ "px-4 py-2 rounded-full border text-[14px] transition",
                    value === "en" ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-transparent text-black border-black/15 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5",
                ].join(" ")}
            >
                🇬🇧 EN
            </button>
        </div>
    )
}

export default CmsLanguageTabs
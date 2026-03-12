import englishFlag from "../../../assets/imgs/icones/englishFlag.png";
import frenchFlag from "../../../assets/imgs/icones/franceFlag.png";

function CmsLanguageTabs({ value, onChange }) {
    return(
        <div className="flex">
            <button type="button" onClick={() => onChange("fr")}
                className={[ "px-4 py-2 rounded-full border text-[14px] transition flex items-center gap-[3px]",
                    value === "fr" ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-transparent text-black border-black/15 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5", 
                ].join(" ")}
            >
                <img src={frenchFlag} alt="" className="h-[10px]"/>
                <span className="block">FR</span>
            </button>

            <button type="button" onClick={() => onChange("en")}
                className={[ "px-4 py-2 rounded-full border text-[14px] transition flex items-center gap-[3px]",
                    value === "en" ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-transparent text-black border-black/15 hover:bg-black/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5",
                ].join(" ")}
            >
                <img src={englishFlag} alt="" className="h-[10px]"/>
                <span className="block">EN</span>
            </button>
        </div>
    )
}

export default CmsLanguageTabs
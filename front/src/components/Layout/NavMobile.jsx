import { Link } from "react-router";

import closeMenuIcon from "../../assets/imgs/icones/mobile-nav.svg";
import { useTranslation } from "react-i18next";

function NavMobile() {

    const { t } =useTranslation("header");

    return(
        <div className="flex w-full flex-col items-center gap-[20px] rounded-[30px] bg-white dark:bg-black shadow-[0_0_12px_0_rgba(0,0,0,0.25)] text-[#3B82F6] dark:text-[#FFFFFFF]">

            {/* Header */}
            <div className="flex items-center justify-between self-stretch p-2 rounded-full">
                <Link to="/">
                    <h1 className="text-center font-bold uppercase text-[14px] leading-[20px] tracking-[-0.7px]">
                        <span>MARS</span>
                        <span className="bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                            AI
                        </span>
                    </h1>
                </Link>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex w-[36px] h-[36px] flex-col items-center justify-center p-[8px] shrink-0"
                >
                    <img src={ closeMenuIcon } alt="" />
                </button>
            </div>

            {/* Body */}
            <div>
                <div>
                    <ul className="flex flex-col items-start justify-center self-stretch p-[20px] gap-[41px] text-[16px] font-bold leading-[15px] tracking-[3px] uppercase">
                        <li><Link to="/" onClick={onClose}>{t("home")}</Link></li>
                        <li><Link to="/gallery" onClick={onClose}>{t("gallery")}</Link></li>
                        <li><Link to="/events" onClick={onClose}>{t("program")}</Link></li>
                        <li><Link to="/jury" onClick={onClose}>{t("jury")}</Link></li>
                    </ul>                 
                </div>
                <div className="hidden md:flex items-center justify-center gap-[34px]">
                    <Link to="/participation" className="flex items-center justify-center gap-[10px] px-[40px] py-[10px] rounded-[20px] bg-[linear-gradient(90deg,#2B7FFF_0%,#9810FA_100%)] text-white text-center text-[16px] font-bold leading-[16px] uppercase">
                        {t("participate")}
                    </Link>
                    <button
                        type="button"
                        onClick={toggleLang}
                        className="h-[46px] cursor-pointer"
                        aria-label={isFr ? "Switch to English" : "Passer en français"}
                        title={isFr ? "English" : "Français"}
                    >
                        <img
                            src={isFr ? englishFlag : frenchFlag}
                            alt={isFr ? "English" : "Français"}
                            className="h-full w-full "
                        />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div>

            </div>

        </div>
    )
}

export default NavMobile
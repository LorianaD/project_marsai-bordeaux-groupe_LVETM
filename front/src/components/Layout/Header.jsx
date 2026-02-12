import { Link } from "react-router"
import { useTranslation } from "react-i18next";

import englishFlag from "../../assets/imgs/icones/englishFlag.png";
import frenchFlag from "../../assets/imgs/icones/franceFlag.png";

import mobileNavIcon from "../../assets/imgs/icones/mobile-nav.svg";

import NavMobile from "./NavMobile";
import { useState } from "react";

function Header() {
    // console.log("function header ok");
    
    const { t, i18n } = useTranslation("header");

    const toggleLang = () => {

        const next = i18n.language?.startsWith("fr") ? "en" : "fr";
        i18n.changeLanguage(next);
        localStorage.setItem("lang", next);

    };

    const isFr = i18n.language?.startsWith("fr");

    const [ isNavOpen, setIsNavOpen ] = useState(false);
    const openNav = () => setIsNavOpen(true);
    const closeNav = () => setIsNavOpen(false);

    return(
        <>
            <header className="flex items-center justify-between w-full p-2 my-[20px] rounded-full border border-[rgba(255,255,255,0.10)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.40)] z-50 md:md:rounded-none md:bg-transparent md:shadow-none md:border-0 md:border-b md:border-[rgba(0,0,0,0.20)] md:px-[40px] md:py-[30px] md:m-0 text-[#3B82F6] dark:text-[#FFFFFF] dark:border-[#F6339A]/60 dark:bg-black dark:text-white">
                
                <Link to="/">
                    <h1 className="text-center font-bold uppercase text-[14px] leading-[20px] tracking-[-0.7px] md:text-[20px] md:leading-[28px] md:tracking-[-0.5px]">
                        <span>MARS</span>
                        <span className="bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                            AI
                        </span>
                    </h1>
                </Link>
                
                <nav className="hidden md:block">
                    <ul className="flex items-center justify-center gap-[41px] text-[16px] font-bold leading-[15px] tracking-[3px] uppercase">
                        <li><Link to="/">{t("home")}</Link></li>
                        <li><Link to="/gallery">{t("gallery")}</Link></li>
                        <li><Link to="/events">{t("program")}</Link></li>
                        <li><Link to="/jury">{t("jury")}</Link></li>
                    </ul>
                </nav>

                <div className="hidden md:flex items-center justify-center gap-[34px]">
                    <Link to="/participation" className="flex items-center justify-center gap-[10px] px-[40px] py-[10px] rounded-[20px] bg-[linear-gradient(90deg,#2B7FFF_0%,#9810FA_100%)] text-white text-center text-[16px] font-bold leading-[16px] uppercase">
                        {t("participate")}
                    </Link>
                    <button
                        type="button"
                        onClick={toggleLang}
                        className="h-[46px] cursor-pointer flex items-center justify-center rounded-lg dark:bg-white/10 dark:p-0.5"
                        aria-label={isFr ? "Switch to English" : "Passer en français"}
                        title={isFr ? "English" : "Français"}
                    >
                        <img
                            src={isFr ? englishFlag : frenchFlag}
                            alt={isFr ? "English" : "Français"}
                            className="h-full w-full object-contain"
                        />
                    </button>
                </div>

                <button
                    type="button" onClick={openNav}
                    className="flex md:hidden w-[35.973px] h-[35.973px] flex-col items-center justify-center p-[8px] shrink-0"
                    aria-label=""
                >
                    <img src={ mobileNavIcon } alt="" />
                </button>

            </header>

            {isNavOpen && (
                <div className="fixed inset-0 z-[999] md:hidden">

                    {/* overlay */}
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        onClick={closeNav}
                        aria-label="Close menu"
                    />

                    {/* panel */}
                    <div className="relative z-10 mx-auto mt-4 w-[calc(100%-20px)]">
                        <NavMobile onClose={closeNav} onToggleLang={toggleLang} OnIsFr={isFr} />
                    </div>

                </div>
            )}
        </>

    )
}

export default Header
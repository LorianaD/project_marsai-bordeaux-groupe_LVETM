import { Link, useLocation } from "react-router"
import { useTranslation } from "react-i18next";

import englishFlag from "../../assets/imgs/icones/englishFlag.png";
import frenchFlag from "../../assets/imgs/icones/franceFlag.png";

import mobileNavIcon from "../../assets/imgs/icones/mobile-nav.svg";

import NavMobile from "./NavMobile.jsx";
import { useEffect, useState } from "react";

import { resolveCmsAsset } from "../../utils/cmsAssets.js";
import useCmsContent from "../../hooks/useCmsContent.js";
import { isVisible } from "../../utils/isVisible.js";

function Header() {
    // console.log("function header ok");
    
    // t = traduit, i18n = gere les langues
    const { t, i18n } = useTranslation("header");

    const toggleLang = () => {

        // langue actuelle et potensielle
        const next = i18n.language?.startsWith("fr") ? "en" : "fr";

        // change la langue de toute l'application / de tous le web
        i18n.changeLanguage(next);

        // stocke la langue choisie pour : la restaure au rechargement et la garde en base à la préférence utilisateur
        localStorage.setItem("lang", next);

    };

    // permet d' afficher le drapeau en base à la langue et changer les textes
    const isFr = i18n.language?.startsWith("fr");

    const [ isNavOpen, setIsNavOpen ] = useState(false);
    const openNav = () => setIsNavOpen(true);
    const closeNav = () => setIsNavOpen(false);

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "header"

    const { pathname } = useLocation();
    const isHome = pathname === "/";

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 80);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);    

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(locale);

    if (loading) return null;

    const logoSrc = resolveCmsAsset(content?.[section]?.logo);

    const firstLabel = content?.[section]?.first;
    const firstLink  = content?.[section]?.first_link;

    const secondeLabel = content?.[section]?.seconde;
    const secondeLink  = content?.[section]?.seconde_link;

    const thirdLabel = content?.[section]?.third;
    const thirdLink = content?.[section]?.third_link;

    const btnLabel = content?.[section]?.btn;
    const btnLink = content?.[section]?.btn_link;

    return(
        <>
            <header className={`flex items-center justify-between w-full p-2 my-[10px] md:m-0 md:px-[40px] md:py-[20px] lg:py-[30px] rounded-full border border-[rgba(255,255,255,0.10)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.40)] z-50 md:rounded-none md:bg-transparent md:shadow-none md:border-0 md:border-b md:border-[rgba(0,0,0,0.20)] ${isHome && !scrolled ? "text-white" : "text-[#3B82F6] md:bg-white dark:md:bg-transparent"} ${isHome ? "fixed md:top-0 md:left-0" : "static"} dark:text-[#FFFFFF] dark:border-[#FFFFFF]/60 dark:text-white`}>
                
                {/* LEFT : LOGO */}
                {logoSrc ? (
                    <Link to="/">
                        <div className="max-w-[100px] min-w-[20px]">
                            <img src={logoSrc} alt="Logo" className="w-full" draggable={false}/>
                        </div> 
                    </Link>
                ): null}

                {/* CENTER : NAVIGATEUR */}
                <nav className="hidden md:flex items-center justify-center gap-[20px] lg:gap-[34px]">
                    <ul className="flex items-center justify-center gap-[41px] text-[12px] lg:text-[16px] font-bold leading-[12px] lg:leading-[15px] tracking-[3px] uppercase">
                        
                        <li><Link to={content?.[section]?.home_link  || "/"}>{content?.[section]?.home || t("home")}</Link></li>
                        
                        {isVisible(content, section, "first") && firstLabel && firstLink && (
                            <li>
                                <Link to={firstLink}>
                                    {firstLabel}
                                </Link>
                            </li>
                        )}

                        {isVisible(content, section, "seconde") && secondeLabel && secondeLink && (
                            <li>
                                <Link to={secondeLink}>
                                    {secondeLabel}
                                </Link>
                            </li>
                        )}


                        {isVisible(content, section, "third") && thirdLabel && thirdLink && (
                            <li>
                                <Link to={thirdLink}>
                                    {thirdLabel}
                                </Link>
                            </li>
                        )}


                    </ul>
                </nav>

                {/* RIGHT : BTN & LANGUE */}
                <div className="hidden md:flex items-center justify-center gap-[20px] lg:gap-[34px]">
                    {isVisible(content, section, "btn") && btnLabel && btnLink && (
                        <Link to={btnLink} className="flex items-center justify-center gap-[10px] px-[40px] py-[10px] rounded-[20px] bg-[linear-gradient(90deg,#2B7FFF_0%,#9810FA_100%)] text-white text-center text-[12px] lg:text-[16px] font-bold leading-[12px] lg:leading-[16px] uppercase">
                            {btnLabel}
                        </Link>
                    )}

                    {isVisible(content, section, "icon_country") && (

                        <button
                            type="button"
                            onClick={toggleLang}
                            className="h-[25px] lg:h-[46px] cursor-pointer flex items-center justify-center rounded-lg dark:bg-white/10 dark:p-0.5"
                            aria-label={isFr ? "Switch to English" : "Passer en français"}
                            title={isFr ? "English" : "Français"}
                        >
                            <img
                                src={isFr ? englishFlag : frenchFlag}
                                alt={isFr ? "English" : "Français"}
                                className="h-full w-full object-contain"
                            />
                        </button>

                    )}

                </div>


                {/****************
                 *  NAV MOBILE *
                ****************/}
                <button
                    type="button" onClick={openNav}
                    className="flex md:hidden w-[36px] h-[36px] flex-col items-center justify-center p-[8px] shrink-0"
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
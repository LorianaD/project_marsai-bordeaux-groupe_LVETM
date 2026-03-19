import { Link } from "react-router";

import closeMenuIcon from "../../assets/imgs/icones/X.svg";
import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";

import englishFlag from "../../assets/imgs/icones/englishFlag.png";
import frenchFlag from "../../assets/imgs/icones/franceFlag.png";
import { resolveCmsAsset } from "../../utils/cmsAssets";
import { isVisible } from "../../utils/isVisible";

function NavMobile({onClose, onToggleLang, OnIsFr}) {

    const { t, i18n } = useTranslation("header");

    const page = "layout";
    const section = "header"

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const isFr = i18n.language?.startsWith("fr");

    const toggleLang = () => {

        // langue actuelle et potensielle
        const next = i18n.language?.startsWith("fr") ? "en" : "fr";

        // change la langue de toute l'application / de tous le web
        i18n.changeLanguage(next);

        // stocke la langue choisie pour : la restaure au rechargement et la garde en base à la préférence utilisateur
        localStorage.setItem("lang", next);

    };

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    if (loading) return null;

    const logoSrc = resolveCmsAsset(content?.[page]?.[section]?.logo);

    const firstLabel = content?.[page]?.[section]?.first;
    const firstLink  = content?.[page]?.[section]?.first_link;

    const secondeLabel = content?.[page]?.[section]?.seconde;
    const secondeLink  = content?.[page]?.[section]?.seconde_link;

    const thirdLabel = content?.[page]?.[section]?.third;
    const thirdLink = content?.[page]?.[section]?.third_link;

    const btnLabel = content?.[page]?.[section]?.btn;
    const btnLink = content?.[page]?.[section]?.btn_link;

    const handleLinkClick = () => {
        onClose?.();
    };

    return(
        <div className="overscroll-auto flex flex-col items-start w-full h-screen gap-5 p-3 rounded-[30px] bg-white dark:bg-black shadow-[0_0_12px_0_rgba(0,0,0,0.25)] text-[#3B82F6] dark:text-[#FFFFFF]">

            {/* Header */}
            <div className="flex items-center justify-between self-stretch p-2 w-full">
                
                <Link to="/">
                    <div className="h-full max-w-25 min-w-5">
                        <img src={logoSrc} alt="Logo" className="w-full" draggable={false}/>
                    </div>
                </Link>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex w-9 h-9 flex-col items-center justify-center p-2 shrink-0"
                >
                    <img src={ closeMenuIcon } alt="" />
                </button>

            </div>

            {/* Body */}
            <div className="w-full">

                <div className="w-full">

                    <ul className="flex flex-col items-start justify-center self-stretch p-3 gap-10 w-full text-[16px] font-bold leading-4 tracking-[3px] uppercase">
                        <li><Link to="/" onClick={onClose}>{content?.[section]?.home || t("home")}</Link></li>
                        {isVisible(content, section, "first") && firstLabel && firstLink && (
                            <li>
                                <Link to={firstLink} onClick={handleLinkClick}>
                                    {firstLabel}
                                </Link>
                            </li>
                        )}
                        {isVisible(content, section, "seconde") && secondeLabel && secondeLink && (
                            <li>
                                <Link to={secondeLink} onClick={handleLinkClick}>
                                    {secondeLabel}
                                </Link>
                            </li>
                        )}
                        {isVisible(content, section, "third") && thirdLabel && thirdLink && (
                            <li>
                                <Link to={thirdLink} onClick={handleLinkClick}>
                                    {thirdLabel}
                                </Link>
                            </li>
                        )}
                    </ul>

                </div>

                <div className="flex items-center justify-center gap-5 w-full">
                    
                    {isVisible(content, section, "btn") && btnLabel && btnLink && (
                        <Link to={btnLink} onClick={handleLinkClick} className="flex items-center justify-center gap-3 px-10 py-3 rounded-[20px] bg-[linear-gradient(90deg,#2B7FFF_0%,#9810FA_100%)] text-white text-center text-[16px] font-bold leading-4 uppercase">
                            {btnLabel}
                        </Link>
                    )}

                    {isVisible(content, section, "icon_country") && (

                        <button
                            type="button"
                            onClick={toggleLang}
                            className="h-12 cursor-pointer flex items-center justify-center rounded-lg dark:bg-white/10 dark:p-0.5"
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

            </div>

        </div>
    )
}

export default NavMobile
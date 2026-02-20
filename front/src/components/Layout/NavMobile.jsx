import { Link } from "react-router";

import closeMenuIcon from "../../assets/imgs/icones/x.svg";
import { useTranslation } from "react-i18next";

import englishFlag from "../../assets/imgs/icones/englishFlag.png";
import frenchFlag from "../../assets/imgs/icones/franceFlag.png";

function NavMobile({onClose, onToggleLang, OnIsFr}) {

    const { t } = useTranslation("header");

    const section = "header"

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
        <div className="overscroll-auto flex flex-col items-start w-full h-screen gap-[20px] p-[10px] rounded-[30px] bg-white dark:bg-black shadow-[0_0_12px_0_rgba(0,0,0,0.25)] text-[#3B82F6] dark:text-[#FFFFFF]">

            {/* Header */}
            <div className="flex items-center justify-between self-stretch p-[8px] w-full">
                
                <Link to="/">
                    <div className="h-full max-w-[100px] min-w-[20px]">
                        <img src={logoSrc} alt="Logo" className="w-full" draggable={false}/>
                    </div>
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
            <div className="w-full">

                <div className="w-full">

                    <ul className="flex flex-col items-start justify-center self-stretch p-[10px] gap-[41px] w-full text-[16px] font-bold leading-[15px] tracking-[3px] uppercase">
                        <li><Link to="/" onClick={onClose}>{content?.[section]?.home || t("home")}</Link></li>
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

                </div>

                <div className="flex items-center justify-center gap-[20px] w-full">
                    
                    {isVisible(content, section, "btn") && btnLabel && btnLink && (
                        <Link to={btnLink} className="flex items-center justify-center gap-[10px] px-[40px] py-[10px] rounded-[20px] bg-[linear-gradient(90deg,#2B7FFF_0%,#9810FA_100%)] text-white text-center text-[16px] font-bold leading-[16px] uppercase">
                            {btnLabel}
                        </Link>
                    )}

                    {isVisible(content, section, "icon_country") && (

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

                    )}

                </div>

            </div>

        </div>
    )
}

export default NavMobile
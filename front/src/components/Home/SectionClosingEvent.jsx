import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useCmsContent from "../../hooks/useCmsContent";
import { resolveCmsAsset } from "../../utils/cmsAssets";
import { isSectionVisible, isVisible } from "../../utils/isVisible";

function SectionClosingEvent() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "closingEvent";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(locale);

    const cardIconSrc = resolveCmsAsset(content?.[section]?.card_icon);

    if (loading) return null;

    return(
        <>
            {isSectionVisible(content, section) && (
                <section className="flex flex-col md:flex-row items-center gap-[30px] justify-between px-[20px] md:px-[100px] self-stretch text-black dark:text-white w-full">
                    
                    {/* Div left */}
                    <div className="flex flex-col items-start justify-center gap-[32px] md:gap-8 flex-1 md:py-[2.5px] w-full">

                        {/* Eyebrowbox */}
                        {isVisible(content, section, "eyebrow") && (
                            <div className="flex h-[23px] items-center justify-center rounded-[4px] px-[12px] py-[4px] bg-[rgba(173,70,255,0.2)]">
                                <p className="text-[#C27AFF] text-[10px] font-bold leading-[15px] tracking-[1px] uppercase">
                                    {content?.[section]?.eyebrow}
                                </p>
                            </div>
                        )}

                        {/* Title */}
                        <h2 className="text-[48px] md:text-[90px] font-bold leading-[48px] md:leading-[90px] tracking-[-2.4px] md:tracking-[-4.5px] uppercase text-left w-full">
                            
                            {isVisible(content, section, "title_main") && (
                                <span>
                                    {content?.[section]?.title_main || t("closingEvent.title_main")}
                                </span>
                            )}

                            {isVisible(content, section, "title_accent") && (
                                <span className={`block text-[${content?.[section]?.title_accent_color}] italic`}>
                                    {content?.[section]?.title_accent || t("closingEvent.title_accent")}
                                </span>
                            )}

                        </h2>

                        {/* Paragraphe */}
                        <p className="text-[18px] font-normal leading-[29.25px] w-full flex flex-col">

                            {isVisible(content, section, "description_ligne1") && (
                                <span>{content?.[section]?.description_ligne1 || t("closingEvent.description.ligne1")}</span>
                            )}

                            {isVisible(content, section, "description_ligne2") && (
                                <span>{content?.[section]?.description_ligne2 || t("closingEvent.description.ligne2")}</span>
                            )}

                        </p>
                    </div>

                    {/* Card / Div right */}
                    <div className="w-full md:w-[280px] h-[313px] rounded-[32px] border border-black/10 bg-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center gap-[40px] md:p-[40px]">
                        
                        {isVisible(content, section, "card_icon") && (
                            <div className="w-[40px] h-[40px]">
                                <img src={ cardIconSrc } alt="" />
                            </div>
                        )}

                        <div>
                            {isVisible(content, section, "card_date") && (
                                <h3 className="text-center text-[36px] font-bold leading-[40px] tracking-[-1.8px] uppercase">
                                    {content?.[section]?.card_date || t("closingEvent.card.date")}
                                </h3>
                            )}
                            <p className="text-center text-[10px] font-bold leading-[15px] tracking-[3px] uppercase">

                                {isVisible(content, section, "card_hour") && (
                                    <span>{content?.[section]?.card_hour || t("closingEvent.card.hour")}</span>
                                )}

                                {isVisible(content, section, "card_localisation") && (
                                    <span> • {content?.[section]?.card_localisation || t("closingEvent.card.localisation")}</span>
                                )}

                            </p>
                        </div>

                        {isVisible(content, section, "card_ctaBooking") && (

                            <Link to={ content?.[section]?.card_ctaBooking_link } className="inline-flex items-center justify-center rounded-[16px] bg-[#CBCBCB] dark:bg-[#FFFFFF] py-[20px] px-[49.5px] text-[16px] font-bold leading-[24px] tracking-[1.6px] uppercase dark:text-[#000000]">
                                {content?.[section]?.card_ctaBooking || t("closingEvent.card.ctaBooking")}
                            </Link>

                        )}

                    </div>
                </section>
            )}
        </>
    )
}

export default SectionClosingEvent
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useCmsContent from "../../hooks/useCmsContent";
import { resolveCmsAsset } from "../../utils/cmsAssets";
import { isSectionVisible, isVisible } from "../../utils/isVisible";

function SectionClosingEvent() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "closingEvent";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    const cardIconSrc = resolveCmsAsset(content?.[page]?.[section]?.card_icon);

    if (loading) return null;

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col md:flex-row items-center gap-7.5 justify-between px-5 md:px-25 self-stretch text-black dark:text-white w-full">
                    
                    {/* Div left */}
                    <div className="flex flex-col items-start justify-center gap-8 md:gap-8 flex-1 md:py-[2.5px] w-full">

                        {/* Eyebrowbox */}
                        {isVisible(content, page, section, "eyebrow") && (
                            <div className="flex h-5.75 items-center justify-center rounded-sm px-3 py-1 bg-[rgba(173,70,255,0.2)]">
                                <p className="text-[#C27AFF] text-[10px] font-bold leading-3.75 tracking-[1px] uppercase">
                                    {content?.[page]?.[section]?.eyebrow}
                                </p>
                            </div>
                        )}

                        {/* Title */}
                        <h2 className="text-[48px] md:text-[90px] font-bold leading-12 md:leading-22.5 tracking-[-2.4px] md:tracking-[-4.5px] uppercase text-left w-full">
                            
                            {isVisible(content, page, section, "title_main") && (
                                <span>
                                    {content?.[page]?.[section]?.title_main || t("closingEvent.title_main")}
                                </span>
                            )}

                            {isVisible(content, page, section, "title_accent") && (
                                <span className={`block text-[${content?.[page]?.[section]?.title_accent_color}] italic`}>
                                    {content?.[page]?.[section]?.title_accent || t("closingEvent.title_accent")}
                                </span>
                            )}

                        </h2>

                        {/* Paragraphe */}
                        <p className="text-[18px] font-normal leading-[29.25px] w-full flex flex-col">

                            {isVisible(content, page, section, "description_ligne1") && (
                                <span>{content?.[page]?.[section]?.description_ligne1 || t("closingEvent.description.ligne1")}</span>
                            )}

                            {isVisible(content, page, section, "description_ligne2") && (
                                <span>{content?.[page]?.[section]?.description_ligne2 || t("closingEvent.description.ligne2")}</span>
                            )}

                        </p>
                    </div>

                    {/* Card / Div right */}
                    <div className="w-full md:w-70 h-78.25 rounded-4xl border border-black/10 bg-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center gap-10 md:p-10">
                        
                        {isVisible(content, page, section, "card_icon") && (
                            <div className="w-10 h-10">
                                <img src={ cardIconSrc } alt="" />
                            </div>
                        )}

                        <div>
                            {isVisible(content, page, section, "card_date") && (
                                <h3 className="text-center text-[36px] font-bold leading-10 tracking-[-1.8px] uppercase">
                                    {content?.[page]?.[section]?.card_date || t("closingEvent.card.date")}
                                </h3>
                            )}
                            <p className="text-center text-[10px] font-bold leading-3.75 tracking-[3px] uppercase">

                                {isVisible(content, page, section, "card_hour") && (
                                    <span>{content?.[page]?.[section]?.card_hour || t("closingEvent.card.hour")}</span>
                                )}

                                {isVisible(content, page, section, "card_localisation") && (
                                    <span> • {content?.[page]?.[section]?.card_localisation || t("closingEvent.card.localisation")}</span>
                                )}

                            </p>
                        </div>

                        {isVisible(content, page, section, "card_ctaBooking") && (

                            <Link to={ content?.[page]?.[section]?.card_ctaBooking_link } className="inline-flex items-center justify-center rounded-2xl bg-[#CBCBCB] dark:bg-[#FFFFFF] py-5 px-[49.5px] text-[16px] font-bold leading-6 tracking-[1.6px] uppercase dark:text-[#000000]">
                                {content?.[page]?.[section]?.card_ctaBooking || t("closingEvent.card.ctaBooking")}
                            </Link>

                        )}

                    </div>
                </section>
            )}
        </>
    )
}

export default SectionClosingEvent
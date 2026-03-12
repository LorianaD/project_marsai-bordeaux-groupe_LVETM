import { useTranslation } from "react-i18next";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";
import useCmsContent from "../../hooks/useCmsContent";

function SectionGoal() {

    const { t, i18n } = useTranslation("home");

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "goal";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    // console.log("goal card1_icon =", content?.goal?.card1_icon);
    // console.log("goal object =", content?.goal);

    const card1Icon = resolveCmsAsset(content?.[page]?.[section]?.card1_icon) || null;
    const card2Icon = resolveCmsAsset(content?.[page]?.[section]?.card2_icon) || null;
    const card3Icon = resolveCmsAsset(content?.[page]?.[section]?.card3_icon) || null;

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-center justify-center md:gap-5 px-5 md:px-18.75 md:py-5 self-stretch dark:text-[#FFFFFF] text-left w-full">
                    
                    {/* TITRE DE SECTION */}
                    
                        <h2 className="text-[36px] md:text-[60px] font-bold md:leading-15 tracking-[-1.8px] md:tracking-[-3px] uppercase leading-none w-full py-5">
                            {isVisible(content, page, section, "title_main") && (
                                <span className="block">{content?.[page]?.[section]?.title_main} </span>
                            )}
                            {isVisible(content, page, section, "title_accent") && (
                                <span className="block text-[#F6339A]">{content?.[page]?.[section]?.title_accent}</span>
                            )}
                        </h2>
                    

                    {/* CARDS */}
                    <div className="flex flex-col md:flex-row justify-center items-start gap-6.25 md:gap-12 self-stretch w-full md:h-125">
                        
                        {/* Card 1 */}
                        {isVisible(content, page, section, "card1_title") && (
                            <div className="md:w-100 rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-12 flex flex-col gap-6 dark:border-white/10 dark:bg-white/5 md:h-100">
                                <div className="flex w-16 h-16 justify-center items-center rounded-3xl bg-[rgba(0,212,146,0.10)]">
                                    {card1Icon && (<img src={card1Icon} alt={content?.[page]?.[section]?.card1_title || ""} className="w-8 h-8 shrink-0"/>)}
                                </div>
                                <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-8 tracking-[-1.2px] uppercase text-left w-144px">
                                    {content?.[page]?.[section]?.card1_title}
                                </h3>
                                <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-5.75 tracking-[1.4px] uppercase text-left">
                                    {content?.[page]?.[section]?.card1_description}
                                </p>
                            </div>
                        )}

                        {/* Card 2 */}
                        {isVisible(content, page, section, "card2_title") && (
                            <div className="md:w-100 rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-12 flex flex-col gap-6 dark:border-white/10 dark:bg-white/5 md:h-100">
                                <div className="flex w-16 h-16 justify-center items-center rounded-3xl bg-[rgba(0,184,219,0.10)]">
                                    {card2Icon && (<img src={card2Icon} alt={content?.[page]?.[section]?.card2_title || ""} className="w-8 h-8 shrink-0"/>)}
                                </div>
                                <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-8 tracking-[-1.2px] uppercase text-left w-36">
                                    {content?.[page]?.[section]?.card2_title}
                                </h3>
                                <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-3.75 tracking-[1.4px] uppercase text-left">
                                    {content?.[page]?.[section]?.card2_description}
                                </p>
                            </div>
                        )}

                        {/* Card 3 */}
                        {isVisible(content, page, section, "card3_title") && (
                            <div className="md:w-100 rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-12 flex flex-col gap-6 dark:border-white/10 dark:bg-white/5 md:h-100">
                                <div className="flex w-16 h-16 justify-center items-center rounded-3xl bg-[rgba(173,70,255,0.10)]">
                                    {card3Icon && (<img src={card3Icon} alt={content?.[page]?.[section]?.card3_title || ""} className="w-8 h-8 shrink-0"/>)}
                                </div>
                                <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-8 tracking-[-1.2px] uppercase text-left w-144px">
                                    {content?.[page]?.[section]?.card3_title}
                                </h3>
                                <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-5.75 tracking-[1.4px] uppercase text-left">
                                    {content?.[page]?.[section]?.card3_description}
                                </p>
                            </div>
                        )}

                    </div>

                </section>
            )}
        </>
    )
}

export default SectionGoal

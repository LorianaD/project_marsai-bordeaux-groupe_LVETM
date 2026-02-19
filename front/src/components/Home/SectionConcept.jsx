import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent.js";
import { isVisible } from "../../utils/isVisible";

function SectionConcept() {

    const { t, i18n } = useTranslation("home");

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "concept";

    const cards = [1, 2, 3, 4];

    const { content, loading, message } = useCmsContent(locale);

    // console.log("Content :", content, "Loading :", loading, "Message :", message);

    return (
        <section className="flex flex-col justify-center items-center gap-[20px] md:px-[80px] py-[10px]">

            {isVisible(content, section, "title_main") && (
                <h2 className="text-[36px] md:text-[60px] font-bold md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase leading-none w-full py-[20px]">
                    {content?.[section]?.title_main || t("concept.title_main")}
                </h2>
            )}

            <div className="grid md:h-[218.75px] md:grid-cols-4 gap-6 self-stretch text-left">

                {cards.map((n) => {
                    const title = content?.[section]?.[`card${n}_title`] || t(`concept.card${n}.title`);
                    const desc = content?.[section]?.[`card${n}_description`] || t(`concept.card${n}.description`);
                    const titleColor = content?.[section]?.[`card${n}_title_color`] || t(`concept.card${n}.title_color`, { defaultValue: "#2B7FFF" });

                    return (
                        
                        <div key={n} className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                            {isVisible(content, section, `card${n}_title`) && (
                                <>
                                    <h3 className="uppercase font-bold text-[30px] leading-[36px] tracking-[-1.5px]" style={{ color: titleColor }} >
                                        {title}
                                    </h3>
                                    <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                                        {desc}
                                    </p>
                                </>
                            )}
                        </div>
                        
                    )
                })}
                {/* {isVisible(content, section, "card1_title") && (
                    <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                        <h3 className="uppercase text-[#C27AFF] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                            {content?.[section]?.card1_title || t("concept.OneMinute.title")}
                        </h3>
                        <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                            {content?.[section]?.card1_description || t("concept.OneMinute.description")}
                        </p>
                    </div>
                )}

                {isVisible(content, section, "card2_title") && (
                    <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                        <h3 className="uppercase text-[#00D492] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                            {content?.[section]?.card2_title || t("concept.free.title")}
                        </h3>
                        <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                            {content?.[section]?.card2_description || t("concept.free.description")}
                        </p>
                    </div>
                )}

                {isVisible(content, section, "card3_title") && (
                    <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                        <h3 className="uppercase text-[#FB64B6] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                            {content?.[section]?.card3_title || t("concept.forAll.title")}
                        </h3>
                        <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                            {content?.[section]?.card3_description || t("concept.forAll.description")}
                        </p>
                    </div>
                )}

                {isVisible(content, section, "card4_title") && (
                    <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                        <h3 className="uppercase text-[#2B7FFF] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                            {content?.[section]?.card4_title || t("concept.expertise.title")}
                        </h3>
                        <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                            {content?.[section]?.card4_description || t("concept.expertise.description")}
                        </p>
                    </div>
                )} */}

            </div>

        </section>
    )
}

export default SectionConcept
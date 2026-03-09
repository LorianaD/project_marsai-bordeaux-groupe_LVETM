import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent.js";
import { isSectionVisible, isVisible } from "../../utils/isVisible";

function SectionConcept() {

    const { t, i18n } = useTranslation("home");

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "concept";

    const cards = [1, 2, 3, 4];

    const { content, loading, message } = useCmsContent(page, locale);
    // console.log("Content :", content, "Loading :", loading, "Message :", message);

    if (loading) return null;

    return (
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col justify-center items-center gap-5 md:px-20 py-2.5">

                    {isVisible(content, page, section, "title_main") && (
                        <h2 className="text-[36px] md:text-[60px] font-bold md:leading-15 tracking-[-1.8px] md:tracking-[-3px] uppercase leading-none w-full py-5">
                            {content?.[page]?.[section]?.title_main || t("concept.title_main")}
                        </h2>
                    )}

                    <div className="grid md:h-[218.75px] md:grid-cols-4 gap-6 self-stretch text-left">

                        {cards.map((n) => {
                            const title = content?.[page]?.[section]?.[`card${n}_title`] || t(`concept.card${n}.title`);
                            const desc = content?.[page]?.[section]?.[`card${n}_description`] || t(`concept.card${n}.description`);
                            const titleColor = content?.[page]?.[section]?.[`card${n}_title_color`] || t(`concept.card${n}.title_color`, { defaultValue: "#2B7FFF" });

                            return (
                                
                                <div key={n} className="flex p-10.25 gap-4 flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-4xl border border-solid border-[rgba(173,70,255,0.20)]">
                                    {isVisible(content, page, section, `card${n}_title`) && (
                                        <>
                                            <h3 className="uppercase font-bold text-[30px] leading-9 tracking-[-1.5px]" style={{ color: titleColor }} >
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

                    </div>

                </section>
            )}
        </>
    )
}

export default SectionConcept
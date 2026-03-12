import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible } from "../../utils/isVisible";

function SectionHero() {

    const page = "contact";
    const section = "hero";    

    // Gére la traduction
    const { t, i18n } = useTranslation(page);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";



    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <section className="flex flex-col gap-4 py-12 px-12 md:px-25 md:py-11 items-center">

            <h2 className="text-[36px] md:text-[48px] font-bold leading-9 md:leading-12 tracking-[-1.8px] md:tracking-[-2.4px] uppercase">
                
                {isVisible(content, page, section, "title_main") && (
                    <span>
                        {content?.[page]?.[section]?.title_main}{" "}
                    </span>
                )}

                {isVisible(content, page, section, "title_accent") && (
                    <span className="block bg-[linear-gradient(101deg,#51A2FF_11.31%,rgba(173,70,255,0.70)_34.85%,#FF2B7F_58.38%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                        {content?.[page]?.[section]?.title_accent}
                    </span>
                )}

            </h2>

            {isVisible(content, page, section, "description") && (
                <div className="flex justify-center">
                    <p className="w-full max-w-205 text-center text-[16px] leading-relaxed text-black/70 dark:text-white/70">
                        {content?.[page]?.[section]?.description}
                    </p>
                </div>
            )}

        </section>
    )
}

export default SectionHero
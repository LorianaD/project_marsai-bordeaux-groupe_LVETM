import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible } from "../../utils/isVisible";

function SectionHero() {

    const page = "faq";
    const section = "hero";

    // Gére la traduction
    const { t, i18n } = useTranslation(page);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <section className="flex flex-col gap-4 py-12 px-12 md:px-25 md:py-11 items-center">
            <h2 className="font-bold text-[34px] text-center">
                {isVisible(content, page, section, "title_main") && (
                    <span>
                        {content?.[page]?.[section]?.title_main || t("hero.title_main")}
                    </span>
                )}
                {isVisible(content, page, section, "title_accent") && (
                    <span className="block bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent">
                        {content?.[page]?.[section]?.title_accent || t("hero.title_accent")}
                    </span>
                )}
            </h2>
            {isVisible(content, page, section, "description") && (
                <p>
                    {content?.[page]?.[section]?.description}
                </p>
            )}
        </section>
    )
}

export default SectionHero
import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible } from "../../utils/isVisible";

function SectionHero() {

    const page = "legal";
    const section = "hero";    

    // Gére la traduction
    const { t, i18n } = useTranslation(page);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";



    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <section className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
                {isVisible(content, page, section, "title_main") && (
                    <span>
                        {content?.[page]?.[section]?.title_main}{" "}
                    </span>
                )}
                {isVisible(content, page, section, "title_accent") && (
                    <span>
                        {content?.[page]?.[section]?.title_accent}
                    </span>
                )}
            </h2>
            {isVisible(content, page, section, "description") && (
                <p className="mx-auto mt-3 max-w-2xl text-sm text-black/60 dark:text-white/60">
                    {content?.[page]?.[section]?.description}
                </p>
            )}
        </section>
    )
}

export default SectionHero
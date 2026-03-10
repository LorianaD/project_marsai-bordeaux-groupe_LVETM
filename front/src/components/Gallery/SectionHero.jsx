import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";

function SectionHero() {
        // Gére la traduction
    const { t, i18n } = useTranslation("gallery");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "gallery";
    const section = "hero";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);
    
    if (loading) return null;

    return (
        <section className="mb-8 flex flex-col gap-5">
            {/* Title */}
            <h2
                className="font-extrabold leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
            >
                {isVisible(content, page, section, "title_main") && (
                    <span className="block text-blue-600">
                        {content?.[page]?.[section]?.title_main || t("title.line1")}
                    </span>
                )}
                {isVisible(content, page, section, "title_accent") && (
                    <span className="block">
                        <span className="bg-linear-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                            {content?.[page]?.[section]?.title_accent || t("title.line2")}
                        </span>
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
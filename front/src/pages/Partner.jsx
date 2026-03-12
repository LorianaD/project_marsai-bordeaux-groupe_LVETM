import { useTranslation } from "react-i18next";
import PartnersGallery from "../components/Partner/PartnerGallery"
import SectionHero from "../components/Partner/SectionHero"
import useCmsContent from "../hooks/useCmsContent";
import { isSectionVisible } from "../utils/isVisible";

function PartnersPage() {

    // Gére la traduction
    const { t, i18n } = useTranslation("partners");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "gallery";
    const hero = "hero";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);
    
    if (loading) return null;

    return(
        <div>
            {isSectionVisible(content, page, hero) && (
                < SectionHero />
            )}
            < PartnersGallery />
        </div>
    )
}

export default PartnersPage
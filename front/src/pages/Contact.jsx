import { useTranslation } from "react-i18next";
import SectionHero from "../components/Contact/SectionHero.jsx";
import ContactForm from "../components/Form/Contact/ContactForm.jsx";
import useCmsContent from "../hooks/useCmsContent.js";
import { isSectionVisible } from "../utils/isVisible.js";

export default function Contact() {

  // Page et section
  const page = "contact";
  const hero = "hero";
  const form = "form";

  //paramétre i18n
  const { t, i18n } = useTranslation(page);
  const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

  const { content, loading, message } = useCmsContent(page, locale);

  if (loading) return null;

  return (
    <div className="min-h-screen">
      <div className="w-full">

        {/* Titre */}
        {isSectionVisible(content, page, hero) && (
          <SectionHero/>
        )}

        {/* Formulaire */}
        {isSectionVisible(content, page, form) && (
          <div className="p-4 flex justify-center">
            <ContactForm />
          </div>
        )}

      </div>
    </div>
  );
}
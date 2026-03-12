import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";

function Localisation() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "localisationEvent";
    const { content, loading, message } = useCmsContent(locale);

    return(
        <div className="flex justify-center">
            <iframe
                title="Google Map"
                className="flex w-full md:w-[974px] md:h-[547px] p-[10px] items-start gap-[10px] aspect-[276/155] rounded-[40px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={content?.[section]?.maps_link || t("localisationEvent.maps_link")}
            ></iframe>
        </div>
    )
}

export default Localisation
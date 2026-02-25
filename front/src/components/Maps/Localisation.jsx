import { useTranslation } from "react-i18next";

function Localisation() {

    const { t } = useTranslation("home");

    return(
        <div className="flex justify-center">
            <iframe
                title="Google Map"
                className="flex w-full md:w-[974px] md:h-[547px] p-[10px] items-start gap-[10px] aspect-[276/155] rounded-[40px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={t("localisationEvent.maps_link")}
            ></iframe>
        </div>
    )
}

export default Localisation
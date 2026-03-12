import Localisation from "../Maps/Localisation"
import { useTranslation } from "react-i18next";
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible, isSectionVisible } from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";

function SectionLocalisation() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";
    // const spaces = t("localisationEvent.spaces", {
    //     returnObjects: true,
    //     defaultValue: []
    // });

    const page = "home";
    const section = "localisationEvent";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    const eyebrowIconSrc = resolveCmsAsset(content?.[page]?.[section]?.eyebrow_icon) || null;

    const spaces = [1, 2];

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col justify-center items-center gap-7.5 p-5 md:py-25 md:px-18.75 self-stretch text-[#000000] dark:text-[#FFFFFF] w-full">
                    
                    <div className="flex items-start w-full">

                        {/* eyebrow */}
                        {isVisible(content, page, section, "eyebrow") && (
                            <div className="max-w-50 h-10.5 flex items-center justify-center gap-2.25 px-6.25 py-2.25 rounded-full border border-[rgba(138,138,138,0.10)] bg-[rgba(0,0,0,0.05)]">
                                
                                {isVisible(content, page, section, "eyebrow_icon") && (
                                    <div className="w-4 h-4">
                                        <img src={ eyebrowIconSrc } alt="Icon du sur-titre" />
                                    </div>
                                )}

                                <p className="text-center text-[12px] font-bold leading-4 tracking-[1.2px] uppercase">
                                    {content?.[page]?.[section]?.eyebrow  || t("localisationEvent.eyebrow")}
                                </p>
                                
                            </div>
                        )}

                    </div>

                    {/*  */}
                    <div className="flex flex-col md:items-center justify-center gap-20 md:px-6 self-stretch w-full">
                        <div className="flex flex-col items-start justify-between gap-5 md:gap-12.5 w-full">
                            
                            {/* Logo de la plateforme */}
                            <h2 className="text-left text-[48px] md:text-[128px] font-bold leading-12 md:leading-32 tracking-[-2.4px] md:tracking-[-6.4px] capitalize w-full">
                                {content?.[page]?.[section]?.venue_namePart1 || t("localisationEvent.venue.namePart1")}
                                <span className={`block md:inline text-[#51A2FF] [-webkit-text-stroke-width:3px] [-webkit-text-stroke-color:#51A2FF] dark:[-webkit-text-stroke-width:3px] dark:[-webkit-text-stroke-color:#51A2FF]`}>
                                    {content?.[page]?.[section]?.venue_namePart2 || t("localisationEvent.venue.namePart2")}
                                </span>
                            </h2>

                            {/* Adresse et mode d'acces */}
                            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-7.5 self-stretch w-full">
                                {isVisible(content, page, section, "venue_cityTagline") && (
                                    <p className={`text-[${content?.[page]?.[section]?.venue_color}] text-left md:text-center text-[10px] font-bold leading-3.75 tracking-[4px] uppercase`}>
                                        {content?.[page]?.[section]?.venue_cityTagline || t("localisationEvent.venue.cityTagline")}
                                    </p>
                                )}

                                {isVisible(content, page, section, "address_street") && (
                                    <p className="text-left md:text-center text-[18px] font-bold leading-[29.25px]">
                                        {content?.[page]?.[section]?.address_street || t("localisationEvent.address.street")},{" "}
                                        {content?.[page]?.[section]?.address_postalCode || t("localisationEvent.address.postalCode")}{" "}
                                        {content?.[page]?.[section]?.address_city || t("localisationEvent.address.city")}
                                    </p>
                                )}

                                {isVisible(content, page, section, "access_tram") && (
                                    <p className="text-left md:text-center text-[14px] font-normal leading-[22.75px] tracking-[1.4px] uppercase">
                                        {content?.[page]?.[section]?.access_tram || t("localisationEvent.access.tram")}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-244 flex flex-col md:flex-row gap-8 text-left">
                            {spaces.map((n) => {
                                const title = content?.[page]?.[section]?.[`space${n}_name`];
                                const description = content?.[page]?.[section]?.[`space${n}_description`];
                                const titleColor = content?.[page]?.[section]?.[`space${n}_color`];
                                
                                return (

                                    <div key={n} className="flex flex-col items-start gap-4 self-stretch justify-self-stretch col-span-1 row-span-1 w-full">
                                        
                                        {isVisible(content, page, section, `space${n}_name`) && (
                                            <div className="px-10.25 py-6.25 rounded-4xl border border-[rgba(0,0,0,0.20)] bg-[rgba(138,138,138,0.20)]">
                                                <h3 className="text-[#51A2FF] text-[24px] font-bold leading-8 tracking-[-1.2px] uppercase" style={{ color: titleColor }}>
                                                    {title}
                                                </h3>
                                                <p className="text-[16px] font-normal leading-6.5">
                                                    {description}
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                )
                            })}
                        </div>
                        <div className="rounded-[40px] border border-[rgba(138,138,138,0.10)] bg-transparent shadow-[0_0_100px_rgba(0,0,0,0.50)]">
                            {isVisible(content, page, section, `maps_link`) && (
                                < Localisation />
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default SectionLocalisation
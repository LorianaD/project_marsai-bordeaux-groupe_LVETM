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

    const section = "localisationEvent";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(locale);

    const eyebrowIconSrc = resolveCmsAsset(content?.[section]?.eyebrow_icon) || null;

    const spaces = [1, 2];

    return(
        <>
            {isSectionVisible(content, section) && (
                <section className="flex flex-col justify-center items-center gap-[30px] p-[20px] md:py-[100px] md:px-[75px] self-stretch text-[#000000] dark:text-[#FFFFFF] w-full">
                    
                    <div className="flex items-start w-full">

                        {/* eyebrow */}
                        {isVisible(content, section, "eyebrow") && (
                            <div className="max-w-[200px] h-[42px] flex items-center justify-center gap-[9px] px-[25px] py-[9px] rounded-full border border-[rgba(138,138,138,0.10)] bg-[rgba(0,0,0,0.05)]">
                                
                                {isVisible(content, section, "eyebrow_icon") && (
                                    <div className="w-[16px] h-[16px]">
                                        <img src={ eyebrowIconSrc } alt="Icon du sur-titre" />
                                    </div>
                                )}

                                <p className="text-center text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase">
                                    {content?.[section]?.eyebrow  || t("localisationEvent.eyebrow")}
                                </p>
                                
                            </div>
                        )}

                    </div>

                    {/*  */}
                    <div className="flex flex-col md:items-center justify-center gap-[80px] md:px-6 self-stretch w-full">
                        <div className="flex flex-col items-start justify-between gap-[20px] md:gap-[50px] w-full">
                            
                            {/* Logo de la plateforme */}
                            <h2 className="text-left text-[48px] md:text-[128px] font-bold leading-[48px] md:leading-[128px] tracking-[-2.4px] md:tracking-[-6.4px] capitalize w-full">
                                {content?.[section]?.venue_namePart1 || t("localisationEvent.venue.namePart1")}
                                <span className={`block md:inline text-[#51A2FF] [-webkit-text-stroke-width:3px] [-webkit-text-stroke-color:#51A2FF] dark:[-webkit-text-stroke-width:3px] dark:[-webkit-text-stroke-color:#51A2FF]`}>
                                    {content?.[section]?.venue_namePart2 || t("localisationEvent.venue.namePart2")}
                                </span>
                            </h2>

                            {/* Adresse et mode d'acces */}
                            <div className="flex flex-col md:flex-row md:items-center gap-[24px] md:gap-[30px] self-stretch w-full">
                                {isVisible(content, section, "venue_cityTagline") && (
                                    <p className={`text-[${content?.[section]?.venue_color}] text-left md:text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase`}>
                                        {content?.[section]?.venue_cityTagline || t("localisationEvent.venue.cityTagline")}
                                    </p>
                                )}

                                {isVisible(content, section, "address_street") && (
                                    <p className="text-left md:text-center text-[18px] font-bold leading-[29.25px]">
                                        {content?.[section]?.address_street || t("localisationEvent.address.street")},{" "}
                                        {content?.[section]?.address_postalCode || t("localisationEvent.address.postalCode")}{" "}
                                        {content?.[section]?.address_city || t("localisationEvent.address.city")}
                                    </p>
                                )}

                                {isVisible(content, section, "access_tram") && (
                                    <p className="text-left md:text-center text-[14px] font-normal leading-[22.75px] tracking-[1.4px] uppercase">
                                        {content?.[section]?.access_tram || t("localisationEvent.access.tram")}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-[976px] flex flex-col md:flex-row gap-[32px] text-left">
                            {spaces.map((n) => {
                                const title = content?.[section]?.[`space${n}_name`];
                                const description = content?.[section]?.[`space${n}_description`];
                                const titleColor = content?.[section]?.[`space${n}_color`];
                                
                                return (

                                    <div key={n} className="flex flex-col items-start gap-[16px] self-stretch justify-self-stretch col-span-1 row-span-1 w-full">
                                        
                                        {isVisible(content, section, `space${n}_name`) && (
                                            <div className="px-[41px] py-[25px] rounded-[32px] border border-[rgba(0,0,0,0.20)] bg-[rgba(138,138,138,0.20)]">
                                                <h3 className="text-[#51A2FF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase" style={{ color: titleColor }}>
                                                    {title}
                                                </h3>
                                                <p className="text-[16px] font-normal leading-[26px]">
                                                    {description}
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                )
                            })}
                        </div>
                        <div className="rounded-[40px] border border-[rgba(138,138,138,0.10)] bg-transparent shadow-[0_0_100px_rgba(0,0,0,0.50)]">
                            {isVisible(content, section, `maps_link`) && (
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
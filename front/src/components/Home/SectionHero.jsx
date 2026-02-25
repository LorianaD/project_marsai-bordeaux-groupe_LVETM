import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible, isSectionVisible } from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";

function SectionHero() {

    // Gére la traduction
    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "hero";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(locale);

    const protocolIconSrc = resolveCmsAsset(content?.[section]?.protocol_icon);

    const ctaParticipate_signeSrc = resolveCmsAsset(content?.[section]?.ctaParticipate_signe);

    const ctaLearnMore_signeSrc = resolveCmsAsset(content?.[section]?.ctaLearnMore_signe);

    // console.log("hero cms:", content?.hero);
    // console.log("visibility:", content?.hero?.section_visibility_is_active);
    
    if (loading) return null;
    
    return(
        <>
            {isSectionVisible(content, section) && (
                <section className="relative w-full h-screen flex flex-col items-center justify-center">

                    {/* BACKGROUND DE LA SECTION : VIDEO OU IMAGE */}
                    {content?.[section]?.media && (
                        content?.[section]?.media.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                            <video className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-0 pointer-events-none" autoPlay muted loop playsInline >
                                <source src={resolveCmsAsset(content?.[section]?.media) || t("hero.media")} type={content?.[section]?.media.endsWith(".webm") ? "video/webm" : "video/mp4"} />
                            </video>
                        ) : (
                            <img src={resolveCmsAsset(content?.[section]?.media)} className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-1"/>
                        )
                    )}

                    {/* LOGO, TITRE, ECT. */}
                    <div className="flex py-[24px] flex-col justify-center items-center gap-[clamp(1rem,2vw,3rem)] self-stretch z-20">

                        <div className="flex flex-col justify-center items-center gap-[10px] self-stretch">
                            
                            <div className="flex px-[17px] py-[9px] justify-center items-start gap-[8px]">

                                {isVisible(content, section, "protocol_icon") && protocolIconSrc && (
                                    <div>
                                        <img src={protocolIconSrc || t("hero.protocol_icon")} className="h-5 w-5 opacity-80" />
                                    </div>
                                )}

                                {isVisible(content, section, "protocol") && (
                                    <p className="text-[rgba(0,0,0,0.60)] text-center text-[10px] font-bold leading-[15px] tracking-[3px] uppercase">
                                        {content?.[section]?.protocol || t("hero.protocol")}
                                    </p>
                                )}

                            </div>
                            
                            <h1 className="flex items-center justify-center self-stretch text-[#FFFFFF] font-bold text-center uppercase text-[clamp(48px,6vw,192px)] tracking-[clamp(-2.4px,-0.5vw,-9.6px)] leading-[clamp(48px,6vw,192px)]">
                                {isVisible(content, section, "title_main") && (
                                    <span>
                                        {content?.[section]?.title_main || t("hero.title_main")}
                                    </span>
                                )}

                                {isVisible(content, section, "title_accent") && (
                                    <span className="bg-gradient-to-b from-[#51A2FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent">
                                        {content?.[section]?.title_accent  || t("hero.title_accent")}
                                    </span>
                                )}
                            </h1>

                            <p className="text-[#FFFFFF] text-[clamp(16px,2.2vw,35px)] font-bold tracking-[0.5px] uppercase text-center">

                                {isVisible(content, section, "tagline_before") && (
                                    <span>
                                        {content?.[section]?.tagline_before || t("hero.tagline_before")}
                                    </span>
                                )}

                                {isVisible(content, section, "tagline_highlight") && (
                                    <span className="bg-gradient-to-r from-[#AD46FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent" >
                                        {" "}{content?.[section]?.tagline_highlight || t("hero.tagline_highlight")}{" "}
                                    </span>
                                )}

                                {isVisible(content, section, "tagline_after") && (
                                    <span>
                                        {content?.[section]?.tagline_after || t("hero.tagline_after")}
                                    </span>
                                )}

                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2 md:gap-1.5 px-1 self-stretch text-white/40 text-center text-[18px] md:text-[24px] font-normal leading-[1.625]">
                            
                            {isVisible(content, section, "desc1") && (
                                <p>{content?.[section]?.desc1 || t("hero.desc1")}</p>
                            )}
                            
                            {isVisible(content, section, "desc2") && (
                                <p>{content?.[section]?.desc2 || t("hero.desc2")}</p>
                            )}

                        </div>

                        <div className="flex flex-col items-center justify-center px-[50px] md:flex-row md:items-start md:justify-end gap-6 md:px-[220px]">
                            <Link to={content?.[section]?.ctaParticipate_link || t("hero.ctaParticipate_link")} className="flex h-[68px] items-center justify-end gap-[30px] p-[25px] rounded-full bg-white shadow-[0_0_30px_0_rgba(255,255,255,0.1)]">

                                {isVisible(content, section, "ctaParticipate") && (
                                    <span className="text-black text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                                        {content?.[section]?.ctaParticipate || t("hero.ctaParticipate")}
                                    </span>
                                )}

                                {isVisible(content, section, "ctaParticipate_signe") && ctaParticipate_signeSrc && (
                                    <div className="w-[20px] h-[20px]">
                                        <img src={ctaParticipate_signeSrc || t("hero.ctaParticipate_signe")} alt=""/>
                                    </div>
                                )}

                            </Link>

                            <Link to={content?.[section]?.ctaLearnMore_link || t("hero.ctaLearnMore_link")} className="flex items-center justify-center gap-5 p-[25px] rounded-full border border-white/10 bg-white/5 text-white">
                                
                                {isVisible(content, section, "ctaLearnMore") && (
                                    <span className=" text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                                        {content?.[section]?.ctaLearnMore || t("hero.ctaLearnMore")}
                                    </span>
                                )}

                                {isVisible(content, section, "ctaLearnMore_signe") && ctaLearnMore_signeSrc && (
                                    <div className="w-[20px] h-[20px]">
                                        <img src={ctaLearnMore_signeSrc || t("hero.ctaLearnMore_signe")} />
                                    </div>
                                )}

                            </Link>

                        </div>

                    </div>

                </section>
            )}
        </>
    )
}

export default SectionHero
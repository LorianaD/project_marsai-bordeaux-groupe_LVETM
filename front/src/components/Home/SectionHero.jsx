import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import useCmsContent from "../../hooks/useCmsContent";
import { isVisible, isSectionVisible } from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";

function SectionHero() {

    // Gére la traduction
    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "hero";

    // cherche les données en bdd
    const { content, loading, message } = useCmsContent(page, locale);

    const protocolIconSrc = resolveCmsAsset(content?.[page]?.[section]?.protocol_icon);

    const ctaParticipate_signeSrc = resolveCmsAsset(content?.[page]?.[section]?.ctaParticipate_signe);

    const ctaLearnMore_signeSrc = resolveCmsAsset(content?.[page]?.[section]?.ctaLearnMore_signe);
    
    if (loading) return null;
    
    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="relative w-full h-screen flex flex-col items-center justify-center">

                    {/* BACKGROUND DE LA SECTION : VIDEO OU IMAGE */}
                    {content?.[page]?.[section]?.media && (
                        content?.[page]?.[section]?.media.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                            <video className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-0 pointer-events-none" autoPlay muted loop playsInline >
                                <source src={resolveCmsAsset(content?.[page]?.[section]?.media) || t("hero.media")} type={content?.[page]?.[section]?.media.endsWith(".webm") ? "video/webm" : "video/mp4"} />
                            </video>
                        ) : (
                            <img src={resolveCmsAsset(content?.[page]?.[section]?.media)} className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-1"/>
                        )
                    )}

                    {/* LOGO, TITRE, ECT. */}
                    <div className="flex py-6 flex-col justify-center items-center gap-[clamp(1rem,2vw,3rem)] self-stretch z-20">

                        <div className="flex flex-col justify-center items-center gap-12.5 self-stretch">
                            
                            <div className="flex px-4.25 py-2.25 justify-center items-start gap-2">

                                {isVisible(content, page, section, "protocol_icon") && protocolIconSrc && (
                                    <div>
                                        <img src={protocolIconSrc || t("hero.protocol_icon")} className="h-5 w-5 opacity-80" />
                                    </div>
                                )}

                                {isVisible(content, page, section, "protocol") && (
                                    <p className="text-[rgba(0,0,0,0.60)] text-center text-[14px] font-bold leading-3.75 tracking-[10px] uppercase">
                                        {content?.[page]?.[section]?.protocol || t("hero.protocol")}
                                    </p>
                                )}

                            </div>
                            
                            <h1 className="flex items-center justify-center self-stretch text-[#FFFFFF] font-bold text-center uppercase text-[clamp(48px,10vw,200px)] tracking-[clamp(-2.4px,-0.5vw,-9.6px)] leading-[clamp(48px,6vw,192px)]">
                                {isVisible(content, page, section, "title_main") && (
                                    <span>
                                        {content?.[page]?.[section]?.title_main || t("hero.title_main")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "title_accent") && (
                                    <span className="bg-linear-to-b from-[#51A2FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent">
                                        {content?.[page]?.[section]?.title_accent  || t("hero.title_accent")}
                                    </span>
                                )}
                            </h1>

                            <p className="text-[#FFFFFF] text-[clamp(16px,2.2vw,35px)] font-bold tracking-[10px] uppercase text-center">

                                {isVisible(content, page, section, "tagline_before") && (
                                    <span>
                                        {content?.[page]?.[section]?.tagline_before || t("hero.tagline_before")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "tagline_highlight") && (
                                    <span className="bg-linear-to-r from-[#AD46FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent" >
                                        {" "}{content?.[page]?.[section]?.tagline_highlight || t("hero.tagline_highlight")}{" "}
                                    </span>
                                )}

                                {isVisible(content, page, section, "tagline_after") && (
                                    <span>
                                        {content?.[page]?.[section]?.tagline_after || t("hero.tagline_after")}
                                    </span>
                                )}

                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-2 md:gap-1.5 px-1 self-stretch text-white/40 text-center text-[18px] md:text-[24px] font-normal leading-[1.65] tracking-[2px]">
                            
                            {isVisible(content, page, section, "desc1") && (
                                <p>{content?.[page]?.[section]?.desc1 || t("hero.desc1")}</p>
                            )}
                            
                            {isVisible(content, page, section, "desc2") && (
                                <p>{content?.[page]?.[section]?.desc2 || t("hero.desc2")}</p>
                            )}

                        </div>

                        <div className="flex flex-col items-center justify-center px-12.5 md:flex-row md:items-start md:justify-end gap-6 md:px-55">
                            <Link to={content?.[page]?.[section]?.ctaParticipate_link || t("hero.ctaParticipate_link")} className="flex h-17 items-center justify-end gap-7.5 p-6.25 rounded-full bg-white shadow-[0_0_30px_0_rgba(255,255,255,0.1)]">

                                {isVisible(content, page, section, "ctaParticipate") && (
                                    <span className="text-black text-center text-[14px] font-bold leading-5 tracking-[1.4px] uppercase">
                                        {content?.[page]?.[section]?.ctaParticipate || t("hero.ctaParticipate")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "ctaParticipate_signe") && ctaParticipate_signeSrc && (
                                    <div className="w-5 h-5">
                                        <img src={ctaParticipate_signeSrc || t("hero.ctaParticipate_signe")} alt=""/>
                                    </div>
                                )}

                            </Link>

                            <Link to={content?.[page]?.[section]?.ctaLearnMore_link || t("hero.ctaLearnMore_link")} className="flex items-center justify-center gap-5 p-6.25 rounded-full border border-white/10 bg-white/5 text-white">
                                
                                {isVisible(content, page, section, "ctaLearnMore") && (
                                    <span className=" text-center text-[14px] font-bold leading-5 tracking-[1.4px] uppercase">
                                        {content?.[page]?.[section]?.ctaLearnMore || t("hero.ctaLearnMore")}
                                    </span>
                                )}

                                {isVisible(content, page, section, "ctaLearnMore_signe") && ctaLearnMore_signeSrc && (
                                    <div className="w-5 h-5">
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
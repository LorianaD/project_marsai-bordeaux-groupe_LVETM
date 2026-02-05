import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import GetAllContentApi from "../../services/CMS/GetAllContentApi";
import { buildCmsMap } from "../../utils/cms";

function SectionHero() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    async function CMSHeroHome() {
        console.log("Fonction CMSHeroHome OK");

        try {
            console.log("try in the function CMSHeroHome OK");

            setLoading(true);
            setMessage("");

            const json = await GetAllContentApi();
            console.log(json);

            const rows = json.data ?? [];
            console.log(rows);  

            const cms = buildCmsMap(rows, locale);
            console.log("CMS finale", cms);
            
            setContent(cms);

        } catch (error) {

            console.error(error);
            setMessage("Erreur lors du chargement du contenu CMS.");
            
        } finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        CMSHeroHome();
    },[locale]);

    return(
        <section className="relative flex w-full flex-col items-center self-stretch p-[25px] gap-[48px] md:px-[75px] md:gap-[10px]">

            <video className="absolute inset-0 h-full w-full object-cover brightness-[0.72] contrast-[1.05] saturate-[1.05] z-1" autoPlay muted loop playsInline >
                <source src="/imgs/backgroundSections/HomeSectionHero.mp4" type="video/mp4" />
            </video>

            <div className="flex py-[24px] flex-col justify-center items-center gap-[50px] self-stretch z-20">

                <div className="flex flex-col justify-center items-center gap-[10px] self-stretch">
                    <div className="flex px-[17px] py-[9px] justify-center items-start gap-[8px]">
                        <div className="">
                            <img src="/src/assets/imgs/icones/iconStars.svg" alt="" className="h-5 w-5 opacity-80" />
                        </div>
                        <p className="text-[rgba(0,0,0,0.60)] text-center text-[10px] font-bold leading-[15px] tracking-[3px] uppercase">
                            {content?.hero?.protocol ?? t("hero.protocol")}
                        </p>
                    </div>
                    <h1 className="flex items-center justify-center self-stretch text-[#FFFFFF] font-bold leading-[40px] md:leading-[192px] tacking-[-2.4px] md:tracking-[-9.6px] uppercase text-[48px] md:text-[192px] text-center">
                            {content?.hero?.title_main ?? "MARS"}
                        <span className="bg-gradient-to-b from-[#51A2FF] via-[#AD46FF] to-[#FF2B7F] bg-clip-text text-transparent">
                            {content?.hero?.title_accent ?? "AI"}
                        </span>
                    </h1>
                    <p className="text-[#FFFFFF] text-[35px] font-bold tracking-[0.5px] uppercase text-center">
                        <span>{content?.hero?.tagline_before ?? t("hero.tagline_before")} </span>
                        <span className="bg-gradient-to-r from-[#AD46FF] via-[#F6339A] to-[#FF6900] bg-clip-text text-transparent">
                            {content?.hero?.tagline_highlight ?? t("hero.tagline_highlight")}
                        </span>
                        <span> {content?.hero?.tagline_after ?? t("hero.tagline_after")}</span>
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-[3px] md:gap-[6px] px-1 self-stretch text-white/40 text-center text-[18px] md:text-[24px] font-normal leading-[29px] md:leading-[39px]">
                    <p>{content?.hero?.desc1 ?? t("hero.desc1")}</p>
                    <p>{content?.hero?.desc2 ?? t("hero.desc2")}</p>
                </div>

                <div className="flex flex-col intem-center justify-center px-[50px] md:flex-row md:items-start md:justify-end gap-6 md:px-[220px]">
                    <Link to="participation" className="flex h-[68px] items-center justify-end gap-[30px] p-[25px] rounded-full bg-white shadow-[0_0_30px_0_rgba(255,255,255,0.1)]">
                        <span className="text-black text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                            {content?.hero?.ctaParticipate ?? t("hero.ctaParticipate")}
                        </span>
                        <div className="w-[20px] h-[20px]">
                            <img src="../src/assets/imgs/icones/arrowRight.svg" alt=""/>
                        </div>
                    </Link>
                    <Link className="flex items-center justify-center gap-5 p-[25px] rounded-full border border-white/10 bg-white/5 text-white">
                        <span className=" text-center text-[14px] font-bold leading-[20px] tracking-[1.4px] uppercase">
                            {content?.hero?.ctaLearnMore ?? t("hero.ctaLearnMore")}
                        </span>
                        <span className="flex flex-col justify-center text-[#AD46FF] text-center text-[24px] font-bold leading-[0] uppercase">
                            +
                        </span>
                    </Link>
                </div> 

            </div>

        </section>
    )
}

export default SectionHero
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GetAllContentApi from "../../services/CMS/GetAllContentApi";
import { buildCmsMap } from "../../utils/cms";
import isVisible from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";

function SectionGoal() {

    const { t, i18n } = useTranslation("home");

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "goal";

    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    async function CMSGoalHome() {
        // console.log("Fonction CMSHeroHome OK");

        // Recupération des données
        try {
            // console.log("try in the function CMSHeroHome OK");

            setLoading(true);
            setMessage("");

            const json = await GetAllContentApi();
            // console.log(json);

            const rows = json.data ?? [];
            // console.log("rows:",rows);
            // console.log("rows concept fr:", rows.filter(r => r.section === "hero" && r.locale === locale));

            const cms = buildCmsMap(rows, locale);
            // console.log("CMS finale", cms);
            
            setContent(cms);

        } catch (error) {

            console.error(error);
            setMessage("Erreur lors du chargement du contenu CMS.");
            
        } finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        CMSGoalHome();
    },[locale]);

    // console.log("goal card1_icon =", content?.goal?.card1_icon);
    // console.log("goal object =", content?.goal);

    return(
        <section className="flex flex-col items-center justify-center md:gap-5 px-[20px] md:px-[75px] md:py-[20px] self-stretch dark:text-[#FFFFFF] text-left w-full">
            
            {/* TITRE DE SECTION */}
            
                <h2 className="text-[36px] md:text-[60px] font-bold md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase leading-none w-full py-[20px]">
                    {isVisible(content, section, "title_main") && (
                        <span className="block">{content?.[section]?.title_main || t("goal.title_main")} </span>
                    )}
                    {isVisible(content, section, "title_accent") && (
                        <span className="block text-[#F6339A]">{content?.[section]?.title_accent || t("goal.title_accent")}</span>
                    )}
                </h2>
            

            {/* CARDS */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-[25px] md:gap-[48px] self-stretch w-full md:h-[500px]">
                
                {/* Card 1 */}
                <div className="md:w-[400px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px] dark:border-white/10 dark:bg-white/5 md:h-[400px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(0,212,146,0.10)]">
                        <img src={resolveCmsAsset(content?.[section]?.card1_icon) || t("goal.cards.card1.icon")} alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px dark:text-[#FFFFFFF]">
                        {content?.[section]?.card1_title || t("goal.cards.card1.title")}
                    </h3>
                    <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        {content?.[section]?.card1_description || t("goal.cards.card1.description")}
                    </p>
                </div>

                {/* Card 2 */}
                <div className="md:w-[400px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px] dark:border-white/10 dark:bg-white/5 md:h-[400px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(0,184,219,0.10)]">
                        <img src={resolveCmsAsset(content?.[section]?.card2_icon) || t("goal.cards.card2.icon")} alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px">
                        {content?.[section]?.card2_title || t("goal.cards.card2.title")}
                    </h3>
                    <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        {content?.[section]?.card2_description || t("goal.cards.card2.description")}
                    </p>
                </div>

                {/* Card 3 */}
                <div className="md:w-[400px] rounded-[48px] border border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.05)] p-[48px] flex flex-col gap-[24px] dark:border-white/10 dark:bg-white/5 md:h-[400px]">
                    <div className="flex w-[64px] h-[64px] justify-center items-center rounded-[24px] bg-[rgba(173,70,255,0.10)]">
                        <img src={resolveCmsAsset(content?.[section]?.card3_icon) || t("goal.cards.card3.icon")} alt="" className="w-[32px] h-[32px] shrink-[0]"/>
                    </div>
                    <h3 className="text-[#000000] dark:text-[#FFFFFF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] uppercase text-left w-144px">
                        {content?.[section]?.card3_title || t("goal.cards.card3.title")}
                    </h3>
                    <p className="text-[#000000] dark:text-[#FFFFFF] text-[14px] font-bold leading-[23px] tracking-[1.4px] uppercase text-left">
                        {content?.[section]?.card3_description || t("goal.cards.card3.description")}
                    </p>
                </div>

            </div>

        </section>
    )
}

export default SectionGoal
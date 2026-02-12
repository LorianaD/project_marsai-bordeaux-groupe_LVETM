import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"
import GetAllContentApi from "../../services/CMS/GetAllContentApi";
import { buildCmsMap } from "../../utils/cms";
import isVisible from "../../utils/isVisible";

function SectionConcept() {

    const { t, i18n } = useTranslation("home");

    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    async function CMSConceptHome() {
        // console.log("Fonction CMSHeroHome OK");

        // Recupération des données
        try {
            // console.log("try in the function CMSHeroHome OK");

            setLoading(true);
            setMessage("");

            const json = await GetAllContentApi();
            // console.log(json);

            const rows = json.data || [];
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

    const section = "concept";

    useEffect(()=>{
        CMSConceptHome();
    },[locale]);

    return(
        <section className="flex flex-col justify-center items-center gap-[20px] md:px-[80px] py-[10px]">
            {isVisible(content, section, "title_main") && (
                <h2 className="text-[36px] md:text-[60px] font-bold md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase leading-none w-full py-[20px]">
                    {content?.concept?.title_main?.value || t("concept.title_main")}                
                </h2>
            )}
            <div className="grid md:h-[218.75px] md:grid-cols-4 gap-6 self-stretch text-left">
                {isVisible(content, section , "card1_title") && (
                    <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                        <h3 className="uppercase text-[#C27AFF] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                            {content?.concept?.card1_title || t("concept.OneMinute.title")}
                        </h3>
                        <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                            {content?.concept?.card1_description || t("concept.OneMinute.description")}
                        </p>
                    </div>
                )}

                {isVisible(content, section, "card2_title") && (
                    <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                        <h3 className="uppercase text-[#00D492] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                            {content?.concept?.card2_title || t("concept.free.title")}
                        </h3>
                        <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                            {content?.concept?.card2_description || t("concept.free.description")}
                        </p>
                    </div>
                )}
                
                <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                    <h3 className="uppercase text-[#FB64B6] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                        {content?.concept?.card3_title || t("concept.forAll.title")}
                    </h3>
                    <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                        {content?.concept?.card3_description || t("concept.forAll.description")}
                    </p>
                </div>
                <div className="flex p-[41px] gap-[16px] flex-col items-start self-stretch justify-self-stretch bg-[rgba(161,161,161,0.05)] rounded-[32px] border-[1px] border-solid border-[rgba(173,70,255,0.20)]">
                    <h3 className="uppercase text-[#2B7FFF] font-bold text-[30px] leading-[36px] tracking-[-1.5px]">
                        {content?.concept?.card4_title || t("concept.expertise.title")}
                    </h3>
                    <p className="text-[#000000] text-[10px] font-bold leading-[16.25px] tracking-[1px] uppercase dark:text-white">
                        {content?.concept?.card4_description || t("concept.expertise.description")}
                    </p>
                </div>
            </div>

        </section>
    )
}

export default SectionConcept
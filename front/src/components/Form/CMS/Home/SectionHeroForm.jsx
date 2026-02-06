import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"
import { useForm } from "../../../../hooks/useForm";

function SectionHeroForm() {

    const { t } = useTranslation("home");

    const { values, handleChange } = useForm({
        protocol:"",
        title_main:"",
        title_accent:"",
        
    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();
        setLoading(true);

        try {
            // console.log("try dans la fonction handleSubmit OK");
            
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("img", values.file);
            formData.append("url", values.url);

            const result = await InsertPartnerApi(formData)
            // console.log(result);
            
            setMessage("SectionHero modifié")
            
        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de l'envoi");

        } finally {
            setLoading(false);
        }

    }

    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-[50px] md:px-[100px] md:py-[100px] flex flex-col intems-start justify-center gap-[50px] self-stretch font-[Outfit]">
                
                {/***** Titre du formulaire *****/}
                <div className="flex items-center gap-[10px] self-stretch">
                    <div>
                        <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                        <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    </div>
                    <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                        Gestion de la Section Hero
                    </h3>
                </div>

                <div className="flex flex-col intem-start justify-center gap-[50px] self-stretch font-[Outfit]">
                    {/* Gestion du protocol */}
                    <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                        <div className="flex justify-between">
                            <label htmlFor="protocol" className="text-[14px] font-semibold tracking-[2.24px]">
                                Protocol
                            </label>
                            <div className="text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                <label htmlFor="hidden">Caché</label>
                                <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                            </div>
                        </div>
                        <input type="text" name="protocol" value={values.name} onChange={handleChange} placeholder={t("hero.protocol")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                    </div>

                    {/* Gestion des Titres */}
                    <div  className="flex flex-col md:flex-row justify-around pb-[10px] gap-[50px]">
                        {/* Gestion du titre principal en blanc */}
                        <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                            <div className="flex justify-between flex-col md:flex-row">
                                <label htmlFor="title_main" className="text-[14px] font-semibold tracking-[2.24px]">
                                    Titre principal en Blanc
                                </label>
                                <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                    <label htmlFor="hidden">Caché</label>
                                    <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                </div>
                            </div> 
                            <input type="text" name="title_main" value={values.name} onChange={handleChange} placeholder={t("hero.title_main")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                        </div>

                        
                        {/* Gestion du titre accent ou sécondaire en dégradé */}
                        <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                            <div className="flex justify-between flex-col md:flex-row">
                                <label htmlFor="title_accent" className="text-[14px] font-semibold tracking-[2.24px]">
                                    Titre accent en dégradé
                                </label>
                                <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                    <label htmlFor="hidden">Caché</label>
                                    <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                </div>
                            </div>
                            <input type="text" name="title_accent" value={values.name} onChange={handleChange} placeholder={t("hero.title_accent")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                        </div>
                    </div>

                    {/* Gestion du slogan */}
                    <div className="flex flex-col md:flex-row pb-[10px] gap-[30px] uppercase placeholder:uppercase">
                        
                        <div className="flex flex-col pb-[10px] justify-start gap-[16px] uppercase placeholder:uppercase">
                            <div className="flex justify-between flex-col md:flex-row">
                                <label htmlFor="tagline_before" className="text-[14px] font-semibold tracking-[2.24px]">
                                    Slogan (avant le point culminant en dégradé)
                                </label>
                                <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                    <label htmlFor="hidden">Caché</label>
                                    <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                </div>
                            </div>
                            <input type="text" name="tagline_before" value={values.name} onChange={handleChange} placeholder={t("hero.tagline_before")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                        </div>
                        <div className="flex flex-col pb-[10px] justify-start gap-[16px] uppercase placeholder:uppercase">
                            <div className="flex justify-between flex-col md:flex-row">
                                <label htmlFor="tagline_highlight" className="text-[14px] font-semibold tracking-[2.24px]">
                                    Slogan (point culminant en dégradé)
                                </label>
                                <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                    <label htmlFor="hidden">Caché</label>
                                    <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                </div>                            
                            </div>
                            <input type="text" name="tagline_highlight" value={values.name} onChange={handleChange} placeholder={t("hero.tagline_highlight")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                        </div>
                        <div className="flex flex-col pb-[10px] justify-start gap-[16px] uppercase placeholder:uppercase">
                            <div className="flex justify-between flex-col md:flex-row">
                                <label htmlFor="tagline_tagline_after" className="text-[14px] font-semibold tracking-[2.24px]">
                                    Slogan (aprés le point culminant en dégradé)
                                </label>
                                <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                    <label htmlFor="hidden">Caché</label>
                                    <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                </div>
                            </div>
                            <input type="text" name="tagline_tagline_after" value={values.name} onChange={handleChange} placeholder={t("hero.tagline_after")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                        </div>                    
                        
                    </div>

                    {/* Gestion de la Déscription */}
                    <div className="flex flex-col gap-[50px]">
                        {/* Gestion de la déscription ligne 1 */}
                        <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                            <div className="flex justify-between flex-col md:flex-row">
                                <label htmlFor="desc1" className="text-[14px] font-semibold tracking-[2.24px]">
                                    Description (ligne 1)
                                </label>
                                <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                    <label htmlFor="hidden">Caché</label>
                                    <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                </div>
                            </div>
                            <textarea type="text" name="desc1" value={values.name} onChange={handleChange} placeholder={t("hero.desc1")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                        </div>
                    

                        {/* Gestion de la déscription ligne 2 */}
                        <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                            <div className="flex justify-between flex-col md:flex-row">
                                <label htmlFor="desc2" className="text-[14px] font-semibold tracking-[2.24px]">
                                    Description (ligne 2)
                                </label>
                                <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                    <label htmlFor="hidden">Caché</label>
                                    <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                </div>
                            </div>
                            <textarea type="text" name="desc2" value={values.name} onChange={handleChange} placeholder={t("hero.desc2")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                        </div>
                    </div>

                    {/* Gestion des boutons */}
                    <div className="flex flex-col md:flex-row justify-around intem-center gap-[50px]">
                        {/* Gestion du premier bouton */}
                        <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase w-full">
                            <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase w-full">
                                <div className="flex justify-between flex-col md:flex-row"> 
                                    <label htmlFor="ctaParticipate" className="text-[14px] font-semibold tracking-[2.24px]">
                                        Premier bouton
                                    </label>
                                    <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                        <label htmlFor="hidden">Caché</label>
                                        <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                    </div>
                                </div>
                                <input type="text" name="ctaParticipate" value={values.name} onChange={handleChange} placeholder={t("hero.ctaParticipate")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                            </div>
                            <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                                <div className="flex justify-between flex-col md:flex-row">
                                    <label htmlFor="ctaParticipate_signe" className="text-[14px] font-semibold tracking-[2.24px]">
                                        Signe du Premiér bouton
                                    </label>
                                    <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                        <label htmlFor="hidden">Caché</label>
                                        <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                    </div>                            
                                </div>
                                <input type="text" name="ctaParticipate_signe" value={values.name} onChange={handleChange} placeholder={t("hero.ctaParticipate_signe")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                            </div>
                        </div>

                        {/* Gestion du deuxiéme bouton */}
                        <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase w-full">
                            <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                                <div className="flex justify-between flex-col md:flex-row">
                                    <label htmlFor="ctaLearnMore" className="text-[14px] font-semibold tracking-[2.24px]">
                                        Deuxiéme bouton
                                    </label>
                                    <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                        <label htmlFor="hidden">Caché</label>
                                        <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                    </div>
                                </div>
                                <input type="text" name="ctaLearnMore" value={values.name} onChange={handleChange} placeholder={t("hero.ctaLearnMore")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                            </div>

                            <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                                <div className="flex justify-between flex-col md:flex-row">
                                    <label htmlFor="ctaLearnMore_signe" className="text-[14px] font-semibold tracking-[2.24px]">
                                        Signe du deuxiéme bouton
                                    </label>
                                    <div className="flex justify-end intem-end text-[14px] font-semibold tracking-[2.24px] capitalize flex intem-center">
                                        <label htmlFor="hidden">Caché</label>
                                        <input type="range" name="hidden" min="0" max="1" className="w-[30px]"/>
                                    </div>                            
                                </div>
                                <input type="text" name="ctaLearnMore_signe" value={values.name} onChange={handleChange} placeholder={t("hero.ctaLearnMore_signe")} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <button type="submit" className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                            Ajouter
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SectionHeroForm
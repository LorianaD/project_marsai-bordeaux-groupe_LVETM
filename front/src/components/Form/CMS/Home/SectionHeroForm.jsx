import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { useForm } from "../../../../hooks/useForm";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi.js";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsInputFile from "../Fields/CmsInputFile.jsx";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm.jsx";
import useCmsContent from "../../../../hooks/useCmsContent.js";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms.js";

function SectionHeroForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "hero";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [
        "protocol",
        "protocol_icon",

        "media",

        "title_main",
        "title_accent",

        "tagline_before",
        "tagline_highlight",
        "tagline_after",

        "desc1",
        "desc2",

        "ctaParticipate",
        "ctaParticipate_signe",

        "ctaLearnMore",
        "ctaLearnMore_signe"

    ];
    // console.log(fields);

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, setValues, handleChange } = useForm({
        protocol:"",
        protocol_is_active: 1,

        protocol_icon: "",
        protocol_icon_is_active: 1,

        media:"",
        media_is_active: 1,

        title_main:"",
        title_main_is_active: 1,

        title_accent:"",
        title_accent_is_active: 1,

        tagline_before:"",
        tagline_before_is_active: 1,

        tagline_highlight:"",
        tagline_highlight_is_active: 1,

        tagline_after:"",
        tagline_after_is_active: 1,

        desc1:"",
        desc1_is_active: 1,

        desc2:"",
        desc2_is_active: 1,

        ctaParticipate:"",
        ctaParticipate_is_active: 1,

        ctaParticipate_signe:"",
        ctaParticipate_signe_is_active: 1,

        ctaLearnMore:"",
        ctaLearnMore_is_active: 1,

        ctaLearnMore_signe:"",
        ctaLearnMore_signe_is_active: 1
    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { content, loading: cmsLoading } = useCmsContent(locale);
    const [initialValues, setInitialValues] = useState({});
    const [hasHydrated, setHasHydrated] = useState(false);
    
    useEffect(() => {
        if (hasHydrated) return;

        const cmsSection = content?.[section];

        if (!cmsSection) return;

        // construit les valeurs initiales depuis le CMS
        const built = buildInitialValuesFromCms(fields, cmsSection, {
            fileFields: ["ctaAgenda_icon", "card1_icon", "card2_icon", "card3_icon"],
        });

        setValues(built);
        setInitialValues(built);
        setHasHydrated(true);
    }, [content, section, hasHydrated, setValues])

    // reinitialise quand locale change // Remplie le formulaire avec les données de la BDD
    // fait que les données dans les champs sont chargé par raport à la langue
    useEffect(()=>{
        setHasHydrated(false);
    }, [locale]);    

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();
        setLoading(true);

        try {

            // console.log("try dans handleSubmit OK");

            for (let i = 0; i < fields.length; i++) {
                const key = fields[i];
                const val = values[key];
                const is_active = values[`${key}_is_active`];

                // IMAGE
                if (val instanceof File) {
                    await updateImageApi({
                        page,
                        section,
                        locale,
                        content_key: key,
                        value: val,
                        order_index: i,
                        is_active,
                    });
                    continue;
                }

                // TEXTE VIDE
                const empty = val === undefined || val === null || String(val).trim() === "";

                // si vide on continue sans rien changer
                if (empty) continue;

                // TEXTE NON VIDE
                await updateContentApi({
                    page,
                    section,
                    locale,
                    content_key: key,
                    value: val,
                    order_index: i,
                    is_active,    
                })
                

            }

            setMessage("Section Hero mise à jour");

        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {
            setLoading(false);
        }

    }

    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-[50px] md:px-[100px] md:py-[100px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                
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

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                    {/* Gestion du protocol */}
                    <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion du protocol
                            </h4>
                        </div>
                        <div>
                            < CmsInput name="protocol" label="Protocol" value={values.protocol} onChange={handleChange} placeholder={t("hero.protocol")}   rightSlot={
                                <CmsHideToggle name="protocol" value={values.protocol_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} order_index={orderIndexByKey.protocol} />}
                            />

                            <CmsInputImage name="protocol_icon" label="Icon du protocol" value={values.protocol_icon} onChange={handleChange} placeholder={t("hero.protocol_icon")} rightSlot={
                                <CmsHideToggle name="protocol_icon" value={values.protocol_icon_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                        </div>

                    </div>

                    {/* Gestion de la video ou image */}
                        <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                            <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                    Gestion du fond
                                </h4>
                            </div>
                            <div  className="flex flex-col md:flex-row justify-around w-full pb-[10px] gap-[50px]">
                                <CmsInputFile name="media" label="Média du fond (vidéo / gif / image)" accept="video/*,image/*" value={values.media} onChange={handleChange} />
                            </div>                        
                        </div>


                    {/* Gestion des Titres */}
                    <div  className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion du Titre
                            </h4>
                        </div>
                        <div className="flex flex-col md:flex-row justify-around w-full pb-[10px] gap-[50px]">
                            {/* Gestion du titre principal en blanc */}
                            < CmsInput name="title_main" label="Titre principal en Blanc" value={values.title_main} onChange={handleChange} placeholder={t("hero.title_main")} rightSlot={
                                <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            {/* Gestion du titre accent ou sécondaire en dégradé */}
                            < CmsInput name="title_accent" label="Titre accent en dégradé" value={values.title_accent} onChange={handleChange} placeholder={t("hero.title_accent")} rightSlot={
                                <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                            
                        </div>

                    </div>

                    {/* Gestion du slogan */}
                    <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion du Slogan
                            </h4>
                        </div>                        
                        <div className="flex flex-wrap p-[10px] gap-[30px] md:justify-between md:items-end uppercase placeholder:uppercase">
                            < CmsInput name="tagline_before" label="Slogan (avant le point culminant en dégradé)" value={values.tagline_before} onChange={handleChange} placeholder={t("hero.tagline_before")} rightSlot={
                                <CmsHideToggle name="tagline_before" value={values.tagline_before_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="tagline_highlight" label="Slogan (point culminant en dégradé)" value={values.tagline_highlight} onChange={handleChange} placeholder={t("hero.tagline_highlight")} rightSlot={
                                <CmsHideToggle name="tagline_highlight" value={values.tagline_highlight_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="tagline_after" label="Slogan (aprés le point culminant en dégradé)" value={values.tagline_after} onChange={handleChange} placeholder={t("hero.tagline_after")} rightSlot={
                                <CmsHideToggle name="tagline_after" value={values.tagline_after_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                            
                        </div>

                        
                    </div>

                    {/* Gestion de la Déscription */}
                    <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch w-full">

                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion de la description
                            </h4>
                        </div>                       

                        <div className="flex flex-wrap p-[10px] gap-[30px] md:justify-between md:items-end uppercase placeholder:uppercase">

                            {/* Gestion de la déscription ligne 1 */}

                            < CmsInput name="desc1" label="Description (ligne 1)" value={values.desc1} onChange={handleChange} placeholder={t("hero.desc1")} rightSlot={
                                <CmsHideToggle name="desc1" value={values.desc1_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                 

                            {/* Gestion de la déscription ligne 2 */}

                            <CmsInput name="desc2" label="Description (ligne 2)" value={values.desc2} onChange={handleChange} placeholder={t("hero.desc2")} rightSlot={
                                <CmsHideToggle name="desc2" value={values.desc2_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                        </div>

                    </div>

                    {/* Gestion des boutons */}
                    <div>
                        <div className="pb-[20px]">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion des boutons
                            </h4>
                        </div>
                        <div className="flex flex-wrap justify-around items-center gap-[50px] w-full">
                            {/* Gestion du premier bouton */}
                            <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                                        Premier Bouton
                                    </h5>
                                    <CmsHideToggle name="ctaParticipate" value={values.ctaParticipate_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>

                                <div className="flex flex-col gap-[20px]">
                                    <CmsInput name="ctaParticipate" label="Nom" value={values.ctaParticipate} onChange={handleChange} placeholder={t("hero.ctaParticipate")}/>

                                    <CmsInputImage name="ctaParticipate_signe" label="Signe du Premiér bouton" value={values.ctaParticipate_signe} onChange={handleChange} placeholder={t("hero.ctaParticipate_signe")} rightSlot={
                                        <CmsHideToggle name="ctaParticipate_signe" value={values.ctaParticipate_signe_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                                    />

                                    <CmsInput name="ctaParticipate_link" label="Lien du bouton" value={values.ctaParticipate_link} onChange={handleChange} placeholder={t("hero.ctaParticipate_link")} />
                                </div>
                            </div>

                            {/* Gestion du deuxiéme bouton */}
                            <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase w-full">

                                <div className="flex justify-between items-center">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                                        Deuxiéme Bouton
                                    </h5>
                                    <CmsHideToggle name="ctaLearnMore" value={values.ctaLearnMore_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div className="flex flex-col gap-[20px]">
                                    <CmsInput name="ctaLearnMore" label="Nom" value={values.ctaLearnMore} onChange={handleChange} placeholder={t("hero.ctaLearnMore")} />

                                    <CmsInputImage name="ctaLearnMore_signe" label="Signe du deuxiéme bouton" value={values.ctaLearnMore_signe} onChange={handleChange} placeholder={t("hero.ctaLearnMore_signe")} rightSlot={
                                        <CmsHideToggle name="ctaLearnMore_signe" value={values.ctaLearnMore_signe_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                                    />

                                    <CmsInput name="ctaLearnMore_link" label="Lien du bouton" value={values.ctaLearnMore_link} onChange={handleChange} placeholder={t("hero.ctaLearnMore_link")} />                                    
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <BtnSubmitForm loading={loading} className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                            Mettre à jour
                        </BtnSubmitForm>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SectionHeroForm
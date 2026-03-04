import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { useForm } from "../../../../hooks/useForm";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsInputFile from "../Fields/CmsInputFile.jsx";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm.jsx";
import useCmsContent from "../../../../hooks/useCmsContent.js";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms.js";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import saveCmsSection from "../../../../utils/saveCmsSection.js";

function SectionHeroForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "hero";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [

        "section_visibility",

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
        "ctaParticipate_link",

        "ctaLearnMore",
        "ctaLearnMore_signe",
        "ctaLearnMore_link"

    ];
    // console.log(fields);

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, setValues, handleChange } = useForm({

        section_visibility:"",
        section_visibility_is_active: 1,

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

        ctaParticipate_link:"",
        ctaParticipate_link_is_active: 1,        

        ctaLearnMore:"",
        ctaLearnMore_is_active: 1,

        ctaLearnMore_signe:"",
        ctaLearnMore_signe_is_active: 1,

        ctaLearnMore_link:"",
        ctaLearnMore_link_is_active: 1

    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { content, loading: cmsLoading } = useCmsContent(locale);
    const [initialValues, setInitialValues] = useState({});
    const [hasHydrated, setHasHydrated] = useState(false);
    
    useEffect(() => {

        if (cmsLoading) {
            return;
        }

        if (hasHydrated) return;

        const cmsSection = content?.[section];

        if (!cmsSection) return;

        // construit les valeurs initiales depuis le CMS
        const built = buildInitialValuesFromCms(fields, cmsSection, {
            fileFields: ["media", "protocol_icon", "ctaParticipate_signe", "ctaLearnMore_signe"],
        });

        setValues(built);

        setInitialValues(built);

        setHasHydrated(true);

    }, [cmsLoading, content, section, hasHydrated, setValues, locale])

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

            await saveCmsSection({ page, section, locale, fields, values });

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
            <form onSubmit={ handleSubmit } className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                
                {/***** Titre du formulaire *****/}
                <CmsFormHeader title="Gestion de la Section Hero" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                    {/* Gestion du protocol */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du protocol"/>
                        
                        <CmsFieldsBlock>
                            <CmsInput name="protocol" label="Protocol" value={values.protocol} onChange={handleChange} placeholder={t("hero.protocol")}   rightSlot={
                                <CmsHideToggle name="protocol" value={values.protocol_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} order_index={orderIndexByKey.protocol} />}
                            />

                            <CmsInputImage name="protocol_icon" label="Icon du protocol" valueUrl={values.protocol_icon} onChange={handleChange} rightSlot={
                                <CmsHideToggle name="protocol_icon" value={values.protocol_icon_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion de la video ou image */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion de la vidéo ou de l'image du fond"/>
                        
                        <CmsFieldsBlock>
                            <CmsInputFile name="media" label="Média du fond (vidéo / gif / image)" accept="video/*,image/*" value={values.media} valueUrl={values.media} onChange={handleChange} />
                        </CmsFieldsBlock>

                    </CmsBlock>


                    {/* Gestion des Titres */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion du titre"/>

                        <CmsFieldsBlock>
                            {/* Gestion du titre principal en blanc */}
                            < CmsInput name="title_main" label="Titre principal en Blanc" value={values.title_main} onChange={handleChange} placeholder={t("hero.title_main")} rightSlot={
                                <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            {/* Gestion du titre accent ou sécondaire en dégradé */}
                            < CmsInput name="title_accent" label="Titre accent en dégradé" value={values.title_accent} onChange={handleChange} placeholder={t("hero.title_accent")} rightSlot={
                                <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                            
                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion du slogan */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion du slogan"/>

                        <CmsFieldsBlock>
                            < CmsInput name="tagline_before" label="Slogan (avant le point culminant en dégradé)" value={values.tagline_before} onChange={handleChange} placeholder={t("hero.tagline_before")} rightSlot={
                                <CmsHideToggle name="tagline_before" value={values.tagline_before_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="tagline_highlight" label="Slogan (point culminant en dégradé)" value={values.tagline_highlight} onChange={handleChange} placeholder={t("hero.tagline_highlight")} rightSlot={
                                <CmsHideToggle name="tagline_highlight" value={values.tagline_highlight_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="tagline_after" label="Slogan (aprés le point culminant en dégradé)" value={values.tagline_after} onChange={handleChange} placeholder={t("hero.tagline_after")} rightSlot={
                                <CmsHideToggle name="tagline_after" value={values.tagline_after_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                            
                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion de la Déscription */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion de la déscription"/>                       

                        <CmsFieldsBlock>

                            {/* Gestion de la déscription ligne 1 */}

                            < CmsInput name="desc1" label="Description (ligne 1)" value={values.desc1} onChange={handleChange} placeholder={t("hero.desc1")} rightSlot={
                                <CmsHideToggle name="desc1" value={values.desc1_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                 

                            {/* Gestion de la déscription ligne 2 */}

                            <CmsInput name="desc2" label="Description (ligne 2)" value={values.desc2} onChange={handleChange} placeholder={t("hero.desc2")} rightSlot={
                                <CmsHideToggle name="desc2" value={values.desc2_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion des boutons */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion des boutons"/>

                        <CmsBlock>

                            {/* Gestion du premier bouton */}
                            <CmsBlock>

                                <CmsSubtitleBlock title="Gestion du premier bouton" toggleName="ctaParticipate" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                                <CmsFieldsBlock>
                                    <CmsInput name="ctaParticipate" label="Nom" value={values.ctaParticipate} onChange={handleChange} placeholder={t("hero.ctaParticipate")}/>

                                    <CmsInputImage name="ctaParticipate_signe" label="Signe du Premiér bouton" valueUrl={values.ctaParticipate_signe} onChange={handleChange} rightSlot={
                                        <CmsHideToggle name="ctaParticipate_signe" value={values.ctaParticipate_signe_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                                    />

                                    <CmsInput name="ctaParticipate_link" label="Lien du bouton" value={values.ctaParticipate_link} onChange={handleChange} placeholder={t("hero.ctaParticipate_link")} />
                                </CmsFieldsBlock>

                            </CmsBlock>

                            {/* Gestion du deuxiéme bouton */}
                            <CmsBlock>

                                <CmsSubtitleBlock title="Gestion du deuxiéme bouton" toggleName="ctaLearnMore" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                                
                                <CmsFieldsBlock>
                                    <CmsInput name="ctaLearnMore" label="Nom" value={values.ctaLearnMore} onChange={handleChange} placeholder={t("hero.ctaLearnMore")} />

                                    <CmsInputImage name="ctaLearnMore_signe" label="Signe du deuxiéme bouton" valueUrl={values.ctaLearnMore_signe} onChange={handleChange} rightSlot={
                                        <CmsHideToggle name="ctaLearnMore_signe" value={values.ctaLearnMore_signe_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                                    />

                                    <CmsInput name="ctaLearnMore_link" label="Lien du bouton" value={values.ctaLearnMore_link} onChange={handleChange} placeholder={t("hero.ctaLearnMore_link")} />                                    
                                </CmsFieldsBlock>

                            </CmsBlock>
                        </CmsBlock>
                    </CmsBlock>

                </div>

                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={loading} className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Mettre à jour
                    </BtnSubmitForm>
                </div>

            </form>
        </section>
    )
}

export default SectionHeroForm
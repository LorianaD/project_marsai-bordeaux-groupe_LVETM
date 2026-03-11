import { useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import useCmsContent from "../../../../hooks/useCmsContent";
import { useTranslation } from "react-i18next";
import CmsFormHeader from "../Titles/CmsFormHeader";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import CmsBlock from "../Titles/CmsBlock";
import CmsTitleBlock from "../Titles/CmsTitleBlock";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInput from "../Fields/CmsInput";
import CmsTextarea from "../Fields/CmsTextarea";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock";
import CmsFieldsRow from "../Titles/CmsFieldsRow";
import CmsInputDate from "../Fields/CmsInputDate";
import saveCmsSection from "../../../../utils/saveCmsSection";

function GallerySectionCountdownForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("gallery");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "gallery";
    const section = "countdown";
    // console.log("Page:", page);
    // console.log("Section:", section);

    // champs récupérés
    const fields = [

        "section_visibility",
        "title_main",
        "title_accent",
        "description",
        "badge",
        "countdown",
        "target",
        "start_date",
        "end_date"

    ]
    // console.log("Champs:", fields);

    // données envoyé à useForm
    const { values, setValues, handleChange } = useForm({

        section_visibility:"1",
        section_visibility_is_active: 1,

        title_main: "",
        title_main_is_active: 1,

        title_accent: "",
        title_accent_is_active: 1,

        description: "",
        description_is_active: 1,

        badge: "",
        badge_is_active: 1,

        countdown: "",
        countdown_is_active: 1,

        target: "",
        target_is_active: 1,

        start_date: "",
        start_date_is_active: 1,

        end_date: "",
        end_date_is_active: 1

    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { content, loading: cmsLoading } = useCmsContent(page, locale);
    const [initialValues, setInitialValues] = useState({});
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(()=>{
        if (cmsLoading) {
            return;
        }

        if (hasHydrated) return;

        const cmsSection = content?.[page]?.[section];

        if (!cmsSection) return;

        // construit les valeurs initiales depuis le CMS
        const built = buildInitialValuesFromCms(fields, cmsSection);

        setValues(built);

        setInitialValues(built);

        setHasHydrated(true);

    }, [cmsLoading, content, page, section, hasHydrated, setValues, locale])

    useEffect(()=> {
        setHasHydrated(false);
    }, [locale]);

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();

        setLoading(true)

        try {
            // console.log("try dans handleSubmit OK");

            await saveCmsSection({ page, section, locale, fields, values });

            setMessage("Section mise à jour");

        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {

            setLoading(false);

        }

    }

    if (loading) return null;

    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-12.5 flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
                {/***** Titre du formulaire : Gestion de la Section Palmares *****/}
                <CmsFormHeader title="Gestion du compte à rebour" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <div className="flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
                    
                    <CmsBlock>
                        <CmsTitleBlock title="Gestion du titre"/>
                        <CmsFieldsBlock>
                            <CmsInput name="title_main" label="Titre principal" value={values.title_main} onChange={handleChange} placeholder={t("title.line1")} rightSlot={
                                <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                            <CmsInput name="title_accent" label="Titre accent" value={values.title_accent} onChange={handleChange} placeholder={t("title.line2")} rightSlot={
                                <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                        </CmsFieldsBlock>
                    </CmsBlock>

                    <CmsBlock>
                        <CmsTitleBlock title="Gestion de la déscription"/>
                        <CmsFieldsBlock>
                            <CmsTextarea name="description" label="Déscription" value={values.description} onChange={handleChange} placeholder={t("description")} rightSlot={
                                <CmsHideToggle name="description" value={values.description_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                        </CmsFieldsBlock>
                    </CmsBlock>

                    <CmsBlock>
                        <CmsTitleBlock title="Gestion du badge"/>
                        <CmsFieldsBlock>
                            <CmsInput name="badge" label="Badge" value={values.badge} onChange={handleChange} placeholder={t("badge")} rightSlot={
                                <CmsHideToggle name="badge" value={values.badge_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                        </CmsFieldsBlock>
                    </CmsBlock>

                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du compte à rebour" toggleName="countdown" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                        
                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion de la date"/>
                            <CmsFieldsRow>
                                <CmsInputDate name="start_date" label="Date de démarage" value={values.start_date} onChange={handleChange} placeholder={t("Date de début")} />
                                <CmsInputDate name="end_date" label="Date de fin" value={values.end_date} onChange={handleChange} placeholder={t("Date de fin")} />
                            </CmsFieldsRow>
                        </CmsBlock>

                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion de la date cible" toggleName="target" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                            <CmsFieldsBlock>
                                <CmsInput name="target" label="Titre" value={values.target} onChange={handleChange} placeholder={t("target")} />
                            </CmsFieldsBlock>
                        </CmsBlock>
                        
                    </CmsBlock>

                </div>

                {/**** Footer du formulaire : bouton de submission ****/}
                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={loading} className="flex w-50 h-13.25 items-center justify-center gap-3.25 px-5.25 py-2.5 rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Mettre à jour
                    </BtnSubmitForm>
                </div>
            </form>
        </section>
    )
}

export default GallerySectionCountdownForm
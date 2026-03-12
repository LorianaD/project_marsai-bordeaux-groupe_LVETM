import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInput from "../Fields/CmsInput";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useEffect, useState } from "react";
import CmsTextarea from "../Fields/CmsTextarea";
import CmsInputColor from "../Fields/CmsImputColor";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import useCmsContent from "../../../../hooks/useCmsContent";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import CmsFormHeader from "../Titles/CmsFormHeader";
import CmsBlock from "../Titles/CmsBlock";
import saveCmsSection from "../../../../utils/saveCmsSection";

function SectionAwardForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "award";
    // console.log("Page:", page);
    // console.log("Section:", section);

    // champs récupérés
    const fields = [

        "section_visibility",

        "eyebrow",
        "eyebrow_color",

        "title1",
        "title2",

        "description",

        "ctaSeeMore",
        "ctaSeeMore_link",
        "ctaSeeMore_color"

    ]
    // console.log("Champs:", fields);

    // données envoyé à useForm
    const { values, setValues, handleChange } = useForm({

        section_visibility:"1",
        section_visibility_is_active: 1,

        eyebrow:"",
        eyebrow_is_active: 1,

        eyebrow_color:"",
        eyebrow_color_is_active: 1,

        title1:"",
        title1_is_active: 1,

        title2:"",
        title2_is_active: 1,

        description:"",
        description_is_active: 1,

        ctaSeeMore:"",
        ctaSeeMore_is_active: 1,

        ctaSeeMore_color: "#E1BDFF",
        ctaSeeMore_color_is_active: 1,

        ctaSeeMore_link:"",
        ctaSeeMore_link_is_active: 1,

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
        const built = buildInitialValuesFromCms(fields, cmsSection, {
            fileFields: [],
        });

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
            <form onSubmit={ handleSubmit } className="p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                {/***** Titre du formulaire : Gestion de la Section Palmares *****/}
                <CmsFormHeader title="Gestion de la Section Palmares" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <CmsBlock>
                    {/**** Corp du formulaire : inputs ****/}
                    <div className="w-full flex gap-[20px] items-center">
                        <CmsInput name="eyebrow" label="Titre du projet" value={values.eyebrow} onChange={handleChange} placeholder={t("award.eyebrow")} rightSlot={
                            <CmsHideToggle name="eyebrow" value={values.eyebrow_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                        />
                        <CmsInputColor name="eyebrow_color" value={values.eyebrow_color} onChange={handleChange} placeholder={t("award.eyebrow_color")} />
                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-[20px] items-end">
                        <CmsInput name="title1" label="Titre principal (ligne 1)" value={values.title1} onChange={handleChange} placeholder={t("award.title1")} rightSlot={
                            <CmsHideToggle name="title1" value={values.title1_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        }/>
                        <CmsInput name="title2" label="Titre principal (ligne 2 dégradée)" value={values.title2} onChange={handleChange} placeholder={t("award.title2")} rightSlot={
                            <CmsHideToggle name="title2" value={values.title2_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        }/>
                    </div>

                    <div className="w-full">
                        <CmsTextarea name="description" label="Description" value={values.description} onChange={handleChange} placeholder={t("award.description")} rightSlot={
                            <CmsHideToggle name="description" value={values.description_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        }/>
                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-[20px] items-center">
                        <CmsInput name="ctaSeeMore" label="Bouton" value={values.ctaSeeMore} onChange={handleChange} placeholder={t("award.ctaSeeMore")} rightSlot={
                            <CmsHideToggle name="ctaSeeMore" value={values.ctaSeeMore_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        }/>

                        <CmsInput name="ctaSeeMore_link" label="Lien du bouton" value={values.ctaSeeMore_link} onChange={handleChange} placeholder={t("award.ctaSeeMore_link")} />

                        <CmsInputColor name="ctaSeeMore_color" value={values.ctaSeeMore_color} onChange={handleChange} placeholder={t("award.ctaSeeMore_color")} />

                    </div>                

                    {/**** Footer du formulaire : bouton de submission ****/}
                    <div className="w-full flex justify-center">
                        <BtnSubmitForm loading={loading} className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                            Mettre à jour
                        </BtnSubmitForm>
                    </div>
                </CmsBlock>

            </form>
        </section>
    )
}

export default SectionAwardForm
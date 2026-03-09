import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import saveCmsSection from "../../../../utils/saveCmsSection";
import CmsFormHeader from "../Titles/CmsFormHeader";
import useCmsContent from "../../../../hooks/useCmsContent";
import { useEffect, useState } from "react";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import CmsTitleBlock from "../Titles/CmsTitleBlock";
import CmsBlock from "../Titles/CmsBlock";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock";
import CmsInput from "../Fields/CmsInput";

function GallerySectionHeroForm( forcedLocale ) {
    const { t, i18n } = useTranslation("gallery");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "gallery";
    const section = "hero";
    // console.log("Page:", page);
    // console.log("Section:", section);

    // champs récupérés
    const fields = [

        "section_visibility",

    ]
    // console.log("Champs:", fields);

    // données envoyé à useForm
    const { values, setValues, handleChange } = useForm({

        section_visibility:"1",
        section_visibility_is_active: 1,

        title: "",
        title_is_active: 1,

    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { content, loading: cmsLoading } = useCmsContent(locale);
    const [initialValues, setInitialValues] = useState({});
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(()=>{
        if (cmsLoading) {
            return;
        }

        if (hasHydrated) return;

        const cmsSection = content?.[section];

        if (!cmsSection) return;

        // construit les valeurs initiales depuis le CMS
        const built = buildInitialValuesFromCms(fields, cmsSection, {
            fileFields: [],
        });

        setValues(built);

        setInitialValues(built);

        setHasHydrated(true);

    }, [cmsLoading, content, section, hasHydrated, setValues, locale])

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
                <CmsFormHeader title="Gestion de la Section Hero" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                    <CmsBlock>
                        <CmsTitleBlock title="Gestion du titre"/>
                        <CmsFieldsBlock>
                            <CmsInput name="title_main" label="Titre principal" value={values.title_main} onChange={handleChange} placeholder={t("")} rightSlot={
                                <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} order_index={orderIndexByKey.protocol} />}
                            />
                            <CmsInput name="title_accent" label="Titre accent" value={values.title_accent} onChange={handleChange} placeholder={t("")} rightSlot={
                                <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} order_index={orderIndexByKey.protocol} />}
                            />
                        </CmsFieldsBlock>
                    </CmsBlock>
                </div>

                {/**** Footer du formulaire : bouton de submission ****/}
                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={loading} className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Mettre à jour
                    </BtnSubmitForm>
                </div>

            </form>
        </section>
    )
}

export default GallerySectionHeroForm

//         {/* Title */}
// <div className="mb-8">
//   <h1 className="font-extrabold leading-[1.05] tracking-tight" style={{ fontSize: "clamp(48px, 6vw, 80px)" }} >

//     <span className="block text-blue-600">
//          {t("title.line1")}
//     </span>

//       <span className="block bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
//           {t("title.line2")}
//       </span>

//   </h1>
// </div>
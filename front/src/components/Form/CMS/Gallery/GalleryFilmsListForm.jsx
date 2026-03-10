import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useEffect, useState } from "react";
import useCmsContent from "../../../../hooks/useCmsContent";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import saveCmsSection from "../../../../utils/saveCmsSection";
import CmsFormHeader from "../Titles/CmsFormHeader";
import CmsBlock from "../Titles/CmsBlock";
import CmsTitleBlock from "../Titles/CmsTitleBlock";

function GalleryFilmsListForm({ forcedLocale }) {
    const { t, i18n } = useTranslation("gallery");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "gallery";
    const section = "grid";
    // console.log("Page:", page);
    // console.log("Section:", section);

    // champs récupérés
    const fields = [

        "section_visibility",
        "search_visibility",
        "films_grid_visibility"

    ]
    // console.log("Champs:", fields);

    // données envoyé à useForm
    const { values, setValues, handleChange } = useForm({

        section_visibility: "",
        section_visibility_is_active: 1,

        search_visibility: "",
        search_visibility_is_active: 1,

        films_grid_visibility: "",
        films_grid_visibility_is_active: 1

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
                <CmsFormHeader title="Gestion de la Section liste des films" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <CmsBlock>
                    <CmsTitleBlock title="Gestion de la barre de recherche" toggleName="search_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                </CmsBlock>

                <CmsBlock>
                    <CmsTitleBlock title="Gestion de la grille de films" toggleName="films_grid_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                </CmsBlock>
            </form>
        </section>
    )
}

export default GalleryFilmsListForm
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInput from "../Fields/CmsInput";
import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useEffect, useState } from "react";
import CmsTextarea from "../Fields/CmsTextarea";
import { updateContentApi } from "../../../../services/CMS/UpdateContentApi";
import CmsInputColor from "../Fields/CmsImputColor";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import useCmsContent from "../../../../hooks/useCmsContent";

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

            const sharedLinkKeys = new Set([ "ctaSeeMore_link" ]);

            const sharedKeys = new Set([ ...sharedLinkKeys ]);

            const localesToSave = (key) => (sharedKeys.has(key) ? ["fr", "en"] : [locale]);

            // boucle pour traiter chaque champs un par un
            for (let i = 0; i < fields.length; i++) {
                
                // nom du champ
                const key = fields[i];
                // console.log(key);
                
                // valeur actuelle du formulaire
                const val = values[key];
                // console.log(val);

                const targetLocales = localesToSave(key);

                let is_active = values[`${key}_is_active`];
                
                for (const loc of targetLocales) {

                    // gestion des texte
                    const empty = val === undefined || val === null || String(val).trim() === "";

                    // texte vide
                    if (empty) continue;

                    // texte non vide
                    await updateContentApi({
                        page,
                        section,
                        locale: loc,
                        content_key: key,
                        value: val,
                        order_index: i,
                        is_active,    
                    });

                }
                
            }

            setMessage("Section mise à jour");

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
                <div className="flex items-center gap-[10px] self-stretch">
                    <div className="flex items-center gap-[10px]">
                        <div>
                            <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                            <img src={ iconPaint } alt="" className="block dark:hidden"/>
                        </div>
                        <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                            Gestion de la Section Palmares
                        </h3>                        
                    </div>
                    <CmsHideToggle name="section_visibility" value={values.section_visibility_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                </div>

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
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
                        <button type="submit" className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                            Mettre à jour
                        </button>
                    </div>
                </div>

            </form>
        </section>
    )
}

export default SectionAwardForm
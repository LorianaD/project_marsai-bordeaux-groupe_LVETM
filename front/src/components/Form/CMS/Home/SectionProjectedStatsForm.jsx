import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useEffect, useState } from "react";
import useCmsContent from "../../../../hooks/useCmsContent";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import CmsBlock from "../Titles/CmsBlock";
import CmsFormHeader from "../Titles/CmsFormHeader";
import CmsTitleBlock from "../Titles/CmsTitleBlock";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock";
import CmsInputColor from "../Fields/CmsImputColor";
import CmsFieldsRow from "../Titles/CmsFieldsRow";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";

function SectionProjectedStatsForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "projectedStats";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [

        "section_visibility",
        "heading_title_main",
        "heading_title_accent",
        "heading_title_accent_color",
        "heading_tagline",
        "stat1_value",
        "stat1_label",
        "stat1_label_color",
        "stat2_value",
        "stat2_label",
        "stat2_label_color"

    ];
    // console.log(fields);

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, setValues, handleChange } = useForm({

        section_visibility:"",
        section_visibility_is_active: 1,

        heading_title_main: "",
        heading_title_main_is_active: 1,

        heading_title_accent: "",
        heading_title_accent_color: "",
        heading_title_accent_is_active: 1,

        heading_tagline: "",
        heading_tagline_is_active: 1,

        stat1_value: "",
        stat1_label: "",
        stat1_label_color: "",
        stat1_value_is_active: 1,

        stat2_value: "",
        stat2_label: "",
        stat2_label_color: "",
        stat2_value_is_active: 1

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
            fileFields: [],
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

            const sharedImageKeys = new Set([  ]);

            const sharedLinkKeys = new Set([  ]);

            const sharedKeys = new Set([ ...sharedImageKeys, ...sharedLinkKeys ]);

            const localesToSave = (key) => (sharedKeys.has(key) ? ["fr", "en"] : [locale]);

            for (let i = 0; i < fields.length; i++) {
                const key = fields[i];
                const val = values[key];
                const is_active = values[`${key}_is_active`];

                const targetLocales = localesToSave(key);

                for (const loc of targetLocales) {

                    // IMAGE
                    if (val instanceof File) {
                        await updateImageApi({
                            page,
                            section,
                            locale: loc,
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
                        locale: loc,
                        content_key: key,
                        value: val,
                        order_index: i,
                        is_active,    
                    })

                }

            }

            setMessage("Section Localisation de l'événement mise à jour");

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
                <CmsFormHeader title="Gestion de la Section Chiffres projetés" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                
                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                    
                    {/* Gestion du Titre */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du titre" toggleName="" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                        <CmsBlock>

                            <CmsBlock>

                                <CmsSubtitleBlock title="Titre principal"  toggleName="heading_title_main" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                                <CmsInput name="heading_title_main" label="Titre" value={values.heading_title_main} onChange={handleChange} placeholder={t("projectedStats.heading.title_main")} />
                            
                            </CmsBlock>

                            <CmsBlock>

                                <CmsSubtitleBlock title="Titre accent"  toggleName="heading_title_accent" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                                
                                <CmsFieldsRow>
                                    <CmsInput name="heading_title_accent" label="Titre" value={values.heading_title_accent} onChange={handleChange} placeholder={t("projectedStats.heading.title_accent")} />
                                    <CmsInputColor name="heading_title_accent_color" value={values.heading_title_accent_color} onChange={handleChange} />
                                </CmsFieldsRow>

                            </CmsBlock>

                        </CmsBlock>

                    </CmsBlock>

                    {/* Gestion du slogant */}
                    <CmsBlock>
                        <CmsTitleBlock title="Gestion du slogant" toggleName="heading_tagline" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                        <CmsInput name="heading_tagline" label="Slogant" value={values.heading_tagline} onChange={handleChange} placeholder={t("projectedStats.heading.tagline")} />
                    </CmsBlock>

                    {/* Gestion des cards */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion des cartes" />

                        {/* Card 1 */}
                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion de la carte 1" toggleName="stat1_value" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>

                                <CmsInput name="stat1_value" label="Valeur" value={values.stat1_value} onChange={handleChange} placeholder={t("projectedStats.stat1.value")} />

                                <CmsFieldsRow>
                                    <CmsInput name="stat1_label" label="Label" value={values.stat1_label} onChange={handleChange} placeholder={t("projectedStats.stat1.label")} />
                                    <CmsInputColor name="stat1_label_color" value={values.stat1_label_color} onChange={handleChange} />
                                </CmsFieldsRow>

                            </CmsFieldsBlock>

                        </CmsBlock>

                        {/* Card 2 */}
                        <CmsBlock>
                            <CmsSubtitleBlock title="Gestion de la carte 2" toggleName="stat2_value" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>

                                <CmsInput name="stat2_value" label="Valeur" value={values.stat2_value} onChange={handleChange} placeholder={t("projectedStats.stat2.value")} />

                                <CmsFieldsRow>
                                    <CmsInput name="stat2_label" label="Label" value={values.stat2_label} onChange={handleChange} placeholder={t("projectedStats.stat2.label")} />
                                    <CmsInputColor name="stat2_label_color" value={values.stat2_label_color} onChange={handleChange} />
                                </CmsFieldsRow>

                            </CmsFieldsBlock>

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

export default SectionProjectedStatsForm
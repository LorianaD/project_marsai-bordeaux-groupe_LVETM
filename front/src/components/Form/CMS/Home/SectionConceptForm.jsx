import CmsInput from "../Fields/CmsInput.jsx"
import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm.js";
import { useEffect, useState } from "react";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi.js";
import CmsTextarea from "../Fields/CmsTextarea.jsx";
import CmsHideToggle from "../Fields/CmsHideToggle.jsx";
import CmsInputColor from "../Fields/CmsImputColor.jsx";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm.jsx";
import useCmsContent from "../../../../hooks/useCmsContent.js";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms.js";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import CmsFieldsRow from "../Titles/CmsFieldsRow.jsx";

function SectionConceptForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "concept";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [

        "section_visibility",        

        "title_main",

        "card1_title",
        "card1_description",
        "card1_title_color",

        "card2_title",
        "card2_description",
        "card2_title_color",

        "card3_title",
        "card3_description",
        "card3_title_color",

        "card4_title",
        "card4_description",
        "card4_title_color",

    ];
    // console.log(fields);

    const { values, setValues, handleChange } = useForm({

        section_visibility:"1",
        section_visibility_is_active: 1,        

        title_main:"",
        title_main_is_active: 0,

        card1_title:"",
        card1_description:"",
        card1_title_color:"#C27AFF",
        card1_title_is_active: 1,

        card2_title:"",
        card2_description:"",
        card2_title_color:"#00D492",
        card2_title_is_active: 1,

        card3_title:"",
        card3_description:"",
        card3_title_color:"#FB64B6",
        card3_title_is_active: 1,

        card4_title:"",
        card4_description:"",
        card4_title_color:"#2B7FFF",
        card4_title_is_active: 1

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

            const sharedLinkKeys = new Set([]);

            const sharedKeys = new Set([ ...sharedLinkKeys ]);

            const localesToSave = (key) => (sharedKeys.has(key) ? ["fr", "en"] : [locale]);            

            for (let i = 0; i < fields.length; i++) {
                const key = fields[i];
                const val = values[key];

                const targetLocales = localesToSave(key);

                let is_active;

                // cherche la key est verifie si elle contient card + un numéro +_
                const cardMatch = key.match(/^card(\d+)_/);
                
                if (cardMatch) {
                    is_active = values[`card${cardMatch[1]}_title_is_active`];
                } else {
                    is_active = values[`${key}_is_active`];
                }



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
                for (const loc of targetLocales) {
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
                
                console.log("SEND:", key, val, targetLocales);

            }

            setMessage("Section Concept mise à jour");

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

                {/***** Titre du formulaire : Gestion de la Section Concept *****/}
                <CmsFormHeader  title="Gestion de la Section Concept" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <CmsBlock>
                    <CmsInput name="title_main" label="Titre principal" value={values.title_main} onChange={handleChange} placeholder={t("concept.title_main")} rightSlot={
                        <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                    />
                </CmsBlock>

                <CmsBlock>

                    <CmsBlock>

                        {/* Gestion de la card 1 */}
                        <CmsTitleBlock title="Gestion de la carte 1" toggleName="card1_title_is_active" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                        
                        <CmsFieldsBlock>
                            <CmsFieldsRow>
                                <CmsInput name="card1_title" label="Titre" value={values.card1_title} onChange={handleChange} placeholder={t("concept.card1.title")} />
                                <CmsInputColor name="card1_title_color" label="" value={values.card1_title_color} onChange={handleChange} />
                            </CmsFieldsRow>
                            <CmsTextarea name="card1_description" label="Description" value={values.card1_description} onChange={handleChange} placeholder={t("concept.card1.description")}/>
                        </CmsFieldsBlock>

                    </CmsBlock>

                    <CmsBlock>
                        
                        {/* Gestion de la card 2 */}
                        <CmsTitleBlock title="Gestion de la carte 2" toggleName="card2_title_is_active" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                        
                        <CmsFieldsBlock>
                            <CmsFieldsRow>
                                <CmsInput name="card2_title" label="Titre" value={values.card2_title} onChange={handleChange} placeholder={t("concept.card2.title")} />
                                <CmsInputColor name="card2_title_color" label="" value={values.card2_title_color} onChange={handleChange} />
                            </CmsFieldsRow>
                            <CmsTextarea name="card2_description" label="Description" value={values.card2_description} onChange={handleChange} placeholder={t("concept.card2.description")}/>
                        </CmsFieldsBlock>

                    </CmsBlock>

                    <CmsBlock>

                        {/* Gestion de la card 3 */}
                        <CmsTitleBlock title="Gestion de la carte 3" toggleName="card3_title_is_active" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                        
                        <CmsFieldsBlock>
                            <CmsFieldsRow>
                                <CmsInput name="card3_title" label="Titre" value={values.card3_title} onChange={handleChange} placeholder={t("concept.card3.title")} />
                                <CmsInputColor name="card3_title_color" label="" value={values.card3_title_color} onChange={handleChange} />
                            </CmsFieldsRow>
                            <CmsTextarea name="card3_description" label="Description" value={values.card3_description} onChange={handleChange} placeholder={t("concept.card3.description")}/>
                        </CmsFieldsBlock>

                    </CmsBlock>

                    <CmsBlock>

                        <CmsTitleBlock title="Gestion de la carte 4" toggleName="card4_title_is_active" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                        
                        <CmsFieldsBlock>
                            <CmsFieldsRow>
                                <CmsInput name="card4_title" label="Titre" value={values.card4_title} onChange={handleChange} placeholder={t("concept.card4.title")} />
                                <CmsInputColor name="card4_title_color" label="" value={values.card4_title_color} onChange={handleChange} />
                            </CmsFieldsRow>
                            <CmsTextarea name="card4_description" label="Description" value={values.card4_description} onChange={handleChange} placeholder={t("concept.card4.description")}/>
                        </CmsFieldsBlock>

                    </CmsBlock>                    

                </CmsBlock>

                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={loading}>
                        Mettre à jour
                    </BtnSubmitForm>
                </div>

            </form>
        </section>
    )
}

export default SectionConceptForm

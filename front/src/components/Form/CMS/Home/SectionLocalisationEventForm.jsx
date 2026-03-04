import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useEffect, useState } from "react";
import useCmsContent from "../../../../hooks/useCmsContent";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import CmsFormHeader from "../Titles/CmsFormHeader";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsTitleBlock from "../Titles/CmsTitleBlock";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsBlock from "../Titles/CmsBlock";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock";
import CmsInputColor from "../Fields/CmsImputColor";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock";
import CmsFieldsRow from "../Titles/CmsFieldsRow";
import CmsTextarea from "../Fields/CmsTextarea";
import saveCmsSection from "../../../../utils/saveCmsSection";

function SectionLocalisationEventForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "localisationEvent";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [

        "section_visibility",
        "eyebrow",
        "eyebrow_icon",
        "eyebrow_color",
        "venue_namePart1",
        "venue_namePart2", 
        "venue_cityTagline",
        "venue_color",
        "address_street",
        "address_postalCode",
        "address_city",
        "address_color",
        "access_tram",
        "access_color",
        "space1_name",
        "space1_description",
        "space1_color",
        "space2_name",
        "space2_description",
        "space2_color",
        "maps_link",

    ];
    // console.log(fields);

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, setValues, handleChange } = useForm({

        section_visibility:"",
        section_visibility_is_active: 1,

        eyebrow: "",
        eyebrow_icon: "",
        eyebrow_color: "",
        eyebrow_is_active: 1,

        venue_namePart1: "",
        venue_namePart1_is_active: 1,

        venue_namePart2: "",
        venue_namePart2_is_active: 1,

        venue_cityTagline: "",
        venue_color: "",
        venue_cityTagline_is_active: 1,

        address_street: "",
        address_postalCode: "",
        address_city: "",
        address_color: "",
        address_street_is_active: 1,

        access_tram: "",
        access_color: "",
        access_tram_is_active: 1,

        space1_name: "",
        space1_description: "",
        space1_color: "",
        space1_name_is_active: 1,

        space2_name: "",
        space2_description: "",
        space2_color: "",
        space2_name_is_active: 1,

        maps_link: "",
        maps_link_is_active: 1

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
            fileFields: ["logo", "eyebrow_icon"],
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
                <CmsFormHeader title="Gestion de la Section Localisation de l'événement" toggleName="section_visibility" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                    {/* Gestion du eyebrow */}
                    <CmsBlock>
                        
                        <CmsTitleBlock title="Gestion du sur-titre" toggleName="eyebrow" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                        <CmsFieldsBlock>

                            <CmsInput name="eyebrow" label="Nom" value={values.eyebrow} onChange={handleChange} placeholder={t("localisationEvent.eyebrow")} />

                            <CmsInputImage name="eyebrow_icon" label="Icon" valueUrl={values.eyebrow_icon} onChange={handleChange} rightSlot={
                                <CmsHideToggle name="eyebrow_icon" value={values.eyebrow_icon_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                        </CmsFieldsBlock>

                    </CmsBlock>

                    {/* Gestion des adresse et mode d'accés */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion des adresse et mode d'accés" />
                        
                        <CmsBlock>
                            
                            <CmsSubtitleBlock title="Gestion de la ville" toggleName="venue_cityTagline" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsRow>
                                <CmsInput name="venue_cityTagline" label="Nom" value={values.venue_cityTagline} onChange={handleChange} placeholder={t("localisationEvent.venue.cityTagline")} />
                                <CmsInputColor name="venue_color" label="" value={values.venue_color} onChange={handleChange} />
                            </CmsFieldsRow>

                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion de l' adresse" toggleName="address_street" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                            <CmsFieldsRow>
                                <CmsInput name="address_street" label="Rue" value={values.address_street} onChange={handleChange} placeholder={t("localisationEvent.address.street")} />
                                <CmsInput name="address_postalCode" label="Code postal" value={values.address_postalCode} onChange={handleChange} placeholder={t("localisationEvent.address.postalCode")} />
                                <CmsInput name="address_city" label="Ville" value={values.address_city} onChange={handleChange} placeholder={t("localisationEvent.address.city")} />
                            </CmsFieldsRow>

                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du mode d'accés" toggleName="access_tram" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                            <CmsFieldsRow>
                                <CmsInput name="access_tram" label="Mode" value={values.access_tram} onChange={handleChange} placeholder={t("localisationEvent.access.tram")} />
                            </CmsFieldsRow>

                        </CmsBlock>

                    </CmsBlock>

                    {/* Gestion des cartes */}
                    <CmsBlock>

                        <CmsTitleBlock title="Gestion des cartes" />
                        
                        <CmsBlock>
                            
                            <CmsSubtitleBlock title="Gestion de la carte 1" toggleName="space1_name" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsBlock>
                                <CmsFieldsRow>
                                    <CmsInput name="space1_name" label="Nom" value={values.space1_name} onChange={handleChange} placeholder={t("localisationEvent.space1.name")} />
                                    <CmsInputColor name="space1_color" label="" value={values.space1_color} onChange={handleChange} />
                                </CmsFieldsRow>
                                <CmsTextarea name="space1_description" labe="Déscription" value={values.space1_description} onChange={handleChange} placeholder={t("localisationEvent.space1.description")} />
                            </CmsBlock>

                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion de la carte 2" toggleName="space2_name" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                            <CmsBlock>
                                <CmsFieldsRow>
                                    <CmsInput name="space2_name" label="Nom" value={values.space2_name} onChange={handleChange} placeholder={t("localisationEvent.space2.name")} />
                                    <CmsInputColor name="space2_color" label="" value={values.space2_color} onChange={handleChange} />
                                </CmsFieldsRow>
                                <CmsTextarea name="space2_description" labe="Déscription" value={values.space2_description} onChange={handleChange} placeholder={t("localisationEvent.space2.description")} />
                            </CmsBlock>

                        </CmsBlock>

                    </CmsBlock>

                    <CmsBlock>
                        <CmsTitleBlock title="Gestion de Google Maps" toggleName="maps_link" values={values} handleChange={handleChange} page={page} section={section} locale={locale}/>
                        <CmsBlock>
                            <CmsInput name="maps_link" label="Lien" value={values.maps_link} onChange={handleChange} placeholder={t("localisationEvent.maps.link")} />
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

export default SectionLocalisationEventForm
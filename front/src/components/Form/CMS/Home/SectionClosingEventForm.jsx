import iconPaintDark from "../../../../assets/imgs/icones/IconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/IconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useEffect, useState } from "react";
import useCmsContent from "../../../../hooks/useCmsContent";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInput from "../Fields/CmsInput";
import CmsInputImage from "../Fields/CmsInputImage";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import saveCmsSection from "../../../../utils/saveCmsSection";


function SectionClosingEventForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "closingEvent";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [

        "section_visibility",

        "eyebrow",
        "eyebrow_text_color",
        "eyebrow_bg_color",

        "title_main",
        "title_main_color",

        "title_accent",
        "title_accent_color",

        "description_ligne1",
        "description_ligne2",

        "card_icon",
        "card_date",
        "card_hour",
        "card_localisation",
        "card_ctaBooking",
        "card_ctaBooking_link"

    ];
    // console.log(fields);

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, setValues, handleChange } = useForm({

        section_visibility:"",
        section_visibility_is_active: 1,

        eyebrow: "",
        eyebrow_is_active: 1,

        eyebrow_text_color: "",
        eyebrow_text_color_is_active: 1,

        eyebrow_bg_color: "",
        eyebrow_bg_color_is_active: 1,

        title_main: "",
        title_main_is_active: 1,

        title_main_color: "",
        title_main_color_is_active: 1,

        title_accent: "",
        title_accent_is_active: 1,

        title_accent_color: "",
        title_accent_color_is_active: 1,

        description_ligne1: "",
        description_ligne1_is_active: 1,

        description_ligne2: "",
        description_ligne2_is_active: 1,

        card_icon: "",
        card_icon_is_active: 1,

        card_date: "",
        card_date_is_active: 1,

        card_hour: "",
        card_hour_is_active: 1,

        card_localisation: "",
        card_localisation_is_active: 1,

        card_ctaBooking: "",
        card_ctaBooking_is_active: 1,
        
        card_ctaBooking_link: "",
        card_ctaBooking_link_is_active: 1

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
            fileFields: ["eyebrow_icon", "card_icon"],
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

            setMessage("Section de la soirée de clôture mise à jour");

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
                <div className="flex items-center justify-between gap-[10px] self-stretch">
                    <div className="flex items-center gap-[10px]">
                        <div>
                            <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                            <img src={ iconPaint } alt="" className="block dark:hidden"/>
                        </div>
                        <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                            Gestion de la Section de soirée de clôture
                        </h3>                        
                    </div>
                    <CmsHideToggle name="section_visibility" value={values.section_visibility_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                </div>

                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                    
                    {/* Gestion du eyebrow */}
                    <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                        
                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion du sur-titre
                            </h4>
                        </div>
                        <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                            <CmsInput name="eyebrow" label="Nom" value={values.eyebrow} onChange={handleChange} placeholder={t("closingEvent.eyebrow")}   rightSlot={
                                <CmsHideToggle name="eyebrow" value={values.eyebrow_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} order_index={orderIndexByKey.eyebrow} />}
                            />

                            {/* <CmsInputImage name="eyebrow_icon" label="Icon" valueUrl={values.eyebrow_icon} onChange={handleChange} rightSlot={
                                <CmsHideToggle name="eyebrow_icon" value={values.eyebrow_icon_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            /> */}

                        </div>

                    </div>

                    {/* Gestion du titre */}
                    <div  className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                        
                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion du Titre
                            </h4>
                        </div>
                        <div className="flex flex-col md:flex-row justify-around w-full pb-[10px] gap-[50px]">
                            {/* Gestion du titre principal en blanc */}
                            < CmsInput name="title_main" label="Titre principal en Blanc" value={values.title_main} onChange={handleChange} placeholder={t("closingEvent.title_main")} rightSlot={
                                <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            {/* Gestion du titre accent ou sécondaire en dégradé */}
                            < CmsInput name="title_accent" label="Titre accent en dégradé" value={values.title_accent} onChange={handleChange} placeholder={t("closingEvent.title_accent")} rightSlot={
                                <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
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

                            < CmsInput name="description_ligne1" label="Description (ligne 1)" value={values.description_ligne1} onChange={handleChange} placeholder={t("closingEvent.description.ligne1")} rightSlot={
                                <CmsHideToggle name="description_ligne1" value={values.description_ligne1_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                 

                            {/* Gestion de la déscription ligne 2 */}

                            <CmsInput name="description_ligne2" label="Description (ligne 2)" value={values.description_ligne2} onChange={handleChange} placeholder={t("closingEvent.description.ligne2")} rightSlot={
                                <CmsHideToggle name="description_ligne2" value={values.description_ligne2_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                        </div>

                    </div>

                    {/* Gestion de la card */}
                    <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch w-full">

                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion de la carte de l'événement
                            </h4>
                        </div>

                        <div className="flex flex-wrap p-[10px] gap-[30px] md:justify-between md:items-end uppercase placeholder:uppercase">

                            {/* Gestion de l'icon */}

                            < CmsInputImage name="card_icon" label="Icon" value={values.card_icon} onChange={handleChange} placeholder={t("closingEvent.card.icon")} rightSlot={
                                <CmsHideToggle name="card_icon" value={values.card_icon_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                 

                            {/* Gestion de la date */}

                            <CmsInput name="card_date" label="Date" value={values.card_date} onChange={handleChange} placeholder={t("closingEvent.card.date")} rightSlot={
                                <CmsHideToggle name="card_date" value={values.card_date_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            <CmsInput name="card_hour" label="Heure" value={values.card_hour} onChange={handleChange} placeholder={t("closingEvent.card.hour")} rightSlot={
                                <CmsHideToggle name="card_hour" value={values.card_hour_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            <CmsInput name="card_localisation" label="Lieux" value={values.card_localisation} onChange={handleChange} placeholder={t("closingEvent.card.localisation")} rightSlot={
                                <CmsHideToggle name="card_localisation" value={values.card_localisation_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch w-full">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                                        Gestion du bouton
                                    </h5>
                                    <CmsHideToggle  name="card_ctaBooking" value={values.card_ctaBooking_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                
                                <div className="flex flex-col gap-[20px]">
                                    <CmsInput name="card_ctaBooking" label="Nom" value={values.card_ctaBooking} onChange={handleChange} placeholder={t("closingEvent.card.ctaBooking")} />
                                    <CmsInput name="card_ctaBooking_link" label="Lien" value={values.card_ctaBooking_link} onChange={handleChange} placeholder={t("closingEvent.card.ctaBooking_link")} />
                                </div>
                            </div>

                        </div>

                    </div>

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

export default SectionClosingEventForm

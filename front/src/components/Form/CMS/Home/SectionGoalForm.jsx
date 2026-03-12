import CmsInput from "../Fields/CmsInput"
import iconPaintDark from "../../../../assets/imgs/icones/IconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/IconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useEffect, useState } from "react";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi";
import CmsTextarea from "../Fields/CmsTextarea";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInputImage from "../Fields/CmsInputImage";
import useCmsContent from "../../../../hooks/useCmsContent";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import saveCmsSection from "../../../../utils/saveCmsSection";

function SectionGoalForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "goal";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [

        "section_visibility",
        
        "title_main",
        "title_accent",

        "card1_title",
        "card1_description",
        "card1_icon",

        "card2_title",
        "card2_description",
        "card2_icon",

        "card3_title",
        "card3_description",
        "card3_icon",

    ];
    // console.log(fields);

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, setValues, handleChange } = useForm({

        section_visibility:"",
        section_visibility_is_active: 1,
        
        title_main:"",
        title_main_is_active: 1,

        title_accent:"",
        title_accent_is_active: 1,

        card1_title:"",
        card1_description:"",
        card1_icon:"",
        card1_title_is_active: 1,

        card2_title:"",
        card2_description:"",
        card2_icon:"",
        card2_title_is_active: 1,

        card3_title:"",
        card3_description:"",
        card3_icon:"",
        card3_title_is_active: 1

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
            fileFields: ["media", "protocol_icon", "ctaParticipate_signe", "ctaLearnMore_signe"],
        });

        setValues(built);

        setInitialValues(built);

        setHasHydrated(true);

    }, [cmsLoading, content, page, section, hasHydrated, setValues, locale])

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();
        setLoading(true);

        try {

            // console.log("try dans handleSubmit OK");

            await saveCmsSection({ page, section, locale, fields, values });

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

                {/***** Titre du formulaire *****/}
                <div className="flex items-center gap-[10px] self-stretch w-full">
                    <div>
                        <div>
                            <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                            <img src={ iconPaint } alt="" className="block dark:hidden"/>
                        </div>
                        <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                            Gestion de la Section des objectifs
                        </h3>
                    </div>
                    <CmsHideToggle name="section_visibility" value={values.section_visibility_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                </div>

                <div className="flex flex-col pb-[10px] md:flex-wrap md:justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">
                    <CmsInput name="title_main" label="Titre principal (en Blanc)" value={values.title_main} onChange={handleChange} placeholder={t("goal.title_main")} rightSlot={
                        <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                    />

                    <CmsInput name="title_accent" label="Titre accent (coloré)" value={values.title_accent} onChange={handleChange} placeholder={t("goal.title_accent")} rightSlot={
                        <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                    />
                </div>

                <div className="w-full flex flex-col md:flex-wrap md:justify-around gap-[30px]">
                    <div className="w-full flex flex-col gap-[20px]">
                        <div className="w-full flex justify-between">
                            <h4 className="text-[20px] font-semibold tracking-[2.24px]">
                                Carte 1
                            </h4>
                            <CmsHideToggle name="card1_title" value={values.card1_title_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        </div>
                        <div className="w-full flex flex-col gap-[16px]">
                            <CmsInput name="card1_title" label="Titre" value={values.card1_title} onChange={handleChange} placeholder={t("goal.cards.card1.title")} />
                            <CmsTextarea name="card1_description" label="Description" value={values.card1_description} onChange={handleChange} placeholder={t("goal.cards.card1.description")}/>
                            <CmsInputImage name="card1_icon" label="Icon de la carte" value={values.card1_icon} onChange={handleChange} placeholder={t("goal.cards.card1.icon")} />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-[20px]">
                        <div className="w-full flex justify-between">
                            <h4 className="text-[20px] font-semibold tracking-[2.24px]">
                                Carte 2
                            </h4>
                            <CmsHideToggle name="card2_title" value={values.card2_title_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        </div>
                        <div className="w-full flex flex-col gap-[16px]">
                            <CmsInput name="card2_title" label="Titre" value={values.card2_title} onChange={handleChange} placeholder={t("goal.cards.card2.title")} />
                            <CmsTextarea name="card2_description" label="Description" value={values.card2_description} onChange={handleChange} placeholder={t("goal.cards.card2.description")}/>
                            <CmsInputImage name="card2_icon" label="Icon de la carte" value={values.card2_icon} onChange={handleChange} placeholder={t("goal.cards.card2.icon")} />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-[20px]">
                        <div className="w-full flex justify-between">
                            <h4 className="text-[20px] font-semibold tracking-[2.24px]">
                                Carte 3
                            </h4>
                            <CmsHideToggle name="card3_title" value={values.card3_title_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        </div>
                        <div className="w-full flex flex-col gap-[16px]">
                            <CmsInput name="card3_title" label="Titre" value={values.card3_title} onChange={handleChange} placeholder={t("goal.cards.card3.title")} />
                            <CmsTextarea name="card3_description" label="Description" value={values.card3_description} onChange={handleChange} placeholder={t("goal.cards.card3.description")}/>
                            <CmsInputImage name="card3_icon" label="Icon de la carte" value={values.card3_icon} onChange={handleChange} placeholder={t("goal.cards.card3.icon")} />
                        </div>                        
                    </div>

                </div>

                <div className="w-full flex justify-center">
                    <button type="submit" className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Mettre à jour
                    </button>
                </div>

            </form>
        </section>
    )
}

export default SectionGoalForm

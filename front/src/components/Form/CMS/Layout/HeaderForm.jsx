import iconPaintDark from "../../../../assets/imgs/icones/IconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/IconPaint.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { useForm } from "../../../../hooks/useForm";
import useCmsContent from "../../../../hooks/useCmsContent";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInput from "../Fields/CmsInput";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import saveCmsSection from "../../../../utils/saveCmsSection.js";
import CmsFormHeader from "../Titles/CmsFormHeader.jsx";
import CmsTitleBlock from "../Titles/CmsTitleBlock.jsx";
import CmsFieldsBlock from "../Titles/CmsFieldsBlock.jsx";
import CmsBlock from "../Titles/CmsBlock.jsx";
import CmsSubtitleBlock from "../Titles/CmsSubtitleBlock.jsx";

function HeaderForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("header");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    const page = "layout";
    const section = "header";
    // console.log("Page:", page, "Section:", section);

    const fields = [

        "logo",

        "home",
        "home_link",

        "first",
        "first_link",

        "seconde",
        "seconde_link",

        "third",
        "third_link",

        "btn",
        "btn_link",

        "icon_country"

    ]

    const { values, setValues, handleChange } = useForm({
        logo: "",
        logo_is_active: 1,

        home: "",
        home_link: "",
        home_is_active: 1,

        first: "",
        first_link: "",
        first_is_active: 1,

        seconde: "",
        seconde_link: "",
        secode_is_active: 1,

        third: "",
        third_link: "",
        third_is_active: 1,

        btn: "",
        btn_link: "",
        btn_is_active: 1,

        icon_country: "",
        icon_country_is_active: 1
    })

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { content, loading: cmsLoading } = useCmsContent(page, locale);
    const [initialValues, setInitialValues] = useState({});
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {

        if (cmsLoading) {
            return;
        }

        if (hasHydrated) return;

        const cmsSection = content?.[page]?.[section];

        if (!cmsSection) return;

        // construit les valeurs initiales depuis le CMS
        const built = buildInitialValuesFromCms(fields, cmsSection, {
            fileFields: ["logo", "icon_country"],
        });

        setValues(built);

        setInitialValues(built);

        setHasHydrated(true);

    }, [cmsLoading, content, page, section, hasHydrated, setValues, locale])

    // reinitialise quand locale change // Remplie le formulaire avec les données de la BDD
    // fait que les données dans les champs sont chargé par raport à la langue
    useEffect(() => {
        setHasHydrated(false);
    }, [locale]);

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");

        event.preventDefault();
        setLoading(true);

        try {

            // console.log("try dans handleSubmit OK");

            await saveCmsSection({ page, section, locale, fields, values });

            setMessage("Header mis à jour");

        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {
            setLoading(false);
        }

    }

    return (
        <section className="w-full">
            <form onSubmit={handleSubmit} className="w-full p-12.5 flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit]">
                
                {/***** Titre du formulaire *****/}
                <CmsFormHeader title="Gestion de la Header" />

                <div className="w-full">

                    <div className="flex flex-col items-start justify-center gap-12.5 self-stretch font-[Outfit] w-full">
                        
                        <CmsBlock>

                            <CmsTitleBlock title="Gestion du logo"/>

                            <CmsFieldsBlock>
                                <CmsInputImage name="logo" label="Logo" valueUrl={values.logo} onChange={handleChange} page={page} section={section} locale={locale} />
                            </CmsFieldsBlock>

                        </CmsBlock>

                    </div>

                    <div className="flex flex-col pb-2.5 justify-start gap-7.5 self-stretch uppercase placeholder:uppercase w-full">

                        <CmsTitleBlock title="Gestion de la navigation"/>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du deuxiéme lien" toggleName="first" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>
                                < CmsInput name="first" label="Nom" value={values.first} onChange={handleChange} placeholder={t("first")} />
                                < CmsInput name="first_link" label="Lien" value={values.first_link} onChange={handleChange} placeholder={t("first_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du troisième lien" toggleName="seconde" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                            <CmsFieldsBlock>
                                < CmsInput name="seconde" label="Nom" value={values.seconde} onChange={handleChange} placeholder={t("seconde")} />
                                < CmsInput name="seconde_link" label="Lien" value={values.seconde_link} onChange={handleChange} placeholder={t("seconde_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du quatriéme lien" toggleName="third" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                            <CmsFieldsBlock>
                                < CmsInput name="third" label="Nom" value={values.third} onChange={handleChange} placeholder={t("third")} />
                                < CmsInput name="third_link" label="Lien" value={values.third_link} onChange={handleChange} placeholder={t("third_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                    </div>

                    <div className="flex flex-col items-start justify-center pb-2.5 gap-12.5 self-stretch font-[Outfit] w-full uppercase placeholder:uppercase ">
                        
                        <CmsTitleBlock title="Gestion des boutons"/>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du premier bouton" toggleName="btn" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />

                            <CmsFieldsBlock>
                                <CmsInput name="btn" label="Nom" value={values.btn} onChange={handleChange} placeholder={t("btn")} />
                                <CmsInput name="btn_link" label="Lien" value={values.btn_link} onChange={handleChange} placeholder={t("btn_link")} />
                            </CmsFieldsBlock>
                            
                        </CmsBlock>

                        <CmsBlock>

                            <CmsSubtitleBlock title="Gestion du bouton switch des langues" toggleName="icon_country" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />
                            
                        </CmsBlock>

                    </div>

                </div>

                <div className="w-full flex justify-center">
                    <BtnSubmitForm loading={loading} className="flex h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333] w-full">
                        Mettre à jour
                    </BtnSubmitForm>
                </div>

            </form>
        </section>
    )
}

export default HeaderForm

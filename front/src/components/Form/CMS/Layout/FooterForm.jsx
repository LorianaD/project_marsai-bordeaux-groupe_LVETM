import { useEffect, useState } from "react";
import CmsInput from "../Fields/CmsInput";
import CmsTextarea from"../Fields/CmsTextarea";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsHideToggle from "../Fields/CmsHideToggle";
import useCmsContent from "../../../../hooks/useCmsContent";
import { useTranslation } from "react-i18next";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";
import { useForm } from "../../../../hooks/useForm";
import iconPaintDark from "../../../../assets/imgs/icones/IconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/IconPaint.svg";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";

function FooterForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("header");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    const page = "layout";
    const section = "header";
    // console.log("Page:", page, "Section:", section);

    const fields = [

        "logo",

        "quote"

    ]

    const { values, setValues, handleChange } = useForm({
        logo: "",
        logo_is_active: 1,

        quote: "",
        quote_is_active: 1,
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
            fileFields: ["logo", "icon_country"],
        });

        setValues(built);

        setInitialValues(built);

        setHasHydrated(true);

    }, [cmsLoading, content, section, hasHydrated, setValues, locale])

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

            const sharedImageKeys = new Set(["logo", "icon_country"]);

            const sharedLinkKeys = new Set(["home_link", "first_link", "seconde_link", "third_link", "btn_link"]);

            const sharedKeys = new Set([...sharedImageKeys, ...sharedLinkKeys]);

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

            setMessage("Header mis à jour");

        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {
            setLoading(false);
        }

    }

    return(
        <>
            <section className="w-full">
                <form onSubmit={handleSubmit} className="w-full p-[50px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                    {/***** Titre du formulaire *****/}
                    <div className="flex items-center gap-[10px] self-stretch w-full">
                        <div>
                            <img src={iconPaintDark} alt="" className="hidden dark:block" />
                            <img src={iconPaint} alt="" className="block dark:hidden" />
                        </div>
                        <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase w-full">
                            Gestion du pieds du site
                        </h3>
                    </div>

                    <div className="w-full">

                        <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit] w-full">
                            
                            <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full w-full">

                                <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase w-full">
                                    <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion du côté gauche
                                    </h4>
                                </div>
                                <div>
                                    <CmsInputImage name="logo" label="Logo" valueUrl={values.logo} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>

                            </div>

                            <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full w-full">
                                <div>
                                    <CmsTextarea name="quote" label="Citation" value={values.quote} onChange={handleChange} />
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">

                            <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase w-full">
                                <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase w-full">
                                    Gestion de la navigation
                                </h4>
                            </div>

                            <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                                <div className="flex flex-col md:flex-row pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion du deuxiéme lien
                                    </h5>
                                    <CmsHideToggle name="first" value={values.first_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div className="flex flex-col md:flex-row gap-[20px] w-full">
                                    < CmsInput name="first" label="Nom" value={values.first} onChange={handleChange} placeholder={t("first")} />
                                    < CmsInput name="first_link" label="Lien" value={values.first_link} onChange={handleChange} placeholder={t("first_link")} />
                                </div>
                                
                            </div>

                            <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                                <div className="w-full flex flex-col md:flex-row">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion du troisième lien
                                    </h5>
                                    <CmsHideToggle name="seconde" value={values.seconde_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div className="flex flex-col md:flex-row gap-[20px] w-full">
                                    < CmsInput name="seconde" label="Nom" value={values.seconde} onChange={handleChange} placeholder={t("seconde")} />
                                    < CmsInput name="seconde_link" label="Lien" value={values.seconde_link} onChange={handleChange} placeholder={t("seconde_link")} />
                                </div>
                                
                            </div>

                            <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                                <div className="w-full flex flex-col md:flex-row">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion du quatriéme lien
                                    </h5>
                                    <CmsHideToggle name="third" value={values.third_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div className="flex flex-col md:flex-row gap-[20px] w-full">
                                    < CmsInput name="third" label="Nom" value={values.third} onChange={handleChange} placeholder={t("third")} />
                                    < CmsInput name="third_link" label="Lien" value={values.third_link} onChange={handleChange} placeholder={t("third_link")} />
                                </div>
                                
                            </div>

                        </div>

                        <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit] w-full">
                            
                            <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">

                                <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase w-full">
                                    <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion des boutons
                                    </h4>
                                </div>
                                <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                                    <div className="w-full flex flex-col md:flex-row">
                                        <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                            Gestion du premier bouton
                                        </h5>
                                        <CmsHideToggle name="btn" value={values.btn_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-[20px] w-full">
                                        < CmsInput name="btn" label="Nom" value={values.btn} onChange={handleChange} placeholder={t("btn")} />
                                        < CmsInput name="btn_link" label="Lien" value={values.btn_link} onChange={handleChange} placeholder={t("btn_link")} />
                                    </div>
                                    
                                </div>

                                <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                                    <div className="w-full flex flex-col md:flex-row">
                                        <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                            Gestion du bouton switch des langues
                                        </h5>
                                        <CmsHideToggle name="icon_country" value={values.icon_country_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>

                                    {/* <div className="flex flex-col md:flex-row gap-[20px] w-full">
                                        <CmsInputImage name="icon_country" label="Icon" valueUrl={values.icon_country} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div> */}
                                    
                                </div>                            

                            </div>

                        </div>

                    </div>

                    <div className="w-full flex justify-center">
                        <BtnSubmitForm loading={loading} className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333] w-full">
                            Mettre à jour
                        </BtnSubmitForm>
                    </div>

                </form>
            </section>
        </>
    )
}

export default FooterForm
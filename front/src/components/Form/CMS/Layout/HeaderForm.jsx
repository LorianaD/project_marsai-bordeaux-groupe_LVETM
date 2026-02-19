import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { useForm } from "../../../../hooks/useForm";
import useCmsContent from "../../../../hooks/useCmsContent";
import CmsInputImage from "../Fields/CmsInputImage";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInput from "../Fields/CmsInput";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";
import buildInitialValuesFromCms from "../../../../utils/buildInitialValuesFromCms";

function HeaderForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("header");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    const page = "layout";
    const section = "header";
    // console.log("Page:", page, "Section:", section);

    const fields = [

        "logo",

        "home",

    ]

    const { values, setValues, handleChange } = useForm({
        logo: "",
        logo_is_active: 1,
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
            fileFields: ["logo"],
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

            const sharedImageKeys = new Set(["media", "protocol_icon", "ctaParticipate_signe", "ctaLearnMore_signe"]);

            const sharedLinkKeys = new Set(["ctaParticipate_link", "ctaLearnMore_link"]);

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

    return (
        <section>
            <form onSubmit={handleSubmit} className="p-[50px] md:px-[100px] md:py-[100px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                {/***** Titre du formulaire *****/}
                <div className="flex items-center gap-[10px] self-stretch">
                    <div>
                        <img src={iconPaintDark} alt="" className="hidden dark:block" />
                        <img src={iconPaint} alt="" className="block dark:hidden" />
                    </div>
                    <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                        Gestion de l' En-tête
                    </h3>
                </div>

                <div>

                    <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                        <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">

                            <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                    Gestion du logo
                                </h4>
                            </div>
                            <div>
                                <CmsInputImage name="logo" label="Logo" valueUrl={values.logo} onChange={handleChange} page={page} section={section} locale={locale} />
                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full">

                        <div className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase">
                                Gestion de la navigation
                            </h4>
                        </div>
                        <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                            <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                                Gestion du lien Home
                            </h5>
                            <div>
                                < CmsInput name="home_link" label="Lien" value={values.home} onChange={handleChange} placeholder={t("home_link")} />
                            </div>

                        </div>

                        <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                            <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">
                                <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                                    Gestion du deuxiéme lien
                                </h5>
                            </div>
                            <div className="flex flex-col md:flex-row gap-[20px]">
                                < CmsInput name="first" label="Nom" value={values.first} onChange={handleChange} placeholder={t("first")} />
                                < CmsInput name="first_link" label="Lien" value={values.first} onChange={handleChange} placeholder={t("first_link")} />
                            </div>
                            
                        </div>

                        <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                            <div>
                                <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                                    Gestion du troisième lien
                                </h5>
                            </div>
                            <div className="flex flex-col md:flex-row gap-[20px]">
                                < CmsInput name="seconde" label="Nom" value={values.seconde} onChange={handleChange} placeholder={t("seconde")} />
                                < CmsInput name="seconde_link" label="Lien" value={values.seconde} onChange={handleChange} placeholder={t("seconde_link")} />
                            </div>
                            
                        </div>

                        <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                            <div>
                                <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                                    Gestion du quatriéme lien
                                </h5>
                            </div>
                            <div className="flex flex-col md:flex-row gap-[20px]">
                                < CmsInput name="third" label="Nom" value={values.third} onChange={handleChange} placeholder={t("third")} />
                                < CmsInput name="third_link" label="Lien" value={values.third} onChange={handleChange} placeholder={t("third_link")} />
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

export default HeaderForm
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

    const { t, i18n } = useTranslation("footer");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    const page = "layout";
    const section = "footer";
    // console.log("Page:", page, "Section:", section);

    const fields = [

        // brand
        "brand_logo",
        "brand_quote",

        // sections
        "sections_navigation",
        "sections_legal",

        // links (label + href)
        "links_gallery_label",
        "links_gallery_href",

        "links_program_label",
        "links_program_href",

        "links_tickets_label",
        "links_tickets_href",

        "links_partners_label",
        "links_partners_href",

        "links_faq_label",
        "links_faq_href",

        "links_contact_label",
        "links_contact_href",

        "links_legal_label",
        "links_legal_href",

        // bottom
        "bottom_copyright",
        "bottom_designSystem",

        // social
        "social_facebook_label",
        "social_facebook_href",
        "social_facebook_icon",

        "social_instagram_label",
        "social_instagram_href",
        "social_instagram_icon",

        "social_youtube_label",
        "social_youtube_href",
        "social_youtube_icon",

        "social_x_label",
        "social_x_href",
        "social_x_icon",

        // aria
        "aria_openSocial",

    ]

    const { values, setValues, handleChange } = useForm({
        // Brand
        brand_logo: "",
        brand_logo_is_active: 1,

        brand_quote: "",
        brand_quote_is_active: 1,

        // Sections
        sections_navigation: "",
        sections_navigation_is_active: 1,

        sections_legal: "",
        sections_legal_is_active: 1,

        // Links
        links_gallery_label: "",
        links_gallery_label_is_active: 1,
        links_gallery_href: "",

        links_program_label: "",
        links_program_label_is_active: 1,
        links_program_href: "",

        links_tickets_label: "",
        links_tickets_label_is_active: 1,
        links_tickets_href: "",

        links_partners_label: "",
        links_partners_label_is_active: 1,
        links_partners_href: "",

        links_faq_label: "",
        links_faq_label_is_active: 1,
        links_faq_href: "",

        links_contact_label: "",
        links_contact_label_is_active: 1,
        links_contact_href: "",

        links_legal_label: "",
        links_legal_label_is_active: 1,
        links_legal_href: "",

        // Bottom
        bottom_copyright: "",
        bottom_copyright_is_active: 1,

        bottom_designSystem: "",
        bottom_designSystem_is_active: 1,

        // Social
        social_facebook_label: "",
        social_facebook_label_is_active: 1,
        social_facebook_href: "",
        social_facebook_icon: "",

        social_instagram_label: "",
        social_instagram_label_is_active: 1,
        social_instagram_href: "",
        social_instagram_icon: "",

        social_youtube_label: "",
        social_youtube_label_is_active: 1,
        social_youtube_href: "",
        social_youtube_icon: "",

        social_x_label: "",
        social_x_label_is_active: 1,
        social_x_href: "",
        social_x_icon: "",

        // Aria
        aria_openSocial: "",
        aria_openSocial_is_active: 1,
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

            const sharedImageKeys = new Set(["logo"]);

            const sharedLinkKeys = new Set([""]);

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
                                    <CmsTextarea name="quote" label="Citation" value={values.quote} onChange={handleChange} rightSlot={
                                        <CmsHideToggle name="quote" value={values.quote_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale}/>}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col pb-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full w-full">
                                <div className="flex items-center">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">Gestion des liens sociaux</h5>
                                    <CmsHideToggle name="social" value={values.social_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale}/>
                                </div>
                                <div >
                                    <div>
                                        <h6 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                            Facebook
                                        </h6>
                                    </div>
                                    <div className="flex gap-[20px]">
                                        <CmsInputImage name="social_facebook_icon" label="Icon" valueUrl={values.social_facebook_icon} onChange={handleChange} page={page} section={section} locale={locale} />
                                        <CmsInput name="social_facebook_label" label="Nom" value={values.social_facebook_label} onChange={handleChange} placeholder={t("social.facebook")}/>
                                        <CmsInput name="social_facebook_href" label="Nom" value={values.social_facebook_href} onChange={handleChange} placeholder={"https://facebook.com"}/>
                                    </div>
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
                                        Gestion de la section Navigation
                                    </h5>
                                    <CmsHideToggle name="sections_navigation" value={values.sections_navigation_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div>
                                    < CmsInput name="sections_navigation" label="Titre de section" value={values.sections_navigation} onChange={handleChange} placeholder={t("sections.navigation")}/>
                                </div>                                
                                <div className="flex flex-col gap-[20px] w-full">
                                    <div className="flex item-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du premier lien</h5>
                                        < CmsHideToggle name="links_gallery_label" value={values.links_gallery_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        < CmsInput name="links_gallery_label" label="Nom" value={values.links_gallery_label} onChange={handleChange} placeholder={t("links.gallery")} />
                                        < CmsInput name="links_gallery_href" label="Lien" value={values.links_gallery_href} onChange={handleChange} placeholder={"/gallery"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[20px] w-full">
                                    <div className="flex item-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du deuxième lien</h5>
                                        < CmsHideToggle name="links_program_label" value={values.links_program_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        < CmsInput name="links_program_label" label="Nom" value={values.links_program_label} onChange={handleChange} placeholder={t("links.program")} />
                                        < CmsInput name="links_program_href" label="Lien" value={values.links_program_href} onChange={handleChange} placeholder={"/program"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[20px] w-full">
                                    <div className="flex item-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du troisième lien</h5>
                                        < CmsHideToggle name="links_tickets_label" value={values.links_tickets_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        < CmsInput name="links_tickets_label" label="Nom" value={values.links_tickets_label} onChange={handleChange} placeholder={t("links.tickets")} />
                                        < CmsInput name="links_tickets_href" label="Lien" value={values.links_tickets_href} onChange={handleChange} placeholder={"/tickets"} />
                                    </div>
                                </div>                          
                                
                            </div>

                            <div className="flex flex-col pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">

                                <div className="flex flex-col md:flex-row pb-[10px] justify-start gap-[20px] self-stretch uppercase placeholder:uppercase w-full">
                                    <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase w-full">
                                        Gestion de la section Legal
                                    </h5>
                                    <CmsHideToggle name="sections_legal" value={values.sections_legal_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                </div>
                                <div>
                                    < CmsInput name="sections_legal" label="Titre de section" value={values.sections_legal} onChange={handleChange} placeholder={t("sections.legal")}/>
                                </div>                                
                                <div className="flex flex-col gap-[20px] w-full">
                                    <div className="flex item-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du premier lien</h5>
                                        < CmsHideToggle name="links_partners_label" value={values.links_partners_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        < CmsInput name="links_partners_label" label="Nom" value={values.links_partners_label} onChange={handleChange} placeholder={t("links.partners")} />
                                        < CmsInput name="links_partners_href" label="Lien" value={values.links_partners_href} onChange={handleChange} placeholder={"/partners"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[20px] w-full">
                                    <div className="flex item-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du deuxième lien</h5>
                                        < CmsHideToggle name="links_faq_label" value={values.links_faq_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        < CmsInput name="links_faq_label" label="Nom" value={values.links_faq_label} onChange={handleChange} placeholder={t("links.faq")} />
                                        < CmsInput name="links_faq_href" label="Lien" value={values.links_faq_href} onChange={handleChange} placeholder={"/faq"} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[20px] w-full">
                                    <div className="flex item-center">
                                        <h5 className="text-[12px] md:text-[14px] font-bold tracking-[3.2px] uppercase w-full">Gestion du troisième lien</h5>
                                        < CmsHideToggle name="links_contact_label" value={values.links_contact_label_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                        < CmsInput name="links_contact_label" label="Nom" value={values.links_contact_label} onChange={handleChange} placeholder={t("links.contact")} />
                                        < CmsInput name="links_contact_href" label="Lien" value={values.links_contact_href} onChange={handleChange} placeholder={"/contact"} />
                                    </div>
                                </div>                          
                                
                            </div>

                        </div>

                        <div className="flex items-center">
                            <h4 className="text-[16px] md:text-[20px] font-bold tracking-[3.2px] uppercase w-full">
                                Gestion de la newsletter
                            </h4>
                            < CmsHideToggle name="newsletters" value={values.newsletter_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
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
import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useState } from "react";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi";
import CmsInput from "../Fields/CmsInput";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInputColor from "../Fields/CmsImputColor";

function SectionEventsForm({ forcedLocale }) {

    const { t, i18n } = useTranslation("home");
    const locale = forcedLocale ?? (i18n.language.startsWith("fr") ? "fr" : "en");

    // Page et section
    const page = "home";
    const section = "events";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [
        "title_main",
        "title_main_color",
        "title_accent",
        "title_accent_color",
        "list_item1",
        "list_item2",
        "list_item3",
        "ctaAgenda",
        "ctaAgenda_link",
        "ctaAgenda_icon",
        "card1_icon",
        "card1_title",
        "card1_title_color",
        "card1_description",
        "card1_link",
        "card2_icon",
        "card2_title",
        "card2_title_color",
        "card2_description",
        "card2_link",
        "card3_icon",
        "card3_title",
        "card3_title_color",
        "card3_description",
        "card3_link"
    ];
    // console.log(fields);

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, handleChange } = useForm({
        title_main:"",
        title_main_color:"",
        title_main_is_active: 1,

        title_accent:"",
        title_accent_color:"",
        title_accent_is_active: 1,


    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();
        setLoading(true);

        try {

            // console.log("try dans handleSubmit OK");

            for (let i = 0; i < fields.length; i++) {
                const key = fields[i];
                const val = values[key];
                const is_active = values[`${key}_is_active`];

                // IMAGE
                if (val instanceof File) {
                    await updateImageApi({
                        page,
                        section,
                        locale,
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
                    locale,
                    content_key: key,
                    value: val,
                    order_index: i,
                    is_active,    
                })
                

            }

            setMessage("Section Hero mise à jour");

        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {
            setLoading(false);
        }

    }    

    return(
        <section>
            <form onSubmit={ handleSubmit } className="p-[50px] md:px-[100px] md:py-[100px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">
                <div className="flex items-center gap-[10px] self-stretch">
                    <div>
                        <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                        <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    </div>
                    <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                        Gestion de la Section Programme
                    </h3>
                </div>
                <div className="flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit] w-full">
                    
                    {/* GESTION DU TITRE */}
                    <div className="flex flex-col md:flex-row md:justify-between w-full">
                        <div className="flex items-center gap-[10px] w-full">
                            < CmsInput name="title_main" label="Titre principal" value={values.title_main} onChange={handleChange} placeholder={t("events.title_main")} rightSlot={
                                <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                            <CmsInputColor name="title_main_color" label="" value={values.title_main_color} onChange={handleChange} />
                        </div>
                        <div className="flex items-center gap-[10px] w-full">
                            < CmsInput name="title_accent" label="Titre accent coloré" value={values.title_accent} onChange={handleChange} placeholder={t("events.title_accent")} rightSlot={
                                <CmsHideToggle name="title_accent" value={values.title_accent_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />
                            <CmsInputColor name="title_accent_color" label="" value={values.title_accent_color} onChange={handleChange} />
                        </div>
                    </div>

                    {/* GESTION DE LA LISTE */}
                    <div>
                        <div className="">
                            <h4>
                                Gestion de la liste
                            </h4>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between w-full gap-[20px]">
                            < CmsInput name="list_item1" label="Petit 1" value={values.list_item1} onChange={handleChange} placeholder={t("events.list.item1")} rightSlot={
                                <CmsHideToggle name="list_item1" value={values.list_item1_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="list_item2" label="Petit 2" value={values.list_item2} onChange={handleChange} placeholder={t("events.list.item2")} rightSlot={
                                <CmsHideToggle name="list_item2" value={values.list_item2_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />

                            < CmsInput name="list_item3" label="Petit 3" value={values.list_item3} onChange={handleChange} placeholder={t("events.list.item3")} rightSlot={
                                <CmsHideToggle name="list_item3" value={values.list_item3_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                            />                            
                        </div>
                    </div>

                </div>
            </form>
        </section>
    )
}

export default SectionEventsForm
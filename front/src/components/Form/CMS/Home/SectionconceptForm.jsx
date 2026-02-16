import CmsInput from "../Fields/CmsInput"
import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useState } from "react";
import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi";
import CmsTextarea from "../Fields/CmsTextarea";
import CmsHideToggle from "../Fields/CmsHideToggle";
import CmsInputColor from "../Fields/CmsImputColor";
import BtnSubmitForm from "../../../Buttons/BtnSubmitForm";

function SectionConceptForm() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language.startsWith("fr") ? "fr" : "en";

    // Page et section
    const page = "home";
    const section = "concept";
    // console.log("Page:", page, "Section:", section);

    // champs des differents éléments dans la section
    const fields = [

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

    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    const { values, handleChange } = useForm({

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

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();
        setLoading(true);

        try {

            // console.log("try dans handleSubmit OK");

            for (let i = 0; i < fields.length; i++) {
                const key = fields[i];
                const val = values[key];

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
                
                console.log("SEND:", key, val);

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
            <form onSubmit={ handleSubmit } className="p-[50px] md:px-[100px] md:py-[100px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                {/***** Titre du formulaire *****/}
                <div className="flex items-center gap-[10px] self-stretch">
                    <div>
                        <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                        <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    </div>
                    <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                        Gestion de la Section Concept
                    </h3>
                </div>

                <div className="w-full">
                    <CmsInput name="title_main" label="Titre principal" value={values.title_main} onChange={handleChange} placeholder={t("concept.title_main")} rightSlot={
                        <CmsHideToggle name="title_main" value={values.title_main_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                    />
                </div>

                <div className="w-full flex flex-col md:flex-row md:justify-around gap-[30px]">
                    <div className="w-full flex flex-col gap-[20px]">
                        <div className="w-full flex justify-between">
                            <h4 className="text-[20px] font-semibold tracking-[2.24px]">
                                Carte 1
                            </h4>
                            <CmsHideToggle name="card1_title" value={values.card1_title_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        </div>
                        <div className="w-full flex flex-col gap-[16px]">
                            <div className="w-full flex items-center justify-between gap-[16px]">
                                <CmsInput name="card1_title" label="Titre" value={values.card1_title} onChange={handleChange} placeholder={t("concept.card1.title")} />
                                <CmsInputColor name="card1_title_color" label="" value={values.card1_title_color} onChange={handleChange} />
                            </div>
                            <CmsTextarea name="card1_description" label="Description" value={values.card1_description} onChange={handleChange} placeholder={t("concept.card1.description")}/>
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
                            <div className="w-full flex items-center justify-between gap-[16px]">
                                <CmsInput name="card2_title" label="Titre" value={values.card2_title} onChange={handleChange} placeholder={t("concept.card2.title")} />
                                <CmsInputColor name="card2_title_color" label="" value={values.card1_title_color} onChange={handleChange} />
                            </div>
                            <CmsTextarea name="card2_description" label="Description" value={values.card2_description} onChange={handleChange} placeholder={t("concept.card2.description")}/>
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
                            <div className="w-full flex items-center justify-between gap-[16px]">
                                <CmsInput name="card3_title" label="Titre" value={values.card3_title} onChange={handleChange} placeholder={t("concept.card3.title")} />
                                <CmsInputColor name="card3_title_color" label="" value={values.card1_title_color} onChange={handleChange} />
                            </div>
                            <CmsTextarea name="card3_description" label="Description" value={values.card3_description} onChange={handleChange} placeholder={t("concept.card3.description")}/>
                        </div>                        
                    </div>

                    <div className="w-full flex flex-col gap-[20px]">
                        <div className="w-full flex justify-between">
                            <h4 className="text-[20px] font-semibold tracking-[2.24px]">
                                Carte 4
                            </h4>
                            <CmsHideToggle name="card4_title" value={values.card4_title_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                        </div>
                        <div className="w-full flex flex-col gap-[16px]">
                            <div className="w-full flex items-center gap-[16px]">
                                <CmsInput name="card4_title" label="Titre" value={values.card4_title} onChange={handleChange} placeholder={t("concept.card4.title")} />
                                <CmsInputColor name="card3_title_color" label="" value={values.card1_title_color} onChange={handleChange} />
                            </div>
                            <CmsTextarea name="card4_description" label="Description" value={values.card4_description} onChange={handleChange} placeholder={t("concept.card4.description")}/>
                        </div>                        
                    </div>                    

                </div>

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
import CmsHideToggle from "./Fields/CmsHideToggle";
import CmsInput from "./Fields/CmsInput";
import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useState } from "react";
import CmsTextarea from "./Fields/CmsTextarea";
import { updateContentApi } from "../../../../services/CMS/UpdateContentApi";

function SectionAwardForm() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language.startsWith("fr") ? "fr" : "en";

    // Page et section
    const page = "home";
    const section = "award";
    console.log("Page:", page);
    console.log("Section:", section);

    // champs récupérés
    const fields = [
        "eyebrow",
        "title1",
        "title2",
        "description",
        "ctaSeeMore",
        "ctaSeeMore_link"
    ]
    console.log("Champs:", fields);
    
    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

    // données envoyé à useForm
    const { values, handleChange } = useForm({
        eyebrow:"",
        eyebrow_is_active: 1,

        title1:"",
        title1_is_active: 1,

        title2:"",
        title2_is_active: 1,

        description:"",
        description_is_active: 1,

        ctaSeeMore:"",
        ctaSeeMore_is_active: 1,

        ctaSeeMore_link:""
    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();

        setLoading(true)

        try {
            // console.log("try dans handleSubmit OK");

            // boucle pour traiter chaque champs un par un
            for (let i = 0; i < fields.length; i++) {
                
                // nom du champ
                const key = fields[i];
                // console.log(key);
                
                // valeur actuelle du formulaire
                const val = values[key];
                // console.log(val);

                let is_active = values[`${key}_is_active`];
                
                // gestion des texte
                const empty = val === undefined || val === null || String(val).trim() === "";

                // texte vide
                if (empty) continue;

                // texte non vide
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

            setMessage("Section mise à jour");

        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {

            setLoading(false);

        }

    }

    return(
        <section>
            <form onSubmit={ handleSubmit } className="w-full p-[50px] md:px-[100px] md:py-[100px] flex flex-col items-start justify-center gap-[50px] self-stretch font-[Outfit]">

                {/***** Titre du formulaire *****/}
                <div className="flex items-center gap-[10px] self-stretch w-full">
                    <div>
                        <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                        <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    </div>
                    <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                        Gestion de la Section Palmares
                    </h3>
                </div>

                {/**** Corp du formulaire : inputs ****/}
                <div className="w-full">
                    <CmsInput name="eyebrow" label="Titre du projet" value={values.eyebrow} onChange={handleChange} placeholder={t("award.eyebrow")} rightSlot={
                        <CmsHideToggle name="eyebrow" value={values.eyebrow_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                    />
                </div>

                <div className="w-full flex flex-col md:flex-row gap-[20px]">
                    <CmsInput name="title1" label="Titre principal (ligne 1)" value={values.title1} onChange={handleChange} placeholder={t("award.title1")} rightSlot={
                        <CmsHideToggle name="title1" value={values.title1_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                    }/>
                    <CmsInput name="title2" label="Titre principal (ligne 2 dégradée)" value={values.title2} onChange={handleChange} placeholder={t("award.title2")} rightSlot={
                        <CmsHideToggle name="title2" value={values.title2_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                    }/>
                </div>

                <div className="w-full">
                    <CmsTextarea name="description" label="Description" value={values.description} onChange={handleChange} placeholder={t("award.description")} rightSlot={
                        <CmsHideToggle name="description" value={values.description_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                    }/>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-[20px]">
                    <CmsInput name="ctaSeeMore" label="Bouton" value={values.ctaSeeMore} onChange={handleChange} placeholder={t("award.ctaSeeMore")} rightSlot={
                        <CmsHideToggle name="ctaSeeMore" value={values.ctaSeeMore_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />
                    }/>

                    <CmsInput name="ctaSeeMore_link" label="Lien du bouton" value={values.ctaSeeMore_link} onChange={handleChange} placeholder={t("award.ctaSeeMore_link")} />
                </div>                

                {/**** Footer du formulaire : bouton de submission ****/}
                <div className="w-full flex justify-center">
                    <button type="submit" className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Mettre à jour
                    </button>
                </div>

            </form>
        </section>
    )
}

export default SectionAwardForm
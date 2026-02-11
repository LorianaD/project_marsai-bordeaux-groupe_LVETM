import CmsHideToggle from "./Fields/CmsHideToggle";
import CmsInput from "./Fields/CmsInput";
import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../../hooks/useForm";
import { useState } from "react";
// import { updateContentApi, updateImageApi } from "../../../../services/CMS/UpdateContentApi";

function SectionAwardForm() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language.startsWith("fr") ? "fr" : "en";

    // Page et section
    const page = "home";
    const section = "award";
    console.log("Page:", page);
    console.log("Section:", section);

    const fields = [
        "eyebrow",
        "title1",
        "title2",
        "description",
        "ctaSeeMore"
    ]
    console.log("Champs:", fields);
    
    const orderIndexByKey = Object.fromEntries(fields.map((k, i) => [k, i]));

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
        ctaSeeMore_is_active: 1
    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    return(
        <section>
            <form>
                {/***** Titre du formulaire *****/}
                <div className="flex items-center gap-[10px] self-stretch">
                    <div>
                        <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                        <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    </div>
                    <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                        Gestion de la Section Palmares
                    </h3>
                </div>
                <div>
                    <CmsInput name="eyebrow" label="Titre du projet" value={values.eyebrow} onChange={handleChange} placeholder={t("award.eyebrow")} rightSlot={
                        <CmsHideToggle name="eyebrow" value={values.eyebrow_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} />}
                    />
                </div>
            </form>
        </section>
    )
}

export default SectionAwardForm
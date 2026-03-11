import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import iconImg from "../../../../assets/imgs/icones/iconImg.svg";
import iconClose from "../../../../assets/imgs/icones/x.svg"
import { useForm } from "../../../../hooks/useForm.js";
import { useEffect, useState } from "react";
import updatePartnerApi from "../../../../services/Partner/UpdatePartnerApi.js";

function PartnerUpdate({ partner, onClose, onUpdated }) {

    const { values, handleChange, setValues } = useForm({
        name: "",
        file: "",
        url: ""
    })

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (partner) {
            setValues({
                name: partner.name ?? "",
                url: partner.url ?? "",
                file: null,
            })
        }

    }, [partner, setValues]);

    //---- Je récupére les données depuis le formulaire et je l'envoi à la BDD (avec l'API qui envoi au BACK, ect.) ----//

    async function handleUpdate(event) {
        // console.log("Fonction handleUpdate OK", values);

        event.preventDefault();

        try {
            // console.log("try dans la fonction handleUpdate OK");
            
            setLoading(true);
            setMessage("");

            const payload = {
                name: values.name,
                url: values.url,
                file: values.file,
            };

            const res = await updatePartnerApi(partner.id, payload);
            // console.log(res);

            setMessage("Mis à jour !")
            
            if (onUpdated) {
                onUpdated();
            }
            
        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {

            setLoading(false);

        }

    }

    if (!partner) {
        return <p>Partenaire introuvable</p>;
    }

    return(
        <div className="">
            <button type="button" onClick={onClose} className="flex justify-end w-full p-5">
                <img src={iconClose} alt="" />
            </button>

            <form onSubmit={ handleUpdate } className="p-8 flex flex-col items-start gap-5 self-stretch font-[Outfit]">

                <div className="flex p-2 items-start gap-2 self-stretch">
                    <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                    <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    <h2 className="text-[20px] font-bold tracking-[3.2px] uppercase">
                        Section "Partenaires"
                    </h2>
                </div>

                <div className="flex flex-col pb-3 justify-start gap-4 self-stretch uppercase placeholder:uppercase">
                    <label htmlFor="name" className="text-[14px] font-semibold tracking-[2.24px]">
                        Titre principal
                    </label>
                    <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="" className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-3 px-5 items-center self-stretch gap-3 rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                </div>

                <div className="flex items-center justify-center gap-3 p-3 self-stretch">
                    <div className="uppercase flex w-[288px] h-46 flex-col items-center justify-center gap-3 px-11 py-9 rounded-xl border-2 border-dashed border-[rgba(0,0,0,0.10)] dark:border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[1.5px]">
                        <div className="flex w-12 h-12 items-center justify-center p-3 shrink-0 rounded-full bg-[rgba(13,185,242,0.10)]">
                            <img src={iconImg}/>
                        </div>
                        <p className="flex h-6 flex-col justify-center shrink-0 self-stretch dark:text-white font-space-grotesk text-[16px] font-bold leading-6">
                            Ajouter un logo (png)
                        </p>
                        <span></span>
                        <input id="logoUpload" type="file" accept="image/png" className="hidden" name="file" onChange={handleChange}/>
                        <label htmlFor="logoUpload" className="flex h-10 items-center justify-center shrink-0 px-4 py-3 rounded-lg border border-[#DBE3E6] bg-white text-[#000000] cursor-pointer">
                            Ajouter un logo
                        </label>
                    </div>
                </div>
                <div className="flex flex-col pb-3 justify-start gap-4 self-stretch uppercase placeholder:uppercase">
                    <label htmlFor="url" className="text-[14px] font-semibold tracking-[2.24px]">
                        Ajouter le lien du partenaire
                    </label>
                    <input type="text" id="url" name="url" value={values.url} onChange={handleChange} placeholder="https://example.com" className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-3 px-5 items-center self-stretch gap-3 rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]" />
                </div>
                <div className="w-full flex justify-center">
                    <button type="submit" disabled={loading} className="flex w-50 h-13 items-center justify-center gap-3 px-5 py-3 rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        {loading ? "Enregistrement..." : "Mettre à jour"}
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default PartnerUpdate
import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import iconImg from "../../../../assets/imgs/icones/iconImg.svg";
import iconClose from "../../../../assets/imgs/icones/x.svg"
import { useForm } from "../../../../hooks/useForm.js";
import { useState } from "react";
import InsertPartnerApi from "../../../../services/Partner/InsertPartnerApi.js";

function PartnerAdd({ onClose, onAdded }) {

    const { values, handleChange } = useForm({
        name:"",
        file:"",
        url:""
    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        // console.log("Fonction handleSubmit OK");
        
        event.preventDefault();
        setLoading(true);

        try {
            // console.log("try dans la fonction handleSubmit OK");
            
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("img", values.file);
            formData.append("url", values.url);

            const res = await InsertPartnerApi(formData)
            // console.log(result);
            
            setMessage("Partener ajouté")

            if (onAdded) {
                onAdded();
            }
            
        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de l'envoi");

        } finally {
            setLoading(false);
        }

    }

    return(
        <div className="">
            <button type="button" onClick={() => onClose?.()} className="flex justify-end w-full p-5">
                <img src={iconClose} alt="Fermer la fenêtre" />
            </button>

            <form onSubmit={ handleSubmit } className="p-8 flex flex-col items-start gap-5 self-stretch font-[Outfit]">

                <div className="flex p-3 items-start gap-3 self-stretch">
                    <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                    <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    <h3 className="text-5 font-bold tracking-[3.2px] uppercase">
                        Section "Partenaires"
                    </h3>
                </div>

                <div className="flex flex-col pb-3 justify-start gap-4 self-stretch uppercase placeholder:uppercase">
                    <label htmlFor="name" className="text-[14px] font-semibold tracking-[2.24px]">
                        Titre principal
                    </label>
                    <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="le projet marsai" className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-3 px-5 items-center self-stretch gap-3 rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                </div>

                <div className="flex items-center justify-center gap-3 p-3 self-stretch">
                    <div className="uppercase flex w-[288px] h-46 flex-col items-center justify-center gap-3 px-11 py-9 rounded-xl border-2 border-dashed border-[rgba(0,0,0,0.10)] dark:border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[1.5px]">
                        <div className="flex w-12 h-12 items-center justify-center p-3 shrink-0 rounded-full bg-[rgba(13,185,242,0.10)]">
                            <img src={iconImg}/>
                        </div>
                        <p className="flex h-6 flex-col justify-center shrink-0 self-stretch dark:text-white font-space-grotesk text-4 font-bold leading-6">
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
                    <button type="submit" className="flex w-50 h-13 items-center justify-center gap-3 px-5 py-3 rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        Ajouter
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default PartnerAdd
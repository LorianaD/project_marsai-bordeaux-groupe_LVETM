import iconPaintDark from "../../../../assets/imgs/icones/iconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/iconPaint.svg";
import iconImg from "../../../../assets/imgs/icones/iconImg.svg";
import iconClose from "../../../../assets/imgs/icones/x.svg"
import { useForm } from "../../../../hooks/useForm.js";
import { useEffect, useState } from "react";
import updatePartnerApi from "../../../../services/Partner/UpdatePartnerApi.js";
import { useParams } from "react-router";

function UpdatePartner({ partner }) {

    const { id } = useParams();

    const { values, handleChange, setValues } = useForm({
        name: "",
        file: "",
        url: ""
    })

    const [partner, setPartner] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingPartner, setLoadingPartner] = useState(true);

    async function loadPartner() {
        console.log("function loadPartner in the UpdatePartner OK");

        try {

            setLoadingPartner(true);

            const res = await getOnePartnerApi(id);
            console.log(res);
            
            const p = res?.data;
            console.log(p);
            
            setPartner(p);

            // Pré-remplir le formulaire
            setValues({
                name: p?.name ?? "",
                url: p?.url ?? "",
                file: null,
            });

        } catch (error) {

            console.error("Impossible de charger le partenaire");
            setMessage("Impossible de charger le partenaire");

        } finally {
            setLoadingPartner(false);
        }
    }

    useEffect(() => {

        loadPartner();

    }, [id, setValues]);

    async function handleUpdate(event) {
        console.log("Fonction handleUpdate OK", values);

        event.preventDefault();

        try {
            console.log("try dans la fonction handleUpdate OK");
            
            setLoading(true);
            setMessage("");

            const payload = {
                name: values.name,
                url: values.url,
                img: partner.img
            };

            const res = await updatePartnerApi(id, payload);
            console.log(res);

            setMessage("Mis à jour !")
            
            
        } catch (error) {

            console.error("erreur:", error);
            setMessage("Erreur lors de la mise à jour");

        } finally {

            setLoading(false);

        }

    }

    return(
        <div className="">
            <button className="flex justify-end w-full p-[20px]">
                <img src={iconClose} alt="" />
            </button>

            <form onSubmit={ handleUpdate } className="p-[30px] flex flex-col intems-start gap-[20px] self-stretch font-[Outfit]">

                <div className="flex p-[10px] items-start gap-[10px] self-stretch">
                    <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                    <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    <h2 className="text-[20px] font-bold tracking-[3.2px] uppercase">
                        Section "Partenaires"
                    </h2>
                </div>

                <div className="flex flex-col pb-[10px] justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
                    <label htmlFor="name" className="text-[14px] font-semibold tracking-[2.24px]">
                        Titre principal
                    </label>
                    <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="le projet marsai" className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
                </div>

                <div className="flex items-center justify-center gap-[10px] p-[10px] self-stretch">
                    <div className="uppercase flex w-[288px] h-[182px] flex-col items-center justify-center gap-[12px] px-[43px] py-[34px] rounded-[12px] border-2 border-dashed border-[rgba(0,0,0,0.10)] dark:border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.07)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[1.5px]">
                        <div className="flex w-[48px] h-[48px] items-center justify-center p-[10px] shrink-0 rounded-full bg-[rgba(13,185,242,0.10)]">
                            <img src={iconImg}/>
                        </div>
                        <p className="flex h-[24px] flex-col justify-center shrink-0 self-stretch dark:text-white font-space-grotesk text-[16px] font-bold leading-[24px]">
                            Ajouter un logo (png)
                        </p>
                        <span></span>
                        <input id="logoUpload" type="file" accept="image/png" className="hidden" name="file" onChange={handleChange}/>
                        <label htmlFor="logoUpload" className="flex h-[38px] items-center justify-center shrink-0 px-[17px] py-[10px] rounded-[8px] border border-[#DBE3E6] bg-white text-[#000000] cursor-pointer">
                            Ajouter un logo
                        </label>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <button type="submit" disabled={loading} className="flex w-[200px] h-[53px] items-center justify-center gap-[13px] px-[21px] py-[10px] rounded-[5px] border border-[#DBE3E6] bg-white dark:border-[rgba(0,0,0,0.11)] dark:bg-[#333]">
                        {loading ? "Enregistrement..." : "Mettre à jour"}
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default UpdatePartner
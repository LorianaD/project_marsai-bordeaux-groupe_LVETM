import { useEffect, useState } from "react";
import GetPartnerApi from "../../services/Partner/GetPartnerApi";
const API_URL = import.meta.env.VITE_API_URL;

function PartnersGallery() {

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    async function GetAllPartner() {
        // console.log("Fonction GetAllPartner OK");
        
        try {
            // console.log("try in the function GetAllPartner OK");
            
            setLoading(true);
            setMessage("");

            const res = await GetPartnerApi();
            // console.log("API response: ", res);
            
            setPartners(Array.isArray(res.data) ? res.data : []);

        } catch (error) {
            console.error(error);
            setMessage("Erreur serveur");
        }

    }

    useEffect(()=> {
        GetAllPartner();
    }, []);

    return(
        <section className="flex flex-wrap justify-center gap-8 py-12 md:p-25">
            {partners.length > 0 && partners.map((p) => (
                <div key={ p.id ?? p.name } className="flex items-center justify-center self-stretch justify-self-stretch row-span-1 col-span-1 rounded-3xl border border-[rgba(128,128,128,0.05)] bg-[rgba(128,128,128,0.05)] dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                    <a href={p.url}>
                        <div className="w-45 h-44 md:w-50 md:h-50 flex items-center justify-center p-2">
                            <img src={`${API_URL}${p.img}`} alt={p.name} />
                        </div>
                    </a>
                </div>
            ))}
        </section>
    )
}

export default PartnersGallery
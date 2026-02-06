import { useEffect, useState } from "react";
import GetPartnerApi from "../../services/Partner/GetPartnetApi";
const API_URL = import.meta.env.VITE_API_URL;

function PartnersGallery() {

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    async function GetAllPartner() {
        console.log("Fonction GetAllPartner OK");
        
        try {
            console.log("try in the function GetAllPartner OK");
            
            setLoading(true);
            setMessage("");

            const res = await GetPartnerApi();
            console.log("API response: ", res);
            
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
        <section className="flex flex-wrap justify-center gap-[30px] py-[50px] md:p-[100px]">
            {partners.length > 0 && partners.map((p) => (
                <div key={ p.id ?? p.name } className="flex items-center justify-center self-stretch justify-self-stretch row-span-1 col-span-1 rounded-[24px] border border-[rgba(128,128,128,0.05)] bg-[rgba(128,128,128,0.05)] dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                    <a href={p.url}>
                        <div className="w-[180px] h-[175px] md:w-[200px] md:h-[200px] flex items-center justify-center p-[10px]">
                            <img src={`${API_URL}${p.img}`} alt={p.name} />
                        </div>
                    </a>
                </div>
            ))}
        </section>
    )
}

export default PartnersGallery
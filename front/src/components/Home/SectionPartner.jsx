import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GetPartnerApi from "../../services/Partner/GetPartnetApi";
const API_URL = import.meta.env.VITE_API_URL;

function SectionPartner() {

    const { t } = useTranslation("home");

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    let isMounted = true;

    async function GetAllPartner() {
        // console.log("Fonction GetAllPartner OK");
        
        try {
            // console.log("try in the function GetAllPartner OK");
            
            setLoading(true);
            setMessage("");

            const res = await GetPartnerApi();
            // console.log("API response: ", res);

            const data = Array.isArray(res.data) ? res.data : [];
            
            setPartners(data.slice(0,8));

        } catch (error) {
            console.error(error);
            setMessage("Erreur serveur");

        } finally {
            setLoading(false);
        }

    }

    useEffect(()=> {
        GetAllPartner();
    }, []);

    return(
        <section className="flex flex-col items-start gap-[48px] p-[20px] md:gap-[80px] md:px-[75px] md:py-[100px] self-stretch">
            <div className="flex md:h-[91px] flex-col items-center gap-[16px] self-stretch">
                <div className="flex md:h-[91px] flex-col items-center gap-[16px] shrink-0 self-stretch">
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                    <p className="text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase">Nos Soutiens</p>
                    <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                </div>
                <h2 className="text-center text-[36px] md:text-[60px] font-bold leading-[40px] md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase w-full">
                    <span>
                        {t("partnersSection.title_main")}
                    </span>
                    <span className="block md:inline text-[#00D3F2]">
                        {t("partnersSection.title_accent")}
                    </span>
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] self-stretch">
                {partners.length > 0 && partners.map((p) => (
                    <div key={ p.id ?? p.name } className="flex items-center justify-center self-stretch justify-self-stretch row-span-1 col-span-1 rounded-[24px] border border-[rgba(128,128,128,0.05)] bg-[rgba(128,128,128,0.05)] dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                        <div className="w-[175px] md:w-[300px] md:h-[200px] flex items-center justify-center">
                            <img
                              src={p.img ? `${API_URL}${p.img}` : ""}
                              alt={p.name}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="0 0 120 80"><rect fill="%23f0f0f0" width="120" height="80"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="11">Logo</text></svg>');
                              }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SectionPartner
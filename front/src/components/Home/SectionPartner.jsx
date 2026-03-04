import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GetPartnerApi from "../../services/Partner/GetPartnetApi";
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
const API_URL = import.meta.env.VITE_API_URL;

function SectionPartner() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "partnersSection";

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    const { content, message } = useCmsContent(locale);

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
        <>
            { isSectionVisible(content, section) && (
                <section className="flex flex-col items-start gap-[48px] p-[20px] md:gap-[80px] md:px-[75px] md:py-[100px] self-stretch">
                    
                    <div className="flex md:h-[91px] flex-col items-center gap-[16px] self-stretch">
                        
                        {/* Sur-titre */}
                        {isVisible(content, section, "eyebrow") && (
                            <div className="flex md:h-[91px] flex-col items-center gap-[16px] shrink-0 self-stretch">
                                <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                                <p className="text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase">{content?.[section]?.eyebrow}</p>
                                <div className="w-[48px] h-[1px] shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                            </div>
                        )}

                        {/* Titre */}
                        <h2 className="text-center text-[36px] md:text-[60px] font-bold leading-[40px] md:leading-[60px] tracking-[-1.8px] md:tracking-[-3px] uppercase w-full">
                            {isVisible(content, section, "title_main") && (
                                <span>
                                    {content?.[section]?.title_main || t("partnersSection.title_main")}
                                </span>
                            )}
                            {isVisible(content, section, "title_accent") && (
                                <span className={`block md:inline text-[${content?.[section]?.title_accent_color}]`}>
                                    {content?.[section]?.title_accent || t("partnersSection.title_accent")}
                                </span>
                            )}
                        </h2>
                    </div>

                    {/* Logos des partenaires */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] self-stretch">
                        {partners.length > 0 && partners.map((p) => (
                            <div key={ p.id ?? p.name } className="flex items-center justify-center self-stretch justify-self-stretch row-span-1 col-span-1 rounded-[24px] border border-[rgba(128,128,128,0.05)] bg-[rgba(128,128,128,0.05)] dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                                <div className="w-[175px] md:w-[300px] md:h-[200px] flex items-center justify-center">
                                    <img src={`${API_URL}${p.img}`} alt={p.name} />
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            )}
        </>
    )
}

export default SectionPartner
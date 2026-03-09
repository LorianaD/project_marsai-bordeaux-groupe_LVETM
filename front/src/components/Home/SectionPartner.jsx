import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GetPartnerApi from "../../services/Partner/GetPartnetApi";
import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
const API_URL = import.meta.env.VITE_API_URL;

function SectionPartner() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "partnersSection";

    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Message, setMessage] = useState("");

    const { content, message } = useCmsContent(page, locale);

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
            { isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-start gap-12 p-5 md:gap-20 md:px-18.75 md:py-25 self-stretch">
                    
                    <div className="flex md:h-22.75 flex-col items-center gap-4 self-stretch">
                        
                        {/* Sur-titre */}
                        {isVisible(content, page, section, "eyebrow") && (
                            <div className="flex md:h-22.75 flex-col items-center gap-7 shrink-0 self-stretch">
                                <div className="w-12 h-px shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                                <p className="text-center text-[10px] font-bold leading-3.75 tracking-[4px] uppercase">{content?.[page]?.[section]?.eyebrow}</p>
                                <div className="w-12 h-px shrink-0 bg-black dark:bg-[#FFFFFF]"></div>
                            </div>
                        )}

                        {/* Titre */}
                        <h2 className="text-center text-[36px] md:text-[60px] font-bold leading-10 md:leading-15 tracking-[-1.8px] md:tracking-[-3px] uppercase w-full">
                            {isVisible(content, page, section, "title_main") && (
                                <span>
                                    {content?.[page]?.[section]?.title_main || t("partnersSection.title_main")}
                                </span>
                            )}
                            {isVisible(content, page, section, "title_accent") && (
                                <span className={`block md:inline text-[${content?.[page]?.[section]?.title_accent_color}]`}>
                                    {content?.[page]?.[section]?.title_accent || t("partnersSection.title_accent")}
                                </span>
                            )}
                        </h2>
                    </div>

                    {/* Logos des partenaires */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 self-stretch">
                        {partners.length > 0 && partners.map((p) => (
                            <div key={ p.id ?? p.name } className="flex items-center justify-center self-stretch justify-self-stretch row-span-1 col-span-1 rounded-3xl border border-[rgba(128,128,128,0.05)] bg-[rgba(128,128,128,0.05)] dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                                <div className="w-43.75 md:w-75 md:h-50 flex items-center justify-center">
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
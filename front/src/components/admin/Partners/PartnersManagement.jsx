import { useEffect, useState } from "react";
import GetPartnerApi from "../../../services/Partner/GetPartnerApi";
import PartnerUpdate from "../../Form/CMS/Partners/PartnerUpdate";
import CmsFormHeader from "../../Form/CMS/Titles/CmsFormHeader";

const API_URL = import.meta.env.VITE_API_URL;

function PartnersManagement() {
    
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedPartner, setSelectedPartner] = useState(null);

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
        } finally {
            setLoading(false);
        }

    }

    useEffect(()=> {
        GetAllPartner();
    }, []);

    function handleEdit(partner) {
        console.log("Modifier cliqué :", partner);
        
        setSelectedPartner(partner);
    }

    function handleDelete(id) {
        console.log("Supprimer le partenaire:", id);
    }

    return(
        <section>
            <CmsFormHeader title="Gestion de nos partnaires"/>
            <div className="flex w-full py-10">
                <table className="w-full table-fixed border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-left">
                            <th scope="col"  className="w-[22%] px-4 pb-2">
                                Logo
                            </th>
                            <th scope="col" className="w-[18%] px-4 pb-2">
                                Nom
                            </th>
                            <th scope="col" className="w-[40%] px-4 pb-2">
                                Lien
                            </th>
                            <th scope="col" className="w-[20%] px-4 pb-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {partners.length > 0 && partners.map((p) => (
                            <tr key={ p.id ?? p.name } className="align-middle rounded-xl bg-white/5">
                                <td className="px-4 py-3">
                                    <img src={`${API_URL}${p.img}`} alt={p.name} className="h-16 w-auto object-contain" />
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    {p.name}
                                </td>
                                <td className="px-4 py-3 truncate">
                                    <a href={p.url} target="_blank" rel="noreferrer" className="hover:underline">
                                        {p.url}
                                    </a>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-2">
                                        <button type="button" onClick={() => handleEdit(p)} className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10">
                                            Modifier
                                        </button>
                                        <button type="button" onClick={() => handleDelete(p.id)} className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-extrabold text-red-700 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/20">
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                        {selectedPartner && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/70 p-4">
                                <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-black border border-white/10 max-h-[90vh] overflow-y-auto">
                                    <PartnerUpdate partner={selectedPartner} onClose={() => setSelectedPartner(null)} onUpdated={GetAllPartner} />
                                </div>
                            </div>
                        )}

            </div>
        </section>
    )
}

export default PartnersManagement
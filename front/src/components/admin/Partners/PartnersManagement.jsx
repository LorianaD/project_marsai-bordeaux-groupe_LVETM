import { useEffect, useState } from "react";
import GetPartnerApi from "../../../services/Partner/GetPartnerApi";
import PartnerUpdate from "../../Form/CMS/Partners/PartnerUpdate";
import CmsFormHeader from "../../Form/CMS/Titles/CmsFormHeader";
import deletePartnerApi from "../../../services/Partner/DeletePartnerApi";
import BtnAdd from "../../Buttons/BtnAdd";
import PartnerAdd from "../../Form/CMS/Partners/PartnerAdd";

const API_URL = import.meta.env.VITE_API_URL;

function PartnersManagement() {
    
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [modalType, setModalType] = useState(null);

    function handleCreate() {
        // console.log("creation ok");
        setSelectedPartner(null);
        setModalType("add");
    }

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

        setModalType("edit");

    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Supprimer ce partenaire ?");

        if (!confirmDelete) return;

        try {

            await deletePartnerApi(id);

            setPartners(prev => prev.filter(p => p.id !== id));

        } catch (error) {
            console.error(error);
        }
        
    }

    function handleCloseModal() {
        setSelectedPartner(null);
        setModalType(type);
    }

    return(
        <section className="w-full">
            <h3 className="text-[42px] font-extrabold tracking-tight">Gestion de nos partnaires</h3>
            <div className="pt-5 w-full flex justify-end">
                <BtnAdd onClick={handleCreate}></BtnAdd>
            </div>
            <div className="flex w-full py-10">
                <table className="w-full table-fixed border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-left h-20 rounded-xl bg-[#52A3FF]/20 dark:bg-[#52A3FF]/20 border border-black/10 dark:border-white/10">
                            <th scope="col"  className="w-[25%] px-4 py-2">
                                Logo
                            </th>
                            <th scope="col" className="w-[25%] px-4 py-2">
                                Nom
                            </th>
                            <th scope="col" className="w-[25%] px-4 py-2">
                                Lien
                            </th>
                            <th scope="col" className="w-[25%] px-4 py-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {partners.length > 0 && partners.map((p) => (
                            <tr key={ p.id ?? p.name } className="align-middle rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10">
                                <td className="px-8 py-3">
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

                {modalType === "edit" && selectedPartner && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/70 p-4">
                        <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-black border border-white/10 max-h-[90vh] overflow-y-auto">
                            <PartnerUpdate partner={selectedPartner} onClose={handleCloseModal} onUpdated={GetAllPartner} />
                        </div>
                    </div>
                )}

                {modalType === "add" && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/70 p-4">
                        <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-black border border-white/10 max-h-[90vh] overflow-y-auto">
                            <PartnerAdd onClose={handleCloseModal} onAdded={GetAllPartner}/>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export default PartnersManagement
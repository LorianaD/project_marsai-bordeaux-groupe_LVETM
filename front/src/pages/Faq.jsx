 /************************************************
 ****** FAQ PUBLIC PAGE *************************
************************************************/

import { useEffect, useState } from "react";
import getAllFaq from "../services/Faq/getFaqApi.js";
import { useTranslation } from "react-i18next";
import SectionHero from "../components/FAQ/SectionHero.jsx";
import { isSectionVisible } from "../utils/isVisible.js";
import useCmsContent from "../hooks/useCmsContent.js";

function Faq() {

    // Page et section
    const page = "faq";
    const hero = "hero";

    //paramétre i18n
    const { t, i18n } = useTranslation(page);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    //vérifie si la langue active d'i18n est "fr".
    const isFrench = i18n.language.startsWith("fr");

    //usestate pour le fetch (***********************commun mais avec une variation a public et admin******************************)
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [loading, setLoading] = useState(false);

    const { content, message } = useCmsContent(page, locale);
    


    //fetch des faqs (***********************commun a public et admin******************************)
    useEffect(() => {
        const fetchFaqs = async () => {
            try{
                setLoading(true);
                const res = await getAllFaq();
                setFaqs(res.data);
            }catch (error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };  
        fetchFaqs();
    },[]);    

    //fonction pour ajouter ou retirer une id a setOpenFaq pour gerer l'affichage des réponse
    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id); //ajoute l'id ou la retire si c'est la meme id
    };

    if (loading) return null;

    return(
        <main>
            {/* TITRE DE LA PAGE */}
			<div className="px-4 md:px-0">
				{isSectionVisible(content, page, hero) && (
                    <SectionHero/>
                )}
                {/* Affichage des erreurs si il y en a */}
				{error && (<p className="text-red-500 text-center">{t(error)}</p>)}

                {/* Affichage du loading pendant le fetch initial */}
                {loading && faqs.length === 0 && (
                    <p className="text-gray-500 text-center">Loading…</p>
                )}

                {/* AFFICHAGE DE LA FAQ*/}
				<div>
					{faqs.length === 0 ? (
						<p className="text-center">No FAQ available</p>
					) : (
						faqs.map((faq) => (
							<article key={faq.id} className="m-5 w-full max-w-225 mx-auto rounded-4xl border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-10 p-4 md:p-10">
                                <button onClick={() => toggleFaq(faq.id)}   className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">                                    
                                    <span>{isFrench ? faq.question_fr : faq.question_en}</span>
                                    {/* Flèche d’ouverture de la réponse  */}                                 
                                    <span className={`font-bold transition-transform duration-300 ${openFaq === faq.id ? "rotate-90" : "rotate-0"}`}>&gt;</span>
                                </button>
                                
                                {openFaq === faq.id && ( //si openFaq = faq.id affiche la réponse
								    <p className="text-left">{isFrench ? faq.answer_fr : faq.answer_en}</p>
                                )}
							</article>
						))
					)}
				</div>
			</div>
        </main>
    )
}

export default Faq
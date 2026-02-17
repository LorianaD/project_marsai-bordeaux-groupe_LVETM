 /************************************************
 ****** FAQ PAGE ********************************
************************************************/

import { useEffect, useState } from "react"
import getAllFaq from "../services/Faq/getFaqApi"
import deleteFaq from "../services/Faq/deleteFaqApi";
import updateFaq from "../services/Faq/updateFaqapi";
import addFaq from "../services/Faq/addFaqApi";
import FaqForm from "../components/Form/Faq/faqForm";
import { useTranslation } from "react-i18next"

function Faq() {
    //paramétre i18n
    const { t, i18n } = useTranslation("faq");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    //vérifie si la langue du client est "fr".
    // const userLang = navigator.language || navigator.userLanguage;
    const isFrench = i18n.language.startsWith("fr");

    //usestate pour le fetch
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    //usestate pour les inputs
    const [loading, setLoading] = useState(false);
    const [faqsEdit, setFaqsEdit] = useState([]);
    const [newFaq, setNewFaq] = useState({
  rank: 1,
  question_fr: "",
  question_en: "",
  answer_fr: "",
  answer_en: ""
});

    //fetch des faqs
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await getAllFaq();
                setFaqs(res.data);
            } catch (error) {
                setError(error.message);
            };
        };  
        fetchFaqs();
    },[]);    

    //initialisation du state
    useEffect(() => {
        setFaqsEdit(faqs.map(faq => ({ ...faq })));
    },[faqs]);

    //fonction pour ajouter ou retirer une id a setOpenFaq pour gerer l'affichage des réponse
    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id); //ajoute l'id ou la retire si c'est la meme id
    };

    //fonction d'ajout d'une faq
    const handleAdd = async () => {
        try {
            setLoading(true);
            const addedFaq = await addFaq(newFaq);
            //mise à jour des states
            setFaqs((prev => [...prev, addedFaq]));
            setFaqsEdit(prev => [...prev, addedFaq]);//prev

            alert("FAQ added !");
        } catch (error) {
            console.error(error);
            alert("Error while adding FAQ");
        } finally {
        setNewFaq({
            rank: 1,
            question_fr: "",
            question_en: "",
            answer_fr: "",
            answer_en: ""
        });
        setLoading(false);
        }
    }

    //fonction de suppresion d'une faq
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteFaq(id);
            //mise à jour des states
            setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== id));
            setFaqsEdit(prev => prev.filter(faq => faq.id !== id));

            alert("FAQ deleted !");
        }catch(error){
            console.error(error);
            alert("Error while deleting FAQ");
        } finally {
            setLoading(false);
        }
    }

    //fonction de mise a jour d'un faq
    const handleUpdate = async (faq) => {
        try {
            setLoading(true);
            const updatedFaq = await updateFaq(faq);
            //mise à jour du state avec le return du backend
            setFaqs(prevFaqs => prevFaqs.map(item => item.id === faq.id ? updatedFaq : item))
            //mise à jour du state pour les inputs
            setFaqsEdit(prevFaqs => prevFaqs.map(item => item.id === faq.id ? updatedFaq : item))


            alert("FAQ updated !")
        } catch (error) {
            console.error(error);
            alert("Error while updating the FAQ");
        } finally {
            setLoading(false);
        }
    }

    //fonction pour mettre à jour un champ spécifique d'une FAQ dans le state faqsEdit
    const handleEditChange = (id, field, value) => {
        setFaqsEdit(current =>
            current.map(faq =>
                faq.id === id ? { ...faq, [field]: value } : faq
            )
        );
    };

    return(
        <main>
            {/* TITRE DE LA PAGE */}
			<div className="px-4 md:px-0">
				<h1 className="font-bold m-10 text-[34px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">
                    FAQ
                </h1>
                {/* Affichage des erreurs si il y en a */}
				{error && <p>{error}</p>}

                {/* AFFICHAGE DE LA FAQ*/}
				<div>
					{faqs.length === 0 ? (
						<p>No FAQ available</p>
					) : (
						faqs.map((faq) => (
							<article key={faq.id} className="m-5 w-full max-w-[900px] mx-auto rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[40px] p-4 md:p-[40px]">
                                <button onClick={() => toggleFaq(faq.id)}   className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">                                    
                                    <span>Question: {isFrench ? faq.question_fr : faq.question_en}</span>
                                    {/* Flèche d’ouverture de la réponse  */}                                 
                                    <span className={`font-bold transition-transform duration-300 ${openFaq === faq.id ? "rotate-90" : "rotate-0"}`}>&gt;</span>
                                </button>
                                
                                {openFaq === faq.id && ( //si openFaq = faq.id affiche la réponse
								    <p className="text-left">Réponse: {isFrench ? faq.answer_fr : faq.answer_en}</p>
                                )}
							</article>
						))
					)}
				</div>

                {/* ADMIN ADMIN ADMIN */}
                {/* ADMIN ADMIN ADMIN */}
                {/* Formulaire d'ajout d'une faq */}
                <div className="flex justify-center">
                    <FaqForm
                        faq={newFaq}
                        onChange={(id, field, value) => setNewFaq(prev => ({ ...prev, [field]: value }))}
                        onSubmit={handleAdd}
                        loading={loading}
                    />
                </div>
                {/* formulaire de modification d'une faq */}
                <div className="flex flex-wrap gap-4 justify-center">
                {faqsEdit.map(faq => (
                    <FaqForm
                        key={faq.id}
                        faq={faq}
                        onChange={handleEditChange}
                        onSubmit={handleUpdate}
                        onDelete={handleDelete}
                        loading={loading}
                        isEdit={true}
                    />
                ))}
                </div>
			</div>
        </main>
    )
}

export default Faq
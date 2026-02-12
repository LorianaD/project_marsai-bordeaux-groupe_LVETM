 /************************************************
 ****** FAQ PAGE ********************************
************************************************/

import { useEffect, useState } from "react"
import getAllFaq from "../services/Faq/getFaqApi"
import deleteFaq from "../services/Faq/deleteFaqApi";
import updateFaq from "../services/Faq/updateFaqapi";
import addFaq from "../services/Faq/addFaqApi";

function Faq() {
    //usestate pour le fetch
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    //usestate pour les inputs
    const [faqsEdit, setFaqsEdit] = useState([]);
    const [newFaq, setNewFaq] = useState([]);

    //vérifie si la langue du client est "fr".
    const userLang = navigator.language || navigator.userLanguage;
    const isFrench = userLang.startsWith("fr");

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

    //fonction d'ajout d'un faq
    const handleAdd = async () => {
        try {
            const addedFaq = await addFaq(newFaq)
            //mise à jour des states
            setFaqs((prev => [...prev, addedFaq]));
            setFaqsEdit(prev => [...prev, addedFaq]);
        } catch (error) {
            console.error(error);
            alert("error while adding FAQ");
        }
    }

    //fonction de suppresion d'une faq
    const handleDelete = async (id) => {
        try {
            await deleteFaq(id);

            setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== id));
            setFaqsEdit(prev => prev.filter(faq => faq.id !== id));
        }catch(error){
            console.error(error);
            alert("Error while deleting FAQ");
        }
    }

    //fonction de mise a jour d'un faq
    const handleUpdate = async (faq) => {
        try {
            const updatedFaq = await updateFaq(faq);
            //mise à jour du state avec le return du backend
            setFaqs(prevFaqs => prevFaqs.map(item => item.id === faq.id ? updatedFaq : item))
            //mise à jour du state pour les inputs
            setFaqsEdit(prevFaqs => prevFaqs.map(item => item.id === faq.id ? updatedFaq : item))


            alert("FAQ updated !")
        } catch (error) {
            console.error(error);
            alert("Error while updating the FAQ");
        }
    }

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
                <h1 className="font-bold m-10 text-[34px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">FAQ</h1>
                <h2 className="font-bold m-10 text-[28px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">ADD FAQ</h2>

                {/* EDIT FAQ SECTION */}
                <h2 className="font-bold m-10 text-[28px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">EDIT FAQ</h2>
                
                {/* edit faq form */}
                {faqs.length === 0 ? (
                    <p>No FAQ available</p>
                ) : (
                    faqsEdit.map((faq) => (
                        <form key={faq.id}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate(faq);
                        }}className="m-5 w-full max-w-[900px] mx-auto rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[40px] p-4 md:p-[40px]">
                            {/* rank update */}
                            <label className="flex flex-col w-full">Rang:
                                <input type="number" value={faq.rank} onChange={(e) => setFaqsEdit(current => current.map(item => item.id === faq.id ? { ...item, rank: Number(e.target.value) } : item))} className="shadow-[0_2px_4px_0_#dbdbdb] p-2"/>
                            </label>
                            {/* question FR EN update input */}
                            <div className="bg-grey">
                                <label className="flex flex-col w-full mb-1">Question FR:
                                <textarea name="question_fr" placeholder="Question FR edit" value={faq.question_fr} onChange={(e) => setFaqsEdit(current => current.map(item => item.id === faq.id ? { ...item, question_fr: e.target.value } : item))} className="shadow-[0_2px_4px_0_#dbdbdb] p-2"/>                                    
                                </label>
                                <label className="flex flex-col w-full">Question EN:
                                <textarea name="question_en" placeholder="Question EN edit" value={faq.question_en} onChange={(e) => setFaqsEdit(current => current.map(item => item.id === faq.id ? { ... item, question_en: e.target.value }: item))} className="shadow-md p-2"/>
                                </label>
                            </div>
                            {/* answer FR EN update input */}
                            <div>
                                <label className="flex flex-col w-full mb-1">Réponse FR:
                                    <textarea name="answer_fr" placeholder="Answer FR edit" value={faq.answer_fr} onChange={(e) => setFaqsEdit(current => current.map(item => item.id === faq.id ? { ... item, answer_fr: e.target.value }: item))} className="shadow-md p-2"/>
                                </label>
                                <label className="flex flex-col w-full">Answer FR:
                                    <textarea name="answer_en" placeholder="Answer EN edit" value={faq.answer_en} onChange={(e) => setFaqsEdit(current => current.map(item => item.id === faq.id ? { ... item, answer_en: e.target.value }: item))} className="shadow-md p-2"/>
                                </label>
                            </div>                              
                            {/* submit button */}
                            <button type="submit">Enregistrer</button>
                            {/* delete button */}
                            <button type="button" onClick={() => handleDelete(faq.id)} className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">
                                🗑Supprimer
                            </button>                               
                        </form>
                    ))
                )}
			</div>
        </main>
    )
}

// Inputs pour éditer la FAQ : tes onChange répétitifs peuvent être extraits dans une fonction générique pour réduire le code, par exemple :

// const handleEditChange = (id, field, value) => {
//   setFaqsEdit(prev => prev.map(faq => faq.id === id ? { ...faq, [field]: value } : faq));
// };

{/* <textarea value={faq.question_fr} onChange={(e) => handleEditChange(faq.id, "question_fr", e.target.value)} /> */}


export default Faq
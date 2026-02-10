 /************************************************
 ****** FAQ PAGE ********************************
************************************************/

import { useEffect, useState } from "react"
import getAllFaq from "../services/Faq/faqApi"
import deleteFaq from "../services/Faq/deleteFaqApi";

function Faq() {
    //usestate pour le fetch
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    //usestate pour les inputs
    const [faqsEdit, setFaqsEdit] = useState([]);
    const [questionFr, setQuestionFr] = useState("");
    const [questionEn, setQuestionEn] = useState("");
    const [answerFr, setAnswerFr] = useState("");
    const [answerEn, setAnswerEn] = useState("");
    const [rank, setRank] = useState();

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

    //fonction de suppresion d'une faq
    const handleDelete = async (id) => {
        await deleteFaq(id);
        setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== id));
    }

    return(
        <main>
            {/* Titre de la page */}
			<div className="px-4 md:px-0">
				<h1 className="font-bold m-10 text-[34px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">FAQ</h1>
                {/* Affichage des erreurs si il y en a */}
				{error && (
					<div>
						<p>{error}</p>
					</div>
				)}

                {/* Affichage de la faq */}

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
                    <h1 className="font-bold m-10 text-[34px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">FAQ</h1>
                    <h2 className="font-bold m-10 text-[28px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">ADD FAQ</h2>
                    <h2 className="font-bold m-10 text-[28px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">EDIT FAQ</h2>
                    {faqs.length === 0 ? (
						<p>No FAQ available</p>
					) : (
						faqsEdit.map((faq) => (
							<article key={faq.id} className="m-5 w-full max-w-[900px] mx-auto rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[40px] p-4 md:p-[40px]">
                                {/* Rank update */}
                                <input type="number" value={faq.rank} onChange={(e) => setRank(e.target.value)} className="shadow-[0_2px_4px_0_#dbdbdb] p-2"/>
                                {/* question update input */}
                                <textarea name="question_fr" placeholder="Question FR edit" value={faq.question_fr} onChange={(e) => setFaqsEdit(e.target.value)} className="shadow-[0_2px_4px_0_#dbdbdb] p-2"/>                                    
                                <textarea name="question_en" placeholder="Question EN edit" value={faq.question_en} onChange={(e) => setQuestionEn(e.target.value)} className="shadow-md p-2"/>
                                {/* answer update input */}
                                <textarea name="answer_fr" placeholder="Answer FR edit" value={faq.answer_fr} onChange={(e) => setAnswerFr(e.target.value)} className="shadow-md p-2"/>
                                <textarea name="answer_en" placeholder="Answer EN edit" value={faq.answer_en} onChange={(e) => setAnswerEn(e.target.value)} className="shadow-md p-2"/>
                                {/* delete button */}
                                <>
                                <button type="submit">Enregistrer</button>
                                <button onClick={() => handleDelete(faq.id)} className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">
                                    🗑Supprimer
                                </button>   
                                </>
                    
                    		</article>
						))
					)}


			</div>
        </main>
    )
}





 					// 	faqs.map((faq) => (
					// 		<article key={faq.id} className="m-5 w-full max-w-[900px] mx-auto rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[40px] p-4 md:p-[40px]">

                    //             <input type="number" defaultValue={faq.rank} onChange={(e) => setRank(e.target.value)} className="shadow-[0_2px_4px_0_#dbdbdb] p-2"/>
                    //             {/* question update input */}
                    //             <textarea name="question_fr" placeholder="Question FR edit" defaultValue={faq.question_fr} onChange={(e) => setQuestionFr(e.target.value)} className="shadow-[0_2px_4px_0_#dbdbdb] p-2"/>
                    //             <textarea name="question_en" placeholder="Question EN edit" defaultvalue={questionEn} onChange={(e) => setQuestionFr(e.target.value)} className="shadow-md p-2"/>
                    //             {/* answer update input */}
                    //             <textarea name="answer_fr" placeholder="Answer FR edit" value={faq.answer_fr} onChange={(e) => setAnswerFr(e.target.value)} className="shadow-md p-2"/>
                    //             <textarea name="answer_en" placeholder="Answer EN edit" value={answerEn} onChange={(e) => setAnswerEn(e.target.value)} className="shadow-md p-2"/>
                    //             {/* delete button */}
                    //             <>
                    //             <button type="submit">Enregistrer</button>
                    //             <button onClick={() => handleDelete(faq.id)} className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">
                    //                 🗑Supprimer
                    //             </button>   
                    //             </>
                    
                    // 		</article>
					// 	))
					// )}
export default Faq
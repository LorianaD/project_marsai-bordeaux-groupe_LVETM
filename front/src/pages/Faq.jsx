import { useEffect, useState } from "react"
import getAllFaq from "../services/Faq/faqApi"
import deleteFaq from "../services/Faq/deleteFaqApi";

function Faq() {
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

    const userLang = navigator.language || navigator.userLanguage;
    const isFrench = userLang.startsWith("fr");

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


    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id); // si c'est ouvert, ferme, sinon ouvre
    };

    const handleDelete = async (id) => {
        await deleteFaq(id);
        setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== id));
    }


    return(
        <main>
			<div className="px-4 md:px-0">
				<h1 className="font-bold m-10 text-[34px] bg-[linear-gradient(180deg,#51A2FF_0%,#AD46FF_50%,#FF2B7F_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent text-center">FAQ</h1>

				{error && (
					<div>
						<p>{error}</p>
					</div>
				)}

				<div>
					{faqs.length === 0 ? (
						<p>No FAQ available</p>
					) : (
						faqs.map((faq) => (
							<article key={faq.id} className="m-5 w-full max-w-[900px] mx-auto rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[40px] p-4 md:p-[40px]">
								<button onClick={() => toggleFaq(faq.id)}   className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">
                                    <span>Question: {isFrench ? faq.question_fr : faq.question_en}</span>
                                    {/* Flèche SVG */}
                                    <span className={`font-bold transition-transform duration-300 ${openFaq === faq.id ? "rotate-90" : "rotate-0"}`}>
                                        &gt;
                                    </span>
                                </button>
                                {openFaq === faq.id && (
								    <p className="text-left">Réponse: {isFrench ? faq.answer_fr : faq.answer_en}</p>
                                )}
                                <button onClick={() => handleDelete(faq.id)} className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">
                                    Supprimer
                                </button>
							</article>
						))
					)}
				</div>
			</div>
        </main>
    )
}

export default Faq
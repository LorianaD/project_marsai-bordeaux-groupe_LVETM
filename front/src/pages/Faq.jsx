import { useEffect, useState } from "react"
import getAllFaq from "../services/Faq/faqApi"

function Faq() {
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

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

    return(
        <main>
			<div>
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
							<article key={faq.id} className="m-5 w-[900px] rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[40px] md:p-[40px]">
								<button onClick={() => toggleFaq(faq.id)}   className="flex w-full justify-between items-center text-left font-semibold text-lg hover:text-blue-500 transition-colors">
                                    <span>Question: {faq.question}</span>
                                    {/* Flèche SVG */}
                                    <span className={`font-bold transition-transform duration-300 ${openFaq === faq.id ? "rotate-90" : "rotate-0"}`}>
                                        &gt;
                                    </span>
                                </button>
                                {openFaq === faq.id && (
								    <p className="text-left">Réponse: {faq.answer}</p>
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
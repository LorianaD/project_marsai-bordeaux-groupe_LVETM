import { useEffect, useState } from "react"
import getAllFaq from "../services/Faq/faqApi"

function Faq() {
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);

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

    return(
        <main>
			<div>
				<h1>FAQ</h1>

				{error && (
					<div>
						<p>{error}</p>
					</div>
				)}

				<div>
					{faqs.length === 0 ? (
						<p>Aucune FAQ disponible</p>
					) : (
						faqs.map((faq) => (
							<article key={faq.id}>
								<p>{faq.question}</p>
								<p>{faq.answer}</p>
							</article>
						))
					)}
				</div>
			</div>
        </main>
    )
}

export default Faq
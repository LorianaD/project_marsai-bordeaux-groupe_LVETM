const API_URL = import.meta.env.VITE_API_URL;

async function updateFaq(id, question_fr, question_en, answer_fr, answer_en, rank) {
    const res = await fetch(`${API_URL}/api/faq/${id}`,{
        method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
        body: JSON.stringify({ rank, question_fr, question_en, answer_fr, answer_en })
    });

    if (!res.ok) throw new Error(`Failed update FAQ ${res.status}`);
}

export default updateFaq;
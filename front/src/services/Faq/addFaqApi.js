const API_URL = import.meta.env.VITE_API_URL;

async function addFaq(data) {
    const res = await fetch(`${API_URL}/api/faq`,{
        method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
        body: JSON.stringify({ rank, question_fr, question_en, answer_fr, answer_en })        
    });

    if (!res.ok) throw new Error(`Failed to create FAQ ${res.status}`);

    const data = await res.json();
    return data;
}

export default addFaq;
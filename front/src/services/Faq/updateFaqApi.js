const API_URL = import.meta.env.VITE_API_URL;

async function updateFaq(faq) {
    const res = await fetch(`${API_URL}/api/faq/${faq.id}`, {
        method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
        body: JSON.stringify(faq)
    });

    if (!res.ok) throw new Error(`Failed update FAQ ${res.status}`);

    //récupère la FAQ mise à jour renvoyée par le backend
    const data = await res.json();
    return data.data;
}

export default updateFaq;
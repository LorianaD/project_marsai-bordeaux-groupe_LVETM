const API_URL = import.meta.env.VITE_API_URL;

async function addFaq(payload) {
    const res = await fetch(`${API_URL}/api/faq`,{
        method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
        body: JSON.stringify(payload)        
    });

    //récupère la nouvellle FAQ
    const responseData = await res.json();

    if (!res.ok) {

    const error = new Error(`Failed to create FAQ ${res.status}`);
    error.details = responseData.errors;// erreur Zod dans le back
    throw error;
    }

    return responseData.data;
}

export default addFaq;
const API_URL = import.meta.env.VITE_API_URL;

async function getAllFaq() {
    const res = await fetch(`${API_URL}/api/faq`);

    if (!res.ok) throw new Error(`Failed to retrieve FAQ ${res.status}`);

    const data = await res.json();
    return data;
}

export default getAllFaq;
const API_URL = import.meta.env.VITE_API_URL;

async function deleteFaq(id) {
    const res = await fetch(`${API_URL}/api/faq/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error(`Failed to delete FAQ ${res.status}`);
}

export default deleteFaq;
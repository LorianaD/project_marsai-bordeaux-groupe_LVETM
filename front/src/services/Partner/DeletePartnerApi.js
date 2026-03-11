const API_URL = import.meta.env.VITE_API_URL

async function deletePartnerApi( id ) {

    // console.log("API updatePartner OK", id);

    const res = await fetch(`${API_URL}/api/partner/${id}`, {
        method: "DELETE",
    });

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data?.message ?? "Error delete partner");
    }

    return data;

}

export default deletePartnerApi;
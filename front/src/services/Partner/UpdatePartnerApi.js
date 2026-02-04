const API_URL = import.meta.env.VITE_API_URL

async function updatePartnerApi(id, payload) {

    console.log("API updatePartner OK");
    

    const res = await fetch(`${API_URL}/api/partner/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    console.log(res);
    

    const data = await res.json();
    console.log(data);
    

    if (!res.ok) {
        throw new Error(data?.message ?? "Erreur update partner");
    }

    return data;

}

export default updatePartnerApi;
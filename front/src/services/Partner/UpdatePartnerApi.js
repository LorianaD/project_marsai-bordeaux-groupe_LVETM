const API_URL = import.meta.env.VITE_API_URL

async function updatePartnerApi(id, { name, url, file }) {

    // console.log("API updatePartner OK");
    
    const formData = new FormData();

    formData.append("name", name ?? "");
    formData.append("url", url ?? "");

    if (file) formData.append("file", file);

    const res = await fetch(`${API_URL}/api/partner/${id}`, {
        method: "PUT",
        body: formData
    });
    // console.log(res);
    

    const data = await res.json();
    // console.log(data);
    

    if (!res.ok) {
        throw new Error(data?.message ?? "Erreur update partner");
    }

    return data;

}

export default updatePartnerApi;
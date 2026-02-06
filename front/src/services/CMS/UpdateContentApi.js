const API_URL = import.meta.env.VITE_API_URL

async function updateContentApi({ page, section, locale, content_key, value, order_index }) {

    console.log("API updatePartner OK");

    const res = await fetch(`${API_URL}/api/cms/${page}/${section}/${locale}/${content_key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, order_index, is_active: 1 }),
    });
    console.log(res);
    

    const data = await res.json();
    console.log(data);
    

    if (!res.ok) {
        throw new Error(data?.message ?? "Erreur update CMS");
    }

    return data;

}

export default updateContentApi;
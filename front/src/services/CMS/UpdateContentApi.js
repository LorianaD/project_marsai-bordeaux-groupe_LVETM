const API_URL = import.meta.env.VITE_API_URL

async function updateContentApi({ page, section, locale, content_key, value, order_index, is_active }) {

    console.log("API updatePartner OK");

    const url = `${API_URL}/api/cms/${page}/${section}/${locale}/${content_key}`;

    // IMAGE
    if (value instanceof File) {

        const formData = new FormData();
        console.log(formData);

        formData.append("file", value);
        formData.append("order_index", String(order_index ?? 0));
        formData.append("is_active", String(is_active ?? 1));

        const res = await fetch(url , {
            method: "PUT",
            body: formData,
        });
        console.log(res); 

        const data = await res.json();
        console.log(data);
        

        if (!res.ok) {
            throw new Error(data?.message ?? "Erreur update CMS");
        }

        return data;
    }

    // TEXTE
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            value: value ?? "",
            order_index: order_index ?? 0,
            is_active: is_active ?? 1,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message ?? "Erreur update CMS");
    }

    return data;

}

export default updateContentApi;
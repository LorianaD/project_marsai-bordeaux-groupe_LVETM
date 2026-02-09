const API_URL = import.meta.env.VITE_API_URL

function buildUrl({ page, section, locale, content_key }) {
  return `${API_URL}/api/cms/${page}/${section}/${locale}/${content_key}`;
}

// TEXTE
async function updateContentApi({ page, section, locale, content_key, value, order_index, is_active }) {
    console.log("API updateContentApi OK");

    const url = buildUrl({ page, section, locale, content_key });

    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, order_index, is_active }),
    });
    console.log(res);
    
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message ?? "Erreur update CMS");
    }

    return data;

}

// IMAGE
async function updateImageApi({ page, section, locale, content_key, value, order_index, is_active }) {

    console.log("API updateImageApi OK");

    const url = buildUrl({ page, section, locale, content_key });

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

// ACTIVE
async function updateActiveApi({ page, section, locale, content_key, order_index, is_active }) {
    console.log("API updateActiveApi OK");

    const url = buildUrl({ page, section, locale, content_key });

    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order_index: order_index,
            is_active: is_active,
        }),
    });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message ?? "Erreur update CMS (active)");

  return data;
}

export {
    updateContentApi,
    updateActiveApi,
    updateImageApi
}
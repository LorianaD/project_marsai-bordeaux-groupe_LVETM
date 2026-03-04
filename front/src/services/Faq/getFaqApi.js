const API_URL = import.meta.env.VITE_API_URL;

async function getAllFaq() {
    try{
        const res = await fetch(`${API_URL}/api/faq`,{
            method: "GET",
        });

        if (!res.ok) {
            //erreur serveur
            throw new Error("faq_display.errors.fetch_http");
        }
    
        const data = await res.json();
        return data;
    }catch(error){
        //erreur réseau
        if(error instanceof TypeError){
            throw new Error("faq_display.errors.fetch_network");
        }
        throw error;
    }
}

export default getAllFaq;
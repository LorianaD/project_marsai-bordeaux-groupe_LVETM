const API_URL = import.meta.env.VITE_API_URL;

async function GetOnePartnerApi(id) {
    console.log("function GetOnePartnerApi OK");

    const res = await fetch(`${API_URL}/api/partner/${id}`);
    console.log(res);
    
    const data = await res.json();
    console.log(data);
    
    if (!res.ok) throw new Error("Error fetch partner");

    return data;
    
}

export default GetOnePartnerApi
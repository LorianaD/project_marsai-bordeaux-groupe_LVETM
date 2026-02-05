const API_URL = import.meta.env.VITE_API_URL;

async function InsertPartnerApi(formData) {
    // console.log("fonction API InsertPartner OK");

    const response = await fetch(`${API_URL}/api/partner`,{
        method: "POST",
        body: formData,
    })
    // console.log(response);
    
    const data = await response.json().catch(()=> null);
    // console.log(data);
    
    if (!response.ok) {
        throw new Error(data?.error || "Error during partner insertion")
    }

    return data;
    
}

export default InsertPartnerApi
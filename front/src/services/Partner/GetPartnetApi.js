const API_URL = import.meta.env.VITE_API_URL;

async function GetPartnerApi() {
    console.log("fonction API GetPartner OK");

    const response = await fetch(`${API_URL}/api/partner`)
    console.log(response);
    
    const data = await response.json();
    console.log(data);

    return data;
    
}

export default GetPartnerApi
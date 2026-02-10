const API_URL = import.meta.env.VITE_API_URL;

async function GetAllContentApi() {
    // console.log("fonction API GetAllContent OK");

    const response = await fetch(`${API_URL}/api/cms`)
    // console.log("response :",response);
    
    const data = await response.json();
    // console.log("data :", data);

    return data;
    
}

export default GetAllContentApi
const API_URL = import.meta.env.VITE_API_URL;

export async function uploadVideo(formData) {
    console.log("function uploadVideo dans VideoUploadApi.js OK");
    
    const response = await fetch(`${API_URL}/api/videos`, {
        method: "POST",
        body: formData,
    });
    console.log(response);

    const data = await response.json().catch(() => null);
    console.log(data);

    if (!response.ok) {
        throw new Error(data?.error || "Erreur upload vidéo");
    }

    return data;
}
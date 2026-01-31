const API_URL = import.meta.env.VITE_API_URL;

export async function fetchVideos() {
    console.log("async function fetchVideos ok");
    
    const response = await fetch(`${API_URL}/api/videos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`Erreur API videos (${response.status}) ${text}`);
    }

    return response.json();
}
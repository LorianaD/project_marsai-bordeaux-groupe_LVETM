

// fonction pour se logger et faire le lien entre le front et le back
const API = import.meta.env.VITE_API_BASE_URL || "";

export async function loginUser(email, password) {
  const res = await fetch(`${API}/api/users/login`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json", 
        Accept: "application/json" },

    body: JSON.stringify({ email, password }),
  });

  if(!res.ok) {
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      throw new Error(data.error || `Login Failed ${res.status}`);
    } catch (error) {
      throw new Error(`Login Failed ${res.status}: ${text}`);
      
    }
  }

  return res.json()

}

// On récupère l’URL du backend depuis le .env
// Si elle n’existe pas, on utilise localhost:3000 par défaut
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Fonction async qui va aller chercher la liste des vidéos
export async function fetchVideos() {

  // On appelle l’API du backend pour récupérer les vidéos
  // fetch = requête HTTP
  const res = await fetch(`${API_URL}/api/videos`, {

    // On précise que c’est une requête GET (lecture de données)
    method: "GET",

    // On dit au serveur :
    // “je m’attends à recevoir du JSON en réponse”
    headers: {
      Accept: "application/json",
    },
  });

  // Si la réponse du serveur n’est PAS OK (ex: 400, 404, 500…)
  if (!res.ok) {

    // On prépare une variable pour stocker le message d’erreur
    let msg = "";

    try {
      // On essaie de lire l’erreur comme du JSON
      // (cas le plus courant avec une API)
      const data = await res.json();

      // On récupère le message le plus utile possible
      msg = data?.details || data?.error || JSON.stringify(data);
    } catch {
      // Si ce n’est pas du JSON (ex: page HTML d’erreur),
      // on lit le texte brut à la place
      msg = await res.text().catch(() => "");
    }

    // On déclenche une vraie erreur JavaScript
    // avec le code HTTP + le message
    throw new Error(`Erreur API videos (${res.status}) ${msg}`);
  }

  // Si tout s’est bien passé :
  // on retourne les données JSON (la liste des vidéos)
  return res.json();
}

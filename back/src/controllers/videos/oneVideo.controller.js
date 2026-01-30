import videosModel from "../../models/videos.model.js";

//  Ce contrôleur sert à récupérer UNE vidéo (par son id)
// Exemple : GET /api/videos/12
async function oneVideoController(req, res) {
  try {
    //  Je récupère l’id dans l’URL (params)
    // si la route est /api/videos/:id alors ici j’ai req.params.id
    const { id } = req.params;

    //  Je demande au "model" d’aller chercher la vidéo dans la base
    // "findOnePublishedVideoById" = normalement ça veut dire :
    // "je prends la vidéo si elle existe ET si elle est publiée"
    const video = await videosModel.findOnePublishedVideoById(id);

    //  Si la base me renvoie rien, ça veut dire : pas trouvée
    // Donc je réponds 404 (not found)
    if (!video) {
      return res.status(404).json({
        error: "Vidéo introuvable",
      });
    }

    //  Si tout va bien :
    // je réponds 200 (ok) et j’envoie la vidéo au front en JSON
    return res.status(200).json({ video });
  } catch (error) {
    //  Si ça plante (bug, DB down, etc.) :
    // je log dans la console pour debug
    console.error("oneVideoController error:", error);

    //  Et je renvoie une erreur 500 côté client
    // "details" peut aider en dev, mais en prod on évite parfois
    // d’envoyer trop d’infos internes
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}

//  On exporte le contrôleur pour l’utiliser dans les routes
export default oneVideoController;

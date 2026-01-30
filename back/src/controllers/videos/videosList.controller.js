import videosModel from "../../models/videos.model.js";

//  Ce contrôleur sert à récupérer LA LISTE des vidéos publiées
// Exemple : GET /api/videos
// Il peut aussi prendre des paramètres dans l’URL (req.query)
async function videosListController(req, res) {
  try {
    //  On demande au model la liste des vidéos publiées
    // req.query contient les paramètres optionnels de l’URL
    // ex: /api/videos?limit=10&page=2
    const videos = await videosModel.findPublishedVideos(req.query);

    //  Si tout va bien :
    // on renvoie 200 (OK) + la liste des vidéos en JSON
    res.status(200).json({ videos });
  } catch (error) {
    //  Si quelque chose plante (DB, bug, etc.)
    // on renvoie une erreur serveur
    res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}

// On exporte le contrôleur pour l’utiliser dans les routes
export default videosListController;

import videosModel from "../../models/videos.model.js";

// Récupère la liste des vidéos publiées
async function videosListController(req, res) {
  try {
    const videos = await videosModel.findPublishedVideos(req.query);

    res.status(200).json({ videos });
  } catch (error) {
    // Gestion erreur serveur
    res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}

export default videosListController;

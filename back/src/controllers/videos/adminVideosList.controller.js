import videosModel from "../../models/videos.model.js";

// Récupère toutes les vidéos pour l'administration
async function adminVideosListController(req, res) {
  try {
    const videos = await videosModel.findAllVideosAdmin();
    return res.status(200).json({ videos });
  } catch (error) {
    // Gestion erreur serveur
    console.error("adminVideosListController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

export default adminVideosListController;

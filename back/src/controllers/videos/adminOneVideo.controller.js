import videosModel from "../../models/videos.model.js";

// Récupère une vidéo spécifique pour l'administration
async function adminOneVideoController(req, res) {
  try {
    const { id } = req.params;

    const video = await videosModel.findOneVideoByIdAdmin(id);

    if (!video) {
      return res.status(404).json({ error: "video introuvable", id });
    }

    return res.status(200).json({ video });
  } catch (error) {
    // Gestion erreur serveur
    console.error("adminOneVideoController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

export default adminOneVideoController;

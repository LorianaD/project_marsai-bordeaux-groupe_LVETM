import videosModel from "../../models/videos.model.js";

// Récupère une vidéo publiée par son id
async function oneVideoController(req, res) {
  try {
    const { id } = req.params;

    const video = await videosModel.findOnePublishedVideoById(id);

    if (!video) {
      return res.status(404).json({
        error: "Vidéo introuvable",
      });
    }

    return res.status(200).json({ video });
  } catch (error) {
    // Gestion erreur serveur
    console.error("oneVideoController error:", error);

    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}

export default oneVideoController;

import videosModel from "../../models/videos.model.js";

// Met à jour le statut featured d'une vidéo
async function patchVideoFeaturedController(req, res) {
  try {
    const { id } = req.params;
    const { featured } = req.body;

    const normalized =
      featured === true ||
      featured === 1 ||
      featured === "1" ||
      featured === "true";

    const affected = await videosModel.updateVideoFeatured(id, normalized);

    if (!affected) {
      return res.status(404).json({ error: "Vidéo introuvable", id });
    }

    return res
      .status(200)
      .json({ message: "Featured mis à jour", id, featured: normalized });
  } catch (error) {
    // Gestion erreur serveur
    console.error("patchVideoFeaturedController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

export default patchVideoFeaturedController;

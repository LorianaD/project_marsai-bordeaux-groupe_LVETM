import videosModel from "../../models/videos.model.js";

const ALLOWED = [
  "Pending",
  "Uploading",
  "Processing",
  "Published",
  "Rejected",
  "Failed",
];

async function patchVideoStatusController(req, res) {
  try {
    const { id } = req.params;
    const { upload_status } = req.body;

    if (!upload_status || !ALLOWED.includes(upload_status)) {
      return res.status(400).json({
        error: "upload_status invalide",
        details: `Valeurs acceptées : ${ALLOWED.join(", ")}`,
        received: upload_status,
      });
    }

    const affected = await videosModel.updateVideoStatus(id, upload_status);

    if (!affected) {
      return res.status(404).json({ error: "Vidéo introuvable", id });
    }

    return res
      .status(200)
      .json({ message: "Status mis à jour", id, upload_status });
  } catch (error) {
    console.error("patchVideoStatusController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

export default patchVideoStatusController;

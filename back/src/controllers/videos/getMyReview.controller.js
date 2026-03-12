import videoReviewModel from "../../models/videoReview.model.js";

export default async function getMyReviewController(req, res) {
  try {
    const videoId = Number(req.params.id);
    if (!Number.isFinite(videoId)) {
      return res.status(400).json({ error: "Invalid video id" });
    }

    const u = req.user || req.auth || req.admin;
    const userId = u?.id;

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const review = await videoReviewModel.findMyReview(videoId, userId);
    return res.status(200).json({ review });
  } catch (e) {
    return res.status(500).json({ error: "Erreur serveur", details: e.message });
  }
}
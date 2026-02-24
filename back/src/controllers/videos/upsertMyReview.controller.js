import videoReviewModel from "../../models/videoReview.model.js";

export default async function upsertMyReviewController(req, res) {
  try {
    const videoId = Number(req.params.id);
    if (!Number.isFinite(videoId)) {
      return res.status(400).json({ error: "Invalid video id" });
    }

    const u = req.user || req.auth || req.admin;
    const userId = u?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const ratingNum = Number(req.body?.rating);
    const comment = req.body?.comment ?? null;

    if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 10) {
      return res.status(400).json({
        error: "Invalid rating",
        details: "rating doit être un nombre entre 1 et 10",
      });
    }

    const review = await videoReviewModel.upsertReview({
      videoId,
      userId,
      rating: ratingNum,
      comment,
    });

    return res.status(200).json({ message: "OK", review });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: e.message });
  }
}

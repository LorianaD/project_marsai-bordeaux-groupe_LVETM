import fs from "fs";
import path from "path";
import juryModel from "../../models/jury.model.js";

export default async function UpdateJuryController(req, res) {
  try {
    const { id } = req.params;

    const existing = await juryModel.findJuryById(id);
    if (!existing) return res.status(404).json({ error: "Membre introuvable" });

    const newImg = req.file?.filename; // optionnel

    // si nouvelle image, on prépare suppression ancienne
    if (newImg && existing.img) {
      const oldPath = path.resolve("uploads/jury", existing.img);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }

    const affected = await juryModel.updateJury(id, {
      ...req.body,
      ...(newImg ? { img: newImg } : {}), // si pas d'image => ne pas toucher img
    });

    return res.status(200).json({ ok: true, affected });
  } catch (error) {
    console.error("UpdateJuryController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

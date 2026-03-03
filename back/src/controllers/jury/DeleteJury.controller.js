import fs from "fs";
import path from "path";
import juryModel from "../../models/jury.model.js";

export default async function DeleteJuryController(req, res) {
  try {
    const { id } = req.params;

    const existing = await juryModel.findJuryById(id);
    if (!existing) return res.status(404).json({ error: "Membre introuvable" });

    // supprime l’image si existante
    if (existing.img) {
      const imgPath = path.resolve("uploads/jury", existing.img);
      fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
    }

    const affected = await juryModel.deleteJury(id);
    return res.status(200).json({ ok: true, affected });
  } catch (error) {
    console.error("DeleteJuryController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

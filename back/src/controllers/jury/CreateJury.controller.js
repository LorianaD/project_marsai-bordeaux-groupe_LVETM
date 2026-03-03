import juryModel from "../../models/jury.model.js";

export default async function CreateJuryController(req, res) {
  try {
    const img = req.file?.filename || null;

    const id = await juryModel.createJury({
      ...req.body,
      img,
    });

    return res.status(201).json({ ok: true, id });
  } catch (error) {
    console.error("CreateJuryController error:", error);
    return res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
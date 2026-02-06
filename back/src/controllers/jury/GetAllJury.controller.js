import juryModel from "../../models/jury.model.js";

async function GetAllJuryController(req, res) {
  try {
    const jury = await juryModel.findAllJury();
    return res.status(200).json({ jury });
  } catch (error) {
    console.error("GetAllJuryController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

export default GetAllJuryController;

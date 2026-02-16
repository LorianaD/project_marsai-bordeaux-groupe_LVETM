import * as conferenceProgramModel from "../../models/ConferenceProgram.js";


// public route
export async function getAllConferenceProgram(req, res) {
    try { 
        const items = await conferenceProgramModel.findAll();
        return res.status(200).json(items);
    } catch (error) {
        console.error("failed to retrieve conference program", error);
        return res.status(500).json({ error: "Error server"})
    }
}

// admin route

export async function getProgramAdmin(req, res) {
    try {
      const items = await conferenceProgramModel.findAll();
      return res.status(200).json(items);
    } catch (err) {
      console.error("getProgramAdmin error:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  //post admin route
 
export async function createItem(req, res) {
    try {
      const { time, title, speaker, color, sort_order } = req.body;
      const created = await conferenceProgramModel.create({
        time,
        title,
        speaker: speaker || null,
        color: color || "bg-sky-400",
        sort_order: sort_order ?? 0,
      });
      return res.status(201).json(created);
    } catch (err) {
      console.error("createItem error:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  //Modif admin route 
  export async function updateItem(req, res) {
    try {
      const { id } = req.params;
      const { time, title, speaker, color, sort_order } = req.body;
      const existing = await conferenceProgramModel.findById(id);
      if (!existing) return res.status(404).json({ error: "Créneau introuvable" });
      const updated = await conferenceProgramModel.update(id, {
        time,
        title,
        speaker: speaker || null,
        color: color || "bg-sky-400",
        sort_order: sort_order ?? existing.sort_order,
      });
      return res.status(200).json(updated);
    } catch (err) {
      console.error("updateItem error:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // supprime admiun route 
export async function deleteItem(req, res) {
    try {
      const { id } = req.params;
      const deleted = await conferenceProgramModel.remove(id);
      if (!deleted) return res.status(404).json({ error: "Créneau introuvable" });
      return res.status(204).send();
    } catch (err) {
      console.error("deleteItem error:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }
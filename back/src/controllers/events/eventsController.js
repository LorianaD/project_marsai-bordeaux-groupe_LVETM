import { findAllEvents, findEventById, insertEvent, updateEvent as updateEventModel,deleteEventById, updateEventPublished } from "../../models/event.js";

function toMySQLDateTime(dateStr) {
  if (!dateStr) return null;
  const s = String(dateStr).trim();
  if (s.length <= 10 && !s.includes("T")) {
    return `${s} 00:00:00`;
  }
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 19).replace("T", " ");
}

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, length, stock, illustration, location } = req.body;
    const dateForDb = toMySQLDateTime(date);
    const created = await insertEvent({
      title,
      description: description || null,
      date: dateForDb,
      length: length ?? 0,
      stock: stock ?? null,
      illustration: illustration ?? "",
      location: location || null,
    });
    return res.status(201).json(created);
  } catch (err) {
    console.error("Error creating event", err);
    return res.status(500).json({ message: "Error creating event" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, length, stock, illustration, location } = req.body;

    const dateForDb = toMySQLDateTime(date);
    const payload = {
      title,
      description: description || null,
      date: dateForDb,
      length: length ?? 0,
      stock: stock ?? null,
      illustration: illustration ?? "",
      location: location || null,
    };

    await updateEventModel(id, payload);
    const updated = await findEventById(id);

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json(updated);
  } catch (err) {
    console.error("Error updating event", err);
    return res.status(500).json({ message: "Error updating event" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteEventById(id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("Error deleting event", err);
    return res.status(500).json({ message: "Error deleting event" });
  }
};


export const getEvents = async (req, res) => {
  try {
    const events = await findAllEvents();
    res.json(events);
  } catch (err) {
   console.error("Error retrieving events", err);
   return res.status(500).json("Error retrieving events");
  }
};



export const GetEventyByID =async (req ,res) => {
    try {
        const { id } =req.params;
        const event = await findEventById(id);

        if (!event) {
            return res.status(404).json('Error: Event Not Found')

        }
        return res.json(event);
    } catch (err) {
        console.error("Error retrieving the event", err);
        return res.status(500).json("Error retrieving the event");
    }
}

export const patchPublish = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;

     const event = await findEventById(id);
     if (!envent) {
      return res.status(404).json('Error: Event Not Found')
     }
     await updateEventPublished(id, published);
     const updated = await findEventById(id);
     return res.status(200).json(updated);
  } catch (err) {
    console.error("Error publishing event", err);
    return res.status(500).json({message :"Error publishing event"});
  }
};
  


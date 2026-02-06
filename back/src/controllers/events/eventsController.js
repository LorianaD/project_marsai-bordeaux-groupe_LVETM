import { findAllEvents,findEventById, insertEvent } from "../../models/event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, length, stock, illustration, location } = req.body;
    const dateForDb = (date && date.length <= 10) ? `${date} 00:00:00` : (date || null);
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
  


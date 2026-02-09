import {
  findEventById,
  insertEvent,
  updateEvent as updateEventModel,
  deleteEventById,
  updateEventPublished,
  findAllPublishedEvents,
  findAllEventsForAdmin,
} from "../../models/event.js";
import { insertBooking, countBookingsByEventId} from "../../models/booking.js";

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
    const events = await findAllPublishedEvents();
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

export const getEventsForAdmin = async (req, res) => {
  try {
    const events = await findAllEventsForAdmin();
    res.json(events);
  } catch (err) {
    console.error("Error retrieving events", err);
    return res.status(500).json("Error retrieving events");
  }
};

export const patchPublish = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;

     const event = await findEventById(id);
     if (!event) {
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

/**
 * POST /api/events/:id/bookings
 * Body: { first_name, last_name, email }
 * Crée une réservation pour l'événement :id.
 */
export const createBooking = async (req, res) => {
  try {
    const eventId = Number(req.params.id);
    const { first_name, last_name, email } = req.body;

    // 1) Vérifier que l'événement existe
    const event = await findEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable" });
    }

    // 2) Vérifier qu'il reste de la place (stock = capacité max, on compte les réservations)
    const booked = await countBookingsByEventId(eventId);
    const capacity = event.stock != null ? Number(event.stock) : null;
    if (capacity != null && booked >= capacity) {
      return res.status(409).json({
        message: "Complet : plus de place disponible pour cet atelier.",
      });
    }

    // 3) Champs obligatoires
    if (!first_name?.trim() || !last_name?.trim() || !email?.trim()) {
      return res.status(400).json({
        message: "Prénom, nom et email sont obligatoires.",
      });
    }

    // 4) Insérer la réservation (la BDD refusera si même email déjà inscrit pour cet event, grâce à UNIQUE)
    const booking = await insertBooking({
      event_id: eventId,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim().toLowerCase(),
    });

    return res.status(201).json(booking);
  } catch (err) {
    // Erreur MySQL "duplicate entry" = même email déjà réservé pour cet event
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Cet email est déjà inscrit pour cet atelier.",
      });
    }
    console.error("Error creating booking", err);
    return res.status(500).json({ message: "Erreur lors de la réservation" });
  }
};

import { findAllEvents } from "../../models/event.js";


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
  


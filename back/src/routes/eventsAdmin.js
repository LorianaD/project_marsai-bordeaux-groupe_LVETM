import { Router } from "express";
import { getEventsForAdmin, createEvent, updateEvent, deleteEvent, patchPublish, getBookingsForEvent } from "../controllers/events/eventsController.js";

const eventsRouter = Router();

eventsRouter.get("/", getEventsForAdmin);
eventsRouter.get("/:id/bookings", getBookingsForEvent);
eventsRouter.post("/", createEvent);
eventsRouter.put("/:id", updateEvent);
eventsRouter.delete("/:id", deleteEvent);
eventsRouter.patch("/:id/publish", patchPublish);
export default eventsRouter;
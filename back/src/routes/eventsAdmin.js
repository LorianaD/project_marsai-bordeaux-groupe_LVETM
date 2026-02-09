import { Router } from "express";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../controllers/events/eventsController.js";


const eventsRouter = Router();

eventsRouter.get("/", getEvents);
eventsRouter.post("/", createEvent);
eventsRouter.put("/:id", updateEvent);
eventsRouter.delete("/:id", deleteEvent);
export default eventsRouter;
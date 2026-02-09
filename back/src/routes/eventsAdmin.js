import { Router } from "express";
import { getEvents, createEvent, updateEvent, deleteEvent, patchPublish } from "../controllers/events/eventsController.js";


const eventsRouter = Router();

eventsRouter.get("/", getEvents);
eventsRouter.post("/", createEvent);
eventsRouter.put("/:id", updateEvent);
eventsRouter.delete("/:id", deleteEvent);
eventsRouter.patch("/:id/publish", patchPublish);
export default eventsRouter;
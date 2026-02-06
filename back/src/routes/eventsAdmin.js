import { Router } from "express";
import { getEvents, createEvent } from "../controllers/events/eventsController.js";


const eventsRouter = Router();

eventsRouter.get("/", getEvents);
eventsRouter.post("/", createEvent);

export default eventsRouter;
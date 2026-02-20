import { Router } from "express";
import { getEventsForAdmin, createEvent, updateEvent, deleteEvent, patchPublish, getBookingsForEvent } from "../controllers/events/eventsController.js";
import { validate } from "../middlewares/zod/zodValidator.js";
import { createEventSchema, publishEventSchema } from "../zodSchema/zodIndex.js";

const eventsRouter = Router();

eventsRouter.get("/", getEventsForAdmin);
eventsRouter.get("/:id/bookings", getBookingsForEvent);
eventsRouter.post("/", validate(createEventSchema), createEvent);
eventsRouter.put("/:id", validate(createEventSchema), updateEvent);
eventsRouter.delete("/:id", deleteEvent);
eventsRouter.patch("/:id/publish", validate(publishEventSchema), patchPublish);//A VERIF
export default eventsRouter;
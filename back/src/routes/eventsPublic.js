import { Router } from "express";
import { getEvents, createBooking } from "../controllers/events/eventsController.js";

const eventsPublicRouter = Router();


eventsPublicRouter.get("/", getEvents);


eventsPublicRouter.post("/:id/bookings", createBooking);

export default eventsPublicRouter;
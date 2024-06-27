import { createEvent, getEvents, getEventBYId, updateEvent } from "../Controller/EventController.js";
import { Router } from "express";

const eventRouter = Router();

eventRouter.post('/create', createEvent);
eventRouter.get('/events', getEvents);
eventRouter.get('/event/:id', getEventBYId);
eventRouter.put('/update/:id', updateEvent);

export default eventRouter; 
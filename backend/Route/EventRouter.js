import { createEvent, getEvents, getEventBYId, updateEvent } from "../Controller/EventController.js";
import { Router } from "express";

const EventRouter = Router();

EventRouter.post('/create', createEvent);
EventRouter.get('/events', getEvents);
EventRouter.get('/getEvent/:_id', getEventBYId);
EventRouter.put('/update/:id', updateEvent);

export default EventRouter; 
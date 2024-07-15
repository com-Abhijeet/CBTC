import { Router } from "express";
import { bookTicket, getTicketByUserId, getTicketsForEvent } from "../Controller/TicketController.js";

const TicketRouter = Router();

TicketRouter.post('/CreateTicket',bookTicket);
TicketRouter.get('/getTicket/:userId',getTicketByUserId);
TicketRouter.get('/getTicketsForEvent/:eventId',getTicketsForEvent);
export default TicketRouter;
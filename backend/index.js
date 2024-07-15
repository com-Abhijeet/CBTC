import EventRouter from "./Route/EventRouter.js";
import UserRouter from "./Route/UserRouter.js";
import TicketRouter from "./Route/TicketRouter.js";
import PaymentRouter from "./Route/PaymentRouter.js";
import Database from "./config/database.js";
import cors from "cors"
import express from "express";
const app = express();

const PORT = 3000;  
Database();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
   

app.use(express.json()); 

app.use('/User', UserRouter);
app.use('/Event',EventRouter);
app.use('/Ticket', TicketRouter);
app.use('/Payment',PaymentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


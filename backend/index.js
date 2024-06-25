import UserRouter from "./Route/UserRouter.js";
import Database from "./config/database.js";
import express from "express";
const app = express();
const PORT = 3000;
Database();
app.use(express.json());

app.use('/user', UserRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


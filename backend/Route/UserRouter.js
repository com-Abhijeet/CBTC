import { registerUser } from "../Controller/UserController.js";
import { Router } from "express";

const UserRouter = Router();
UserRouter.post('/register', registerUser);

export default UserRouter;
import { loginUser, registerUser } from "../Controller/UserController.js";
import { Router } from "express";

const UserRouter = Router();
UserRouter.post('/register', registerUser);
UserRouter.post('/login',loginUser)
 
export default UserRouter;
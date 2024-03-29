import { Router } from "express";
const userRouter = Router();
import { getAllUsers } from "../controllers/dataController";

// userRouter.post('/', createUser)
userRouter.get('/',getAllUsers)



export default userRouter;
import { Router } from "express";
import { createUser } from "../controllers/userController";
import { login } from "../controllers/loginController";
const userRouter = Router()

// userRouter.post('/', createUser)
userRouter.post('/signup',createUser)
userRouter.post('/login', login )

export default userRouter;
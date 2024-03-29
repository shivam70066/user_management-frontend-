import { Router } from "express";
import { createUser } from "../controllers/signInController";
import { login } from "../controllers/loginController";
import verifyToken from "../controllers/verifyToken";
const authRouter = Router();

authRouter.post('/signup',createUser)
authRouter.post('/login', login )

authRouter.post('/verifyToken', verifyToken )


export default authRouter;
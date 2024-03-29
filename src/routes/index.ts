import { Router} from "express";
import authRouter from "./auth";
import userRouter from "./userRoutes";
import authenticateToken from "../middlewares/authenticateJWT";
import usersRouter from "./user";
import templatesRouter from "./emailTemplates";

const router = Router();


router.use('/auth',authRouter)
router.use('/users',authenticateToken,userRouter)
router.use('/user',authenticateToken,usersRouter);
router.use('/emailTemplates',authenticateToken,templatesRouter)



export default router;
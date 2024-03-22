import { Router,Response,Request } from "express";
import userRouter from "./userRoutes";

const router = Router();

// router.use('/signup',userRouter)
// router.use('/login',userRouter)

router.use('/',userRouter )



export default router;
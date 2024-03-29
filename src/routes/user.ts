import { Router } from "express";
const usersRouter = Router();
import {deleteUser, getUser, updateUser } from "../controllers/dataController";


usersRouter.get('/:id',getUser)
usersRouter.delete('/:id',deleteUser)
usersRouter.put('/:id',updateUser)



export default usersRouter;
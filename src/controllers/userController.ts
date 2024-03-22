import { isEmailRegistered, isValidData, createNewUser } from './../services/users.service';
import prisma from "../../DB/db.config";
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, gender, number } = req.body;

    const isDetailsValid:boolean = await isValidData(name, email, password, gender, number);
    if (!(isDetailsValid)) {
        return res.json({ status: 400, msg: "Incorrect data" });
    }

    try {

        if (await isEmailRegistered(email)) {
            return res.json({ status: 403, msg: "Email already registered." });
        }

        const userCreated:boolean = await createNewUser(name, email, password, gender, number);

        if (userCreated)
            return res.json({ status: 200, msg: "User Created Successfully." });

            
    } catch (error) {
        console.error("Error creating user:", error);
        return res.json({ status: 500, msg: "Internal Server Error" });
    }
};

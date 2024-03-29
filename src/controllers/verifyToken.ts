import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const verifyToken = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token)

        if (token == null) {
            return res.status(401).json({ status: 401, msg: "Unauthorized user." });
        }

        jwt.verify(token, process.env.SECRET_KEY!, (err: any, user: any) => {
            if (err) {
                return res.status(401).json({ status: 401, msg: "Unauthorized user." });
            }
        });

        return res.status(200).json({ status: 200, msg: "Success" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: 500, msg: "Internal server error" });
    }
};


export default verifyToken;
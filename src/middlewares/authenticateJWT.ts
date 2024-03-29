import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) [
            res.json({status:401,msg:"Unauthorized user."})
        ];
        jwt.verify(token!, process.env.SECRET_KEY!, (err: any, user: any) => {
            if (err) return res.json({status:401,msg:"Unauthorized user."})
            console.log("user id: "+user.id)
            console.log("user Emial: "+user.email)
    
            next();
        });
    }
    catch{
        console.log("session expired or token changed")
    }


};

export default authenticateToken;